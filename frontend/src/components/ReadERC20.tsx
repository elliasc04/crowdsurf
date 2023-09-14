import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const abi = [
	// Read-Only Functions
	"function balanceOf(address owner) view returns (uint256)",
	"function totalSupply() view returns (uint256)",
	"function decimals() view returns (uint8)",
	"function symbol() view returns (string)",
	// Authenticated Functions
	"function transfer(address to, uint amount) returns (bool)",
	// Events
	"event Transfer(address indexed from, address indexed to, uint amount)"
];

interface Props {
	addressContract: string;
}

const fetcher =
	(library: Web3Provider | undefined, abi: any) =>
	(...args: any) => {
		if (!library) return;

		const [arg1, arg2, ...params] = args;
		const address = arg1;
		const method = arg2;
		const contract = new Contract(address, abi, library);
		return contract[method](...params);
	};

export function ReadERC20(props: Props) {
	const addressContract = props.addressContract;
	const [symbol, setSymbol] = useState<string>("");
	const [totalSupply, setTotalSupply] = useState<string>();

	//@ts-ignore
	const { account, library, active } = useWeb3React<Web3Provider>();

	const { data: balance, mutate } = useSWR([addressContract, "balanceOf", account], {
		fetcher: fetcher(library, abi)
	});

	useEffect(() => {
		if (!(active && account && library)) return;

		const erc20: Contract = new Contract(addressContract, abi, library);
		library.getCode(addressContract).then((result: string) => {
			//check whether it is a contract
			if (result === "0x") return;

			erc20
				.symbol()
				.then((result: string) => {
					setSymbol(result);
				})
				.catch("error", console.error);

			erc20
				.totalSupply()
				.then((result: string) => {
					setTotalSupply(formatEther(result));
				})
				.catch("error", console.error);
		});
		//called only when changed to active
	}, [active]);

	useEffect(() => {
		if (!(active && account && library)) return;

		const erc20: Contract = new Contract(addressContract, abi, library);

		// listen for changes on an Ethereum address
		console.log(`listening for Transfer...`);

		const fromMe = erc20.filters.Transfer(account, null);
		erc20.on(fromMe, (from, to, amount, event) => {
			console.log("Transfer|sent", { from, to, amount, event });
			mutate(undefined, true);
		});

		const toMe = erc20.filters.Transfer(null, account);
		erc20.on(toMe, (from, to, amount, event) => {
			console.log("Transfer|received", { from, to, amount, event });
			mutate(undefined, true);
		});

		// remove listener when the component is unmounted
		return () => {
			erc20.removeAllListeners(toMe);
			erc20.removeAllListeners(fromMe);
		};

		// trigger the effect only on component mount
	}, [active, account]);

	return (
		<div>
			<p>ERC20 Contract: {addressContract}</p>
			<p>
				token totalSupply:{totalSupply} {symbol}
			</p>
			<p>
				ClassToken in current account:{balance ? parseFloat(formatEther(balance)).toFixed(1) : " "}{" "}
				{symbol}
			</p>
		</div>
	);
}
