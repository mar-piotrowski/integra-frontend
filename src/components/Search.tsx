import { InputHTMLAttributes } from "react";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {}

const Search = ({ ...props }: SearchProps) => {
	return (
		<input
			{...props}
			className="px-10 py-2 text-sm text-center bg-white rounded outline-none text-fontColor"
			placeholder="Wyszukaj"
		/>
	);
};

export default Search;
