import * as TabsPrimitive from './primitives/Tabs';
import BarGraph from "./graph";
import LiveBarGraph from './livegraph';
import {useState, useEffect} from 'react';
import AreaGraph from './areagraph';
import { clsx } from "clsx";
import React from "react";
import { tw } from '../utils/tw';

interface Tab {
  title: string;
  value: string;
}

const RootWrapper = tw.div`flex items-center justify-center min-w-[100px] ml-[100px]`;


const tabs: Tab[] = [
  {
    title: "Live",
    value: "tab1",
  },
];
type TabData = [string, number, number, number, string];
interface BusynessData {
  // Define the structure of your data here
  busynessData: TabData; // Use the same structure as your data
}

const processData = (tabData: any[]): any[] => {
    const day = tabData[0];
    const hour = tabData[1];
    const liveBusyness = tabData[2];
    const usualbusy = tabData[3];
  
    return [
      {
        name: "Live Busyness",
        LiveBusyness: liveBusyness,
      },
      {
        name: "Usual Busyness",
        LiveBusyness: usualbusy,
      }
    ];
};

export default function Tabs({ busynessData }: BusynessData) {
  const [busynessData2, setBusynessData] = useState(busynessData);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    // Here you can update the data as needed, for example, fetching data from an API
    // For the sake of this example, I'm just setting it back to the original data
    setBusynessData(busynessData2);
    if (JSON.stringify(busynessData) != JSON.stringify(["a", 1, 1, 1, "a"])) {
        setUpdated(true);
    }
  }, [busynessData]);
  return (
    <RootWrapper>
      <TabsPrimitive.Root defaultValue="tab1">
        <TabsPrimitive.List>
          {tabs.map(({ title, value }) => (
            <TabsPrimitive.Trigger
              key={`tab-trigger-${value}`}
              value={value}
              className={clsx(
                "group",
                "first:rounded-tl-lg last:rounded-tr-lg",
                "border-b first:border-r last:border-l",
                "border-gray-300 dark:border-gray-600",
                "radix-state-active:radix-state-inactive:border-b-gray-700 focus-visible:radix-state-inactive:border-b-transparent  dark:radix-state-inactive:border-b-gray-100 dark:radix-state-inactive:bg-gray-900 focus-visible:dark:radix-state-inactive:border-b-transparent dark:radix-state-active:bg-gray-800",
                "flex-1 px-3 py-2.5 w-full",
                "focus:radix-state-inactive:border-b-red",
                "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
              )}
            >
              <span
                className={clsx(
                  "text-sm font-medium",
                )}
              >
                {title}
              </span>
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        {tabs.map(({ value }) => (
          <TabsPrimitive.Content
            key={`tab-content-${value}`}
            value={value}
            className={clsx("rounded-b-lg px-6 py-4", {
              "bg-white dark:bg-gray-800": true, // Add background color classes here
            })}
          >
              {(() => {
                try {
                    let tabData: [string, number, number, number, string] | [] = [];
                
                    if (busynessData && Array.isArray(busynessData)) {
                    // Determine which tab's data to use based on the 'value'
                    switch (value) {
                        case "tab1":
                        tabData = busynessData;
                        break;
                        default:
                        break;
                    }
                    }
                    if (updated) {
                    return (
                        <div className="flex flex-row justify-center mt-10 items-center">
                        <LiveBarGraph receivedData={processData(tabData)} />
                        {/* <AreaGraph receivedData={processData(tabData as [string, number, number, number, string])} /> */}
                        </div>
                    );
                    } else {
                    return <div className="w-full"></div>;
                    }
                } catch (error) {
                    console.error(error);
                    return <div></div>;
                }
              })()}
          </TabsPrimitive.Content>
        ))}
      </TabsPrimitive.Root>
    </RootWrapper>
  );
}
