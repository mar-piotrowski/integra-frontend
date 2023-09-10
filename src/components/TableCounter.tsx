type TableCounterColors = "red" | "green" | "blue";

interface TableCounterProps {
	text: string;
	value: number;
	color: TableCounterColors;
}

const borderResolver = (color: TableCounterColors) => {
	switch (color) {
		case "green":
			return "border-l-4 border-l-green-500";
		case "red":
			return "border-l-4 border-l-red-500";
		default:
			return "border-l-4 border-l-primary-600";
	}
};

const textColor = (color: TableCounterColors) => {
	switch (color) {
		case "green":
			return "text-green-500";
		case "red":
			return "text-red-500";
		default:
			return "text-primary-600";
	}
};

const TableCounter = ({ text, value, color }: TableCounterProps) => {
	return (
		<div
			className={`${borderResolver(
				color
			)} flex gap-2 p-3 bg-white text-sm text-fontColor rounded`}
		>
			<div>{text}:</div>
			<div className={textColor(color)}>{value}</div>
		</div>
	);
};

export default TableCounter;
