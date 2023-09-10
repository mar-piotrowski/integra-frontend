import { useEffect, useRef, useState } from "react";

type DropdownProps = {
	header: JSX.Element;
	menu: JSX.Element | JSX.Element[];
};

const Dropdown = ({ header, menu }: DropdownProps) => {
	const [toggle, setToggle] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const mouseHandler = (event: MouseEvent) => {
			if (!menuRef.current?.contains(event.target as Node)) setToggle(false);
		};
		document.addEventListener("mousedown", mouseHandler);
		return () => document.removeEventListener("mousedown", mouseHandler);
	}, []);

	return (
		<div ref={menuRef} className="relative">
			<div onClick={() => setToggle((prev) => !prev)}>{header}</div>
			<div
				className={`${
					toggle ? "visible" : "hidden"
				} absolute right-0 flex flex-col gap-4 p-4 bg-white rounded-md top-12`}
			>
				{menu}
			</div>
		</div>
	);
};

export default Dropdown;
