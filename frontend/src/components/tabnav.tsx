import * as TabsPrimitive from "@radix-ui/react-tabs";
import BarGraph from "./graph";
import { clsx } from "clsx";
import Button from "./button";
import React from "react";

interface Tab {
title: string;
value: string;
}

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
    busynessData: number[][][]; // Use the same structure as your data
  }
const processData = (tabData: number[][]) => {
    return tabData.map(([busyness, time]) => ({
        name: String(time), // Assuming time is a number, convert it to a string
        UsualBusyness: busyness,
    }));
};



export default function Tabs({ busynessData }: BusynessData) {
    return (
      <TabsPrimitive.Root defaultValue="tab1">
        <TabsPrimitive.List
          className={clsx("flex w-full rounded-t-lg bg-white dark:bg-gray-800")}
        >
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
                "flex-1 px-3 py-2.5",
                "focus:radix-state-active:border-b-red",
                "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              )}
            >
              <span
                className={clsx(
                  "text-sm font-medium",
                  "text-gray-700 dark:text-gray-100"
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
            className={clsx("rounded-b-lg bg-white px-6 py-4 dark:bg-gray-800")}
          >
            <span className="text-sm text-gray-700 dark:text-gray-100">
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
                        <BarGraph receivedData={processData(tabData)} />
                      </div>
                    );
                  } else {
                    return <Button>click</Button>;
                  }
                } catch (error) {
                  console.error(error);
                  return <div>An error occurred.</div>;
                }
              })()}
            </span>
          </TabsPrimitive.Content>
        ))}
      </TabsPrimitive.Root>
    );
  }
  
  
