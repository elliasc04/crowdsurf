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
import { Heading } from "../components/primitives/Heading";
import { Image } from "../components/primitives/Image";
import { inputStyles } from "../components/primitives/Input";
import { Label } from "../components/primitives/Label";
import { InnerColumn, OuterColumn, PageWrapper, Section } from "../components/primitives/Layout";
import * as ToolTipPrimitive from "../components/primitives/Tooltip";
import { tw } from "../utils/tw";
import Tabs from "../components/tabnav";
import LiveTab from "../components/livetabnav";
import Typewriter from 'typewriter-effect';
import { Linkbutton } from "../components/linkbutton";
import { Link } from "../components/primitives/Toolbar";


const Home: NextPage = () => {
	const linkDictionary: { [key: string]: string } = {
		'anytimefitness': 'https://www.google.com/maps/place/Anytime+Fitness/@38.859691,-94.7507246,12z/data=!4m6!3m5!1s0x87c0c1a24b58163b:0x518415eefd7cb2c!8m2!3d38.859691!4d-94.6683271!16s%2Fg%2F11c6q33cnq?entry=ttu',
		'spac': 'https://www.google.com/maps/place/Henry+Crown+Sports+Pavilion/@42.0596373,-87.6739185,18z/data=!3m1!4b1!4m6!3m5!1s0x880fd00b703e4c39:0x509c3569d8eb2a8e!8m2!3d42.0596373!4d-87.6729806!16s%2Fg%2F1hf3_crv1?entry=ttu',
		'mudd': 'https://www.google.com/maps/place/Mudd+Library/@42.0583534,-87.6756649,18z/data=!3m1!4b1!4m6!3m5!1s0x880fda9eebe51fd3:0x303e4571ee131fdd!8m2!3d42.0583534!4d-87.6743748!16s%2Fg%2F1hdzhg5dv?entry=ttu',
		'main': 'https://www.google.com/maps/place/University+Library/@42.0531822,-87.6767087,17z/data=!3m1!4b1!4m6!3m5!1s0x880fd075c42d24d5:0xc9322cc70d6d9ccf!8m2!3d42.0531822!4d-87.6741284!16s%2Fm%2F02vvt1j?entry=ttu',
		'lisa': 'https://www.google.com/maps/place/Lisa%E2%80%99s+Cafe/@42.06024,-87.6783583,17z/data=!3m1!4b1!4m6!3m5!1s0x880fdb82561ae08f:0xfb614eed54145ef6!8m2!3d42.06024!4d-87.675778!16s%2Fg%2F11hyc_vnm5?entry=ttu',
		'lakefill': 'https://www.google.com/maps/place/The+Lakefill/@42.0552889,-87.6729177,17z/data=!3m1!4b1!4m6!3m5!1s0x880fda9d9c61b8ab:0x45b9fd9941874794!8m2!3d42.0552889!4d-87.6708507!16s%2Fg%2F12hp6k7ld?entry=ttu',
	};

  
	const [popDataReceived, setpopDataReceived] = useState([[[1]]]);
	type TabData = [string, number, number, number, string];
	const [liveDataReceived, setliveDataReceived] = useState<TabData>(["a", 1, 1, 1, "a"]);

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
									strings: ['SPAC?',"Lisa's?","Mudd?",'Main?',"the Lakefill?"],
									autoStart: true,
									loop: true,
								  }}
							/>
						</Heading>
					</InnerColumn>
				</div>

				<Section>
					<InnerColumn width="full">
						<div className="flex flex-row items-center justify-center mb-[75px]">
							<Linkbutton onLiveDataReceived = {setliveDataReceived} onPopDataReceived = {setpopDataReceived} Link={linkDictionary['spac']}>SPAC</Linkbutton>
							<Linkbutton onLiveDataReceived = {setliveDataReceived} onPopDataReceived = {setpopDataReceived} Link={linkDictionary['lisa']}>Lisa's Cafe</Linkbutton>
							<Linkbutton onLiveDataReceived = {setliveDataReceived} onPopDataReceived = {setpopDataReceived} Link={linkDictionary['mudd']}>Mudd Library</Linkbutton>
							<Linkbutton onLiveDataReceived = {setliveDataReceived} onPopDataReceived = {setpopDataReceived} Link={linkDictionary['main']}>University Library</Linkbutton>
							<Linkbutton onLiveDataReceived = {setliveDataReceived} onPopDataReceived = {setpopDataReceived} Link={linkDictionary['lakefill']}>The Lakefill</Linkbutton>
						</div>
						<div className = "flex flex-row items-center justify-center">
							<div className = "static">
								<Tabs busynessData = {popDataReceived}/>
							</div>
							<div className = "static">
								<LiveTab busynessData = {liveDataReceived}/>
							</div>
						</div>
					</InnerColumn>
				</Section>
			</OuterColumn>
			{/* <p>Data: {JSON.stringify(dataReceived)}</p> */}
		</PageWrapper>
	);
};

export default Home;
