import {
	PaginationState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/table-core";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

interface TableProps<T> {
	search: string;
	data: T[];
	columns: ColumnDef<T>[];
}

const Table = <T,>({ search, data, columns }: TableProps<T>) => {
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const [sorting, setSortng] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const tableData = useMemo(() => data, [data]);
	const tableColumns = useMemo<ColumnDef<T>[]>(() => columns, [columns]);
	const pagination = useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize]
	);

	useEffect(() => {
		setGlobalFilter(search);
	}, [search]);

	const table = useReactTable({
		data: tableData,
		columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			pagination,
			sorting,
			globalFilter,
		},
		onPaginationChange: setPagination,
		onSortingChange: setSortng,
		onGlobalFilterChange: setGlobalFilter,
		manualPagination: true,
	});
	return (
		<div>
			<table className="w-full bg-white rounded">
				<thead className="">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} className="text-left">
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="px-6 py-4 font-medium text-gray-300"
								>
									{header.isPlaceholder ? null : (
										<div
											{...{
												className: header.column.getCanSort()
													? "cursor-pointer select-none flex items-center gap-2"
													: "",
												onClick: header.column.getToggleSortingHandler(),
											}}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{{
												asc: <AiOutlineArrowUp />,
												desc: <AiOutlineArrowDown />,
											}[header.column.getIsSorted() as string] ?? null}
										</div>
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((column) => (
						<tr key={column.id} className="">
							{column.getVisibleCells().map((cell) => (
								<td key={cell.id} className="px-6 py-3">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex items-end gap-2 bg-white">
				<div className="flex ">
					<div>Strona</div>
					<div>
						{table.getState().pagination.pageIndex + 1}
						{" z "}
						{table.getPageCount()}
					</div>
				</div>
				<button onClick={() => table.setPageIndex(0)}>FirstPage</button>
				<button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
					LastPage
				</button>
			</div>
		</div>
	);
};

export default Table;
