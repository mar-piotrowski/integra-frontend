import { useContext } from "react";
import SidebarContext, { SidebarContextType } from "../context/SidebarContext";
import { SlArrowDown } from "react-icons/sl";
import { IoMailOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import Hamburger from "./Hamburger";

const Topbar = () => {
	const { setOpen } = useContext(SidebarContext) as SidebarContextType;

	return (
		<div className="flex items-center justify-between w-full px-5 py-3 mb-4 rounded shadow-sm bg-default-white">
			<Hamburger onClick={setOpen} />
			<div className="flex gap-4">
				<div className="flex items-center gap-4">
					<BsSearch className="text-xl" />
					<IoMailOutline className="text-2xl" />
				</div>
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-full bg-primary-600"></div>
					<div className="mr-3">
						<div className="text-sm font-bold">Marcin Piotrowski</div>
						<div className="text-xs">Senior engineer</div>
					</div>
					<SlArrowDown className="relative text-xl cursor-pointer" />
				</div>
			</div>
		</div>
	);
};
export default Topbar;
