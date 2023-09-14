import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { useCallback, useEffect, useState } from "react";
import { MetaMaskIcon } from "../components/icons/MetaMask";
import * as Dropdown from "../components/primitives/Dropdown";
import { CHAINS, getAddChainParameters } from "../utils/chains";
import { Arbitrum } from "./icons/Arbitrum";
import { Avalanch } from "./icons/Avalanch";
import { EthereumIcon } from "./icons/Ethereum";
import { Button } from "./primitives/Button";

const iconClassName = "mr-2 h-7 w-7 text-primitive-type-extra-faint";

interface ChainInfo {
	[key: number]: {
		icon: React.ReactNode;
	};
}

const chainInfo: ChainInfo = {
	1: {
		icon: <EthereumIcon className={iconClassName} />
	},
	43114: {
		icon: <Avalanch className={iconClassName} />
	},
	42161: {
		icon: <Arbitrum className={iconClassName} />
	}
};

function ChainSelect({
	activeChainId,
	switchChain,
	chainIds
}: {
	activeChainId: number;
	switchChain: (chainId: number) => void;
	chainIds: number[];
}) {
	return (
		<Dropdown.Root
			trigger={
				<Button>
					{chainInfo[activeChainId]?.icon ?? <MetaMaskIcon className={iconClassName} />}
					Swap
				</Button>
			}
		>
			<Dropdown.CheckboxItem
				label="Ethereum"
				icon={<EthereumIcon className={iconClassName} />}
				checked={activeChainId === 1}
				onCheckedChange={(value) => {
					if (value) switchChain(1);
				}}
			/>

			<Dropdown.CheckboxItem
				label="Avalanche"
				icon={<Avalanch className={iconClassName} />}
				checked={activeChainId === 43114}
				onCheckedChange={(value) => {
					if (value) switchChain(43114);
				}}
			/>
			<Dropdown.CheckboxItem
				label="Arbitrum"
				icon={<Arbitrum className={iconClassName} />}
				checked={activeChainId === 42161}
				onCheckedChange={(value) => {
					if (value) switchChain(42161);
				}}
			/>
		</Dropdown.Root>
	);
}

export function ConnectWithSelect({
	connector,
	activeChainId,
	chainIds = Object.keys(CHAINS).map(Number) || [],
	isActivating,
	isActive,
	error,
	setError
}: {
	connector: MetaMask;
	activeChainId: ReturnType<Web3ReactHooks["useChainId"]>;
	chainIds: ReturnType<Web3ReactHooks["useChainId"]>[];
	isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
	isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
	error: Error | undefined;
	setError: (error: Error | undefined) => void;
}) {
	//@ts-ignore
	const [desiredChainId, setDesiredChainId] = useState<number>(undefined);

	/**
	 * When user connects eagerly (`desiredChainId` is undefined) or to the default chain (`desiredChainId` is -1),
	 * update the `desiredChainId` value so that <select /> has the right selection.
	 */
	useEffect(() => {
		if (activeChainId && (!desiredChainId || desiredChainId === -1)) {
			setDesiredChainId(activeChainId);
		}
	}, [desiredChainId, activeChainId]);

	const switchChain = useCallback(
		async (desiredChainId: number) => {
			setDesiredChainId(desiredChainId);

			try {
				if (
					// If we're already connected to the desired chain, return
					desiredChainId === activeChainId ||
					// If they want to connect to the default chain and we're already connected, return
					(desiredChainId === -1 && activeChainId !== undefined)
				) {
					setError(undefined);
					return;
				}

				await connector.activate(getAddChainParameters(desiredChainId));

				setError(undefined);
			} catch (error) {
				setError(error as Error);
			}
		},
		[connector, activeChainId, setError]
	);

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			{/*@ts-expect-error*/}
			<ChainSelect activeChainId={desiredChainId} switchChain={switchChain} chainIds={chainIds} />
			<div style={{ marginBottom: "1rem" }} />
			{isActive ? (
				error ? (
					<button onClick={() => switchChain(desiredChainId)}>Try again?</button>
				) : (
					<button
						onClick={() => {
							if (connector?.deactivate) {
								void connector.deactivate();
							} else {
								void connector.resetState();
							}
							//@ts-expect-error
							setDesiredChainId(undefined);
						}}
					>
						Disconnect
					</button>
				)
			) : (
				<button
					onClick={() => switchChain(desiredChainId)}
					disabled={isActivating || !desiredChainId}
				>
					{error ? "Try again?" : "Connect"}
				</button>
			)}
		</div>
	);
}
