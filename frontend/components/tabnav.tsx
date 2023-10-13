import * as TabsPrimitive from './primitives/Tabs';
import BarGraph from "./graph";
import AreaGraph from './areagraph';
import { clsx } from "clsx";
import React from "react";
import { tw } from '../utils/tw';

interface Tab {
  title: string;
  value: string;
}

const RootWrapper = tw.div`flex items-center justify-center w-full`;

const busynessData = [[[0,6],[0,7],[27,8],[44,9],[52,10],[59,11],[63,12],[64,13],[63,14],[65,15],[53,16],[43,17],[22,18],[11,19],[8,20],[8,21],[0,22],[0,23]],[[0,5],[18,6],[33,7],[47,8],[59,9],[67,10],[74,11],[71,12],[66,13],[71,14],[78,15],[87,16],[98,17],[91,18],[72,19],[47,20],[29,21],[16,22]],[[0,5],[20,6],[29,7],[44,8],[51,9],[60,10],[62,11],[56,12],[51,13],[47,14],[52,15],[66,16],[87,17],[95,18],[83,19],[60,20],[29,21],[14,22]],[[0,5],[17,6],[31,7],[54,8],[65,9],[79,10],[74,11],[64,12],[58,13],[53,14],[62,15],[79,16],[96,17],[100,18],[75,19],[51,20],[28,21],[14,22]],[[0,5],[29,6],[44,7],[53,8],[54,9],[54,10],[55,11],[58,12],[59,13],[52,14],[54,15],[61,16],[81,17],[77,18],[62,19],[38,20],[17,21],[6,22]],[[0,5],[21,6],[30,7],[40,8],[50,9],[59,10],[67,11],[71,12],[67,13],[62,14],[60,15],[67,16],[82,17],[86,18],[71,19],[49,20],[26,21],[0,22]],[[0,6],[0,7],[38,8],[57,9],[81,10],[86,11],[89,12],[83,13],[74,14],[60,15],[54,16],[43,17],[29,18],[13,19],[7,20],[0,21],[0,22],[0,23]]];


const tabs: Tab[] = [
  {
    title: "Sunday",
    value: "tab1",
  },
  {
    title: "Monday",
    value: "tab2",
  },
  {
    title: "Tuesday",
    value: "tab3",
  },
  {
    title: "Wednesday",
    value: "tab4",
  },
  {
    title: "Thursday",
    value: "tab5",
  },
  {
    title: "Friday",
    value: "tab6",
  },
  {
    title: "Saturday",
    value: "tab7",
  },
];

interface BusynessData {
  // Define the structure of your data here
  busynessData1: number[][][]; // Use the same structure as your data
}
const processData = (tabData: number[][]) => {
  return tabData.map(([busyness, time]) => ({
    name: String(time), // Assuming time is a number, convert it to a string
    UsualBusyness: busyness,
  }));
};

export default function Tabs({ busynessData1 }: BusynessData) {
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
                "radix-state-active:border-b-gray-700 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-gray-50 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-900 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800",
                "flex-1 px-3 py-2.5 w-full",
                "focus:radix-state-active:border-b-red",
                "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
                // Removed the explicit text color classes
              )}
            >
              <span
                className={clsx(
                  "text-sm font-medium",
                  // Removed the explicit text color classes
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
                  let tabData: number[][] = [];

                  if (busynessData && Array.isArray(busynessData)) {
                    // Determine which tab's data to use based on the 'value'
                    switch (value) {
                      case "tab1":
                        tabData = busynessData[0];
                        break;
                      case "tab2":
                        tabData = busynessData[1];
                        break;
                      case "tab3":
                        tabData = busynessData[2];
                        break;
                      case "tab4":
                        tabData = busynessData[3];
                        break;
                      case "tab5":
                        tabData = busynessData[4];
                        break;
                      case "tab6":
                        tabData = busynessData[5];
                        break;
                      case "tab7":
                        tabData = busynessData[6];
                        break;
                      default:
                        break;
                    }
                  }
                  if (tabData.length > 0) {
                    return (
                      <div className="flex flex-row justify-center mt-10 items-center">
                        {/* <BarGraph receivedData = {processData(tabData)}/> */}
                        <AreaGraph receivedData={processData(tabData)} />
                      </div>
                    );
                  } else {
                    return <div className = "w-full"></div>
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
