type DropdownDirection = "left" | "top" | "right" | "bottom";
type DropdownProps = {
	direction: DropdownDirection;
	children: JSX.Element | JSX.Element[];
};

const Dropdown = ({ direction, children }: DropdownProps) => {
	return <div></div>;
};

export default Dropdown;
