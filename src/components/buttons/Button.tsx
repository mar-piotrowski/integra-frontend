import { ButtonHTMLAttributes } from "react";

type ButtonSize = "sm" | "n" | "md";
type ButtonColor = "blue" | "red" | "green";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	size: ButtonSize;
	color: ButtonColor;
}

const sizeResolver = (size: ButtonSize) => {
	switch (size) {
		case "sm":
			return "text-sm";
		case "md":
			return "text-md";
		default:
			return "text-base";
	}
};

const colorResolver = (color: ButtonColor) => {
	switch (color) {
		case "green":
			return "bg-green-600 hover-green-500";
		case "red":
			return "bg-red-600 hover:bg-red-500";
		default:
			return "bg-primary-600 hover:bg-primary-500";
	}
};

const Button = ({ text, color, size, ...props }: ButtonProps) => {
	return (
		<button
			{...props}
			className={`${colorResolver(color)} ${sizeResolver(
				size
			)} text-white rounded p-2 transition`}
		>
			{text}
		</button>
	);
};

export default Button;
