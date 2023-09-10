type HamburgerProps = {
	onClick: () => void;
};

const Hamburger = ({ onClick }: HamburgerProps) => {
	return (
		<div
			onClick={onClick}
			className="flex flex-col items-center justify-center cursor-pointer"
		>
			<div className="w-[26px] h-[2px] mb-[5px] bg-black rounded"></div>
			<div className="w-[26px] h-[2px] mb-[5px] bg-black rounded"></div>
			<div className="w-[26px] h-[2px] bg-black rounded"></div>
		</div>
	);
};

export default Hamburger;
