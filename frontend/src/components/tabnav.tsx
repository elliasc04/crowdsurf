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


const sampleData = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
    [2, 5],
    [6, 6],
    [20, 7],
    [43, 8],
    [73, 9],
    [100, 10],
    [79, 11],
    [45, 12],
    [18, 13],
    [10, 14],
    [13, 15],
    [24, 16],
    [16, 17],
    [13, 18],
    [10, 19],
    [8, 20],
    [5, 21],
    [2, 22],
    [1, 23],
    [1, 24]
  ];
  
  const inputdata = sampleData.map(([busyness, time]) => ({
    name: time, // Assuming time is the name
    UsualBusyness: busyness
  }));

interface Dataprocessor{
    tabData: number[][];
}

const processData = ({tabData}:Dataprocessor) => {
    return tabData.map(([busyness, time]) => ({
      name: String(time), // Assuming time is a number, convert it to a string
      UsualBusyness: busyness,
    }));
};



export default function Tabs({busynessData}:BusynessData) {

    try {
        if (busynessData && Array.isArray(busynessData)) {
          // Extract the seven internal lists from busynessData
          const [tab1Data, tab2Data, tab3Data, tab4Data, tab5Data, tab6Data, tab7Data] = busynessData;
    
          // ... Rest of the component remains the same
        } else {
          // Handle the case where busynessData is undefined, missing data, or not in the expected format
          console.log('No data available.');
        }
      } catch (error) {
        // Handle any other errors that might occur during rendering
        console.error(error);
        return <div>An error occurred.</div>;
      }
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
                {
                {
                    tab1: <div className = "flex flex-row justify-center mt-10 items-center">
                            <BarGraph receivedData = {inputdata}/>
                        </div>,
                    tab2: <Button>click</Button>,
                    tab3: "Order more coffee",
                    tab4: "Your inbox is empty",
                    tab5: "Make some coffee",
                    tab6: "Order more coffee",
                    tab7: "Order mfdsaore coffee",
                }[value]
                }
            </span>
            
            </TabsPrimitive.Content>
        ))}
        </TabsPrimitive.Root>
    );
};
