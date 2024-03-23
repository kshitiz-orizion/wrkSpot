import React from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";
import { Country } from "../App";

const Table = ({data, loading}) => {

    const columnHelper = createColumnHelper<Country>();

    const columns = [
        columnHelper.accessor("name", {
          header: () => "Country Name",
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("abbreviation", {
          id: "code",
          cell: (info) => <i>{info.getValue()}</i>,
          header: () => <span>Code</span>,
        }),
        columnHelper.accessor("capital", {
          header: () => "Capital",
          cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("phone", {
          header: () => "Ph Code",
        }),
        columnHelper.accessor("population", {
          header: "Population",
        }),
        columnHelper.accessor("media", {
          header: "Flag",
          cell: (info) => {
            return (
              <img
                style={{ height: "20px", width: "20px" }}
                src={info.renderValue()?.flag}
                alt={""}
              />
            );
          },
        }),
        columnHelper.accessor("media", {
          header: "Emblem",
          cell: (info) => {
            return (
              <img
                style={{ height: "20px", width: "20px" }}
                src={info.renderValue()?.emblem}
                alt={""}
              />
            );
          },
        }),
      ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

    return(
        <div className="tableContainer">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {loading ? 
          <h2>Loading.....</h2>
          :
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
    )
}

export default Table