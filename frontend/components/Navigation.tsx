import { formatEther } from "@ethersproject/units";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Key, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Dropdown from "../components/primitives/Dropdown";
import { getAddChainParameters } from "../utils/chains";
import { hooks, metaMask } from "../utils/metaMask";
import { tw } from "../utils/tw";
import { Arbitrum } from "./icons/Arbitrum";
import { Avalanch } from "./icons/Avalanch";
import { EthereumIcon } from "./icons/Ethereum";
import { GanacheIcon } from "./icons/Ganache";
import { Button } from "./primitives/Button";
import * as NavigationPrimitive from "./primitives/Navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";

const RootWrapper = tw.div`fixed top-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center`;

const cryptoIconClassName = "h-7 w-7 text-primitive-type-extra-faint";

const iconClassName = "mr-2 h-7 w-7 text-primitive-type-extra-faint";

interface ChainInfo {
	[key: number]: {
		icon: React.ReactNode;
	};
}

const chainInfo: ChainInfo = {
	1: {
		icon: <EthereumIcon className={cryptoIconClassName} />
	},
	43114: {
		icon: <Avalanch className={cryptoIconClassName} />
	},
	42161: {
		icon: <Arbitrum className={cryptoIconClassName} />
	},
	1337: {
		icon: <GanacheIcon className={cryptoIconClassName} />
	}
};

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;



export const Navigation = () => {
	const [desiredChainId, setDesiredChainId] = useState<number | undefined>(1);
	const activeChainId = useChainId();
	const accounts = useAccounts();
	const isActivating = useIsActivating();

	const isActive = useIsActive();
	const provider = useProvider();

	const [error, setError] = useState<Error | undefined>(undefined);


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

				await metaMask.activate(getAddChainParameters(desiredChainId));

				setError(undefined);
				toast.success("You have connected.");
			} catch (error) {
				setError(error as Error);
				toast.error("Failed to switch chains, try again.");
			}
		},
		[metaMask, activeChainId, setError]
	);

	return (
		<RootWrapper>
			<NavigationPrimitive.Root>
				<NavigationPrimitive.Item>
					<NavigationPrimitive.NextLink href="/" className="!font-bold">
						CrowdSurf
					</NavigationPrimitive.NextLink>
				</NavigationPrimitive.Item>

				{/* <NavigationPrimitive.Item>
					{isActive ? (
						error ? (
							<NavigationPrimitive.Button
								onClick={() => (desiredChainId ? switchChain(desiredChainId) : null)}
							>
								Try again?
							</NavigationPrimitive.Button>
						) : (
							<NavigationPrimitive.Button
								onClick={() => {
									if (metaMask?.deactivate) {
										void metaMask.deactivate();
									} else {
										void metaMask.resetState();
									}
									setDesiredChainId(1);
									toast.success("You have disconnected.");
								}}
							>
								Disconnect
							</NavigationPrimitive.Button>
						)
					) : (
						<NavigationPrimitive.Button
							className="whitespace-nowrap"
							onClick={() => (desiredChainId ? switchChain(desiredChainId) : null)}
							disabled={isActivating || !desiredChainId}
						>
							{error ? "Try again?" : "Connect"}
						</NavigationPrimitive.Button>
					)}
				</NavigationPrimitive.Item> */}

				{/* <NavigationPrimitive.Item>
					<Dropdown.Root
						sideOffset={14}
						trigger={
							<Button shade="primitive-borderless" size="xs" className="px-3">
								{desiredChainId && chainInfo[desiredChainId].icon}
								<CaretDownIcon className="ml-1 h-5 w-5 -mr-2" />
							</Button>
						}
					>
						<Dropdown.CheckboxItem
							label={<span className={activeChainId === 1 ? "font-bold" : ""}>Ethereum</span>}
							icon={<EthereumIcon className={iconClassName} />}
							checked={desiredChainId === 1}
							onCheckedChange={(value) => {
								if (value) setDesiredChainId(1);
							}}
						/>

						<Dropdown.CheckboxItem
							label={<span className={activeChainId === 43114 ? "font-bold" : ""}>Avalanch</span>}
							icon={<Avalanch className={iconClassName} />}
							checked={desiredChainId === 43114}
							onCheckedChange={(value) => {
								if (value) setDesiredChainId(43114);
							}}
						/>

						<Dropdown.CheckboxItem
							label={<span className={activeChainId === 42161 ? "font-bold" : ""}>Arbitrum</span>}
							icon={<Arbitrum className={iconClassName} />}
							checked={desiredChainId === 42161}
							onCheckedChange={(value) => {
								if (value) setDesiredChainId(42161);
							}}
						/>
						<Dropdown.CheckboxItem
							label={<span className={activeChainId === 1337 ? "font-bold" : ""}>Ganache</span>}
							icon={<GanacheIcon className={iconClassName} />}
							checked={desiredChainId === 1337}
							onCheckedChange={(value) => {
								if (value) setDesiredChainId(1337);
							}}
						/>
					</Dropdown.Root>
				</NavigationPrimitive.Item> */}

				{accounts && accounts.length !== 0 && (
					<NavigationPrimitive.Item>
						<NavigationPrimitive.Text>
						</NavigationPrimitive.Text>
					</NavigationPrimitive.Item>
				)}

				<NavigationPrimitive.Item>
					<ThemeSwitcher />
				</NavigationPrimitive.Item>
			</NavigationPrimitive.Root>
		</RootWrapper>
	);
};
