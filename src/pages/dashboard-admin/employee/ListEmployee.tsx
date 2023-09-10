import Search from "../../../components/Search";
import fakeData from "../../../MOCK_DATA.json";
import Table from "../../../components/Table";
import { ColumnDef } from "@tanstack/react-table";
import { ChangeEvent, useState } from "react";
import TableCounter from "../../../components/TableCounter";
import Button from "../../../components/buttons/Button";
import Modal from "../../../components/Modal";

type Person = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	gender: string;
	university: string;
};

const columnsProps: ColumnDef<Person>[] = [
	{
		header: "ID",
		accessorKey: "id",
	},
	{
		header: "Firstname",
		accessorKey: "first_name",
	},
	{
		header: "Lastname",
		accessorKey: "last_name",
	},
	{
		header: "Email",
		accessorKey: "email",
	},
	{
		header: "Gender",
		accessorKey: "gender",
	},
];

const ListEmployee = () => {
	const [search, setSearch] = useState("");

	const searchHandler = (event: ChangeEvent<HTMLInputElement>) =>
		setSearch(event.target.value);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between">
				<Search onChange={searchHandler} />
				<div className="flex gap-4">
					<TableCounter text="Liczba pracowników" value={2000} color="blue" />
					<TableCounter text="Nieaktywni" value={2000} color="red" />
					<TableCounter text="Aktywni" value={2000} color="green" />
					<Button text="Dodaj pracownika" size="sm" color="blue" />
				</div>
			</div>
			<Table search={search} data={fakeData} columns={columnsProps} />
		</div>
	);
};

export default ListEmployee;
