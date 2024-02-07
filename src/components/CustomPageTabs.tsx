import React, { SyntheticEvent, useEffect, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useLocation } from "react-router-dom";

export interface CustomTabItem {
    title: string;
    link: string;
}

interface CustomTabsProps {
    tabs: CustomTabItem[];
}

const CustomPageTabs = ({ tabs }: CustomTabsProps) => {
    const [value, setValue] = useState(0);
    const location = useLocation();

    useEffect(() => {
            const index = tabs.findIndex(tab => tab.link == location.pathname);
            setValue(index);
        }, [])

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const renderedTabs = tabs.map((tab, index) =>
        <Tab
            key={index}
            component={Link}
            to={tab.link}
            label={tab.title}
        />
    );

    return (
        <Tabs value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            sx={{ marginBottom: "20px" }}
        >
            {renderedTabs}
        </Tabs>
    )
}

export default CustomPageTabs;