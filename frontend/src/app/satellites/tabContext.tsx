"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type TabType = "sat parameters" | "satellite image" | "satellite telemetry";

interface TabContextType {
    selectedTab: TabType;
    // eslint-disable-next-line no-unused-vars
    setSelectedTab: (tab: TabType) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);
export function TabProvider({ children }: { children: ReactNode }) {
    const [selectedTab, setSelectedTab] = useState<TabType>("sat parameters");

    return (
        <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
            {children}
        </TabContext.Provider>
    );
}

export function useTabContext(): TabContextType {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error("useTabContext must be used within a TabProvider");
    }
    return context;
}
