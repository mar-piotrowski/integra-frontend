type HamburgerProps = {
	onClick: () => void;
};

const Hamburger = ({ onClick }: HamburgerProps) => {
	return (
		<div
			onClick={onClick}
			className="flex flex-col items-center justify-center cursor-pointer"
		>
			<div className="w-[28px] h-[2px] mb-[5px] bg-gray-darker rounded"></div>
			<div className="w-[28px] h-[2px] mb-[5px] bg-gray-darker rounded"></div>
			<div className="w-[28px] h-[2px] bg-gray-darker rounded"></div>
		</div>
	);
};

export default Hamburger;
