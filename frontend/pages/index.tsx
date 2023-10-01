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
import { tw } from "../utils/tw";
import Tabs from "../components/tabnav";
import Dialogapi from "../components/dialogapi";
import Typewriter from 'typewriter-effect';

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
	const [dataReceived, setDataReceived] = useState([[[1]]]);
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
							How busy is it at <br />
							<Typewriter
								options={{
									strings: ['SPAC?',"Lisa's?","Fran's?",'Elder?',"Sarge?"],
									autoStart: true,
									loop: true,
								  }}
							/>
						</Heading>
					</InnerColumn>
				</div>

				<Section>
					<InnerColumn width="full">
						{/* <ColumnWrapper>
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
							<Heading>Select Option</Heading>
							
						</div> */}
						<div className="flex-row items-center justify-center mb-[30px]">
							<Dialogapi onDataReceived={setDataReceived}/>
						</div>
						<Tabs busynessData = {dataReceived}/>
					</InnerColumn>
				</Section>
			</OuterColumn>
			
			{/* <p>Data: {JSON.stringify(dataReceived)}</p> */}
		</PageWrapper>
	);
};

export default Home;
