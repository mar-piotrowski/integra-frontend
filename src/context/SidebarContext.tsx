import { createContext, useState } from "react";

export type SidebarContextType = {
	isOpen: boolean;
	setOpen: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

type SidebarContextProviderProps = {
	children: JSX.Element | JSX.Element[];
};

export const SidebarProvider = ({ children }: SidebarContextProviderProps) => {
	const [open, setOpen] = useState(true);

	const changeOpen = () => {
		setOpen((prev) => !prev);
	};

	return (
		<SidebarContext.Provider value={{ isOpen: open, setOpen: changeOpen }}>
			{children}
		</SidebarContext.Provider>
	);
};

export default SidebarContext;
