import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Contract, ethers, Signer } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import VestedPairFactoryJson from "../abi/VestedPairFactory.json";
import { ErrorMessage } from "../components/ErrorMessage";
import { Navigation } from "../components/Navigation";
import { Button } from "../components/primitives/Button";
import { Heading } from "../components/primitives/Heading";
import { Image } from "../components/primitives/Image";
import { inputStyles } from "../components/primitives/Input";
import { Label } from "../components/primitives/Label";
import { InnerColumn, OuterColumn, PageWrapper, Section } from "../components/primitives/Layout";
import { hooks } from "../utils/metaMask";
import { VestedPairFactoryPayload, VestedPairFactorySchema } from "../utils/schema";
import { tw } from "../utils/tw";

const Column = tw.div`flex-1`;

const ColumnInner = tw.div`mt-4 rounded-md border bg-primitive-faint border-primitive-edge p-3 flex flex-col space-y-1`;

const ColumnWrapper = tw.div`flex flex-row gap-4`;

const ColumnOfferItem = tw.div`block pb-1 border-b border-primitive-edge-faint last:pb-0 last:border-b-0`;

const ColumnItem = ({ isBuy = false }: { isBuy?: boolean }) => {
	const [count] = useState(Math.ceil(Math.random() * 10));
	const [cost] = useState((Math.random() * 5).toFixed(2));
	const [totalCost] = useState((Math.random() * 50).toFixed(2));
	const [volume] = useState((Math.random() * 0.08).toFixed(2));

	return (
		<ColumnOfferItem>
			<div className="border-r border-primitive-edge inline-flex flex-row items-center mr-2 pr-2 w-14">
				<span
					className="text-xl font-medium tracking-tight text-primitive-type"
					suppressHydrationWarning
				>
					{count}
					<span className="text-base ml-px text-primitive-type">x</span>
				</span>
			</div>
			<div className="inline-flex flex-row items-center border-r border-primitive-edge mr-2 pr-2 w-32">
				<div>
					<span className="text-xs align-super text-primitive-type">$</span>
					<div className="text-xl inline-block text-primitive-type" suppressHydrationWarning>
						{cost}
					</div>
					<span className="text-xs text-primitive-type-faint">
						<span className="mx-0.5">/</span> token
					</span>
				</div>
			</div>
			<div className="inline-flex flex-row items-center">
				<span className="text-primitive-type text-base">
					<span className={clsx("text-xs align-super", isBuy ? "text-red-600" : "text-green-600")}>
						$
					</span>
					<div
						className={clsx("text-xl inline-block", isBuy ? "text-red-600" : "text-green-600")}
						suppressHydrationWarning
					>
						{totalCost}
					</div>
					<span className="text-primitive-type-extra-faint font-light mx-1">/</span>
					<span suppressHydrationWarning>{volume} Volume</span>
				</span>
			</div>
		</ColumnOfferItem>
	);
};

const Home: NextPage = () => {
	const { useProvider } = hooks;

	const [signer, setSigner] = useState<Signer>();
	const [greeterContract, setGreeterContract] = useState<Contract>();
	const [greeterContractAddr, setGreeterContractAddr] = useState<string>("");
	const [greeting, setGreeting] = useState<string>("");
	const [greetingInput, setGreetingInput] = useState<string>("");
	const provider = useProvider();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<VestedPairFactoryPayload>({
		defaultValues: {
			amounts: "[0]",
			cliffTime: 30,
			equityTokenInitialSupply: 10000,
			equityTokenName: "HUC",
			recipients: "[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]",
			vestingTime: 30,
			equityTokenSymbol: "HUC"
		},
		resolver: zodResolver(VestedPairFactorySchema)
	});

	useEffect((): void => {
		setSigner(provider?.getSigner());
	}, [provider]);

	async function deployGreeterContract(
		signer: Signer,
		payload: VestedPairFactoryPayload
	): Promise<void> {
		const Greeter = new ethers.ContractFactory(
			VestedPairFactoryJson.abi,
			VestedPairFactoryJson.bytecode,
			signer
		);

		try {
			const greeterContract = await Greeter.deploy();

			await greeterContract.deployed();

			// const greeting = await greeterContract.createOrderBook(...Object.values(payload));
			const greeting = await greeterContract.createOrderBook(
				10000,
				"GUH",
				"GUH",
				["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
				[100],
				10,
				20
			);
			setGreeterContract(greeterContract);
			setGreeting(greeting);

			toast.success(`Vested Pair created!`);

			setGreeterContractAddr(greeterContract.address);
		} catch (error: any) {
			console.error("Error!" + (error && error.message ? `\n\n${error.message}` : ""));
			toast.error("An error has occurred, please try again");
		}
	}

	return (
		<PageWrapper>
			<Navigation />

			<OuterColumn>
				<div className="relative w-full overflow-hidden rounded-xl bg-primary-faint">
					<div className="opacity-60 absolute left-0 bottom-0 top-0">
						<Image
							src="/static/bg_curve.png"
							alt="bg doce"
							width={3176}
							priority={false}
							height={1880}
							placeholder="empty"
							className="delay-[2s] duration-[3s]"
						/>
					</div>

					<div className="absolute top-1/4 left-[-7%] -translate-y-1/2 transform">
						<Image
							src="/static/gradient_two.png"
							width={1250}
							height={1250}
							alt="gradient"
							placeholder="empty"
							className="delay-300 duration-1000"
						/>
					</div>

					<InnerColumn className="py-10 md:py-20 lg:scroll-py-32">
						<Heading className="relative !text-white text-center" size="xxl" weight="semibold">
							Unleashing digital <br />
							equity potential
						</Heading>
					</InnerColumn>
				</div>

				<Section>
					<InnerColumn width="third">
						<ColumnWrapper>
							<Column>
								<Heading>Buy Tokens</Heading>
								<ColumnInner>
									<ColumnItem isBuy />
									<ColumnItem isBuy />
									<ColumnItem isBuy />
								</ColumnInner>
							</Column>
							<Column>
								<Heading>Sell Token</Heading>
								<ColumnInner>
									<ColumnItem />
									<ColumnItem />
									<ColumnItem />
								</ColumnInner>
							</Column>
						</ColumnWrapper>

						<div className="mt-8">
							<Heading>Create Vested Pair</Heading>
							<form
								onSubmit={handleSubmit((data) => {
									provider?.getSigner() && deployGreeterContract(provider?.getSigner(), data);
								})}
							>
								<div className="my-2 grid grid-flow-row-dense grid-cols-4 gap-5">
									<div className="col-span-2 md:col-span-1">
										<Label>Equity Token Initial Supply</Label>
										<input {...register("equityTokenInitialSupply")} className={inputStyles()} />
										{errors.equityTokenInitialSupply?.message && (
											<ErrorMessage>{errors.equityTokenInitialSupply?.message}</ErrorMessage>
										)}
									</div>
									<div className="col-span-2 md:col-span-1">
										<Label>Equity Token Name</Label>
										<input {...register("equityTokenName")} className={inputStyles()} />
										{errors.equityTokenName?.message && (
											<ErrorMessage>{errors.equityTokenName?.message}</ErrorMessage>
										)}
									</div>
									<div className="col-span-2 md:col-span-1">
										<Label>Equity Token Symbol</Label>
										<input {...register("equityTokenSymbol")} className={inputStyles()} />
										{errors.equityTokenSymbol?.message && (
											<ErrorMessage>{errors.equityTokenSymbol?.message}</ErrorMessage>
										)}
									</div>
									<div className="col-span-2 md:col-span-1">
										<Label>Recipients</Label>
										<input {...register("recipients")} className={inputStyles()} />
										{errors.recipients?.message && (
											<ErrorMessage>{errors.recipients?.message}</ErrorMessage>
										)}
									</div>
									<div className="col-span-2 md:col-span-1">
										<Label>Amounts</Label>
										<input {...register("amounts")} className={inputStyles()} />
										{errors.amounts?.message && (
											<ErrorMessage>{errors.amounts?.message}</ErrorMessage>
										)}
									</div>
									<div className="col-span-2 md:col-span-1">
										<Label>Cliff Time</Label>
										<input {...register("cliffTime")} className={inputStyles()} />
										{errors.cliffTime?.message && (
											<ErrorMessage>{errors.cliffTime?.message}</ErrorMessage>
										)}
									</div>
									<div className="col-span-2 md:col-span-1">
										<Label>Vesting Time</Label>
										<input {...register("vestingTime")} className={inputStyles()} />
										{errors.vestingTime?.message && (
											<ErrorMessage>{errors.vestingTime?.message}</ErrorMessage>
										)}
									</div>
								</div>
								<div className="flex flex-row justify-end">
									<Button type="submit" shade="primary">
										Create
									</Button>
								</div>
							</form>
						</div>
					</InnerColumn>
				</Section>
			</OuterColumn>
		</PageWrapper>
	);
};

export default Home;
