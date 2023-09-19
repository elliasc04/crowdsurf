import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import Tabs from './components/tabnav';
import Dialogapi from './components/dialogapi';
import { Navigation } from './components/Navigation';
import './App.css';



import clsx from "clsx";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import VestedPairFactoryJson from "./abi/VestedPairFactory.json";
import { ErrorMessage } from "./components/ErrorMessage";
import { Button } from "./components/primitives/Button";
import { Heading } from "./components/primitives/Heading";
// import { Image } from "./components/primitives/Image";
import { inputStyles } from "./components/primitives/Input";
import { Label } from "./components/primitives/Label";
import { InnerColumn, OuterColumn, PageWrapper, Section } from "./components/primitives/Layout";
import { hooks } from "./utils/metaMask";
import { tw } from "./utils/tw";



const ParentComponent = () => {


  const [dataReceived, setDataReceived] = useState([[[1]]]);
  return (
    <PageWrapper>
			<Navigation />

			<OuterColumn>
				<InnerColumn width="third">
					<Heading size="xxl" className="relative text-center mb-4 md:mb-8 mt-2 md:mt-4">
						Components
					</Heading>
				</InnerColumn>
        <Section>
          <Dialogapi onDataReceived={setDataReceived}/>
          <Tabs busynessData = {dataReceived}/>
          <p>Data: {JSON.stringify(dataReceived)}</p>
        </Section>
			</OuterColumn>
		</PageWrapper>
  );
};

export default ParentComponent;