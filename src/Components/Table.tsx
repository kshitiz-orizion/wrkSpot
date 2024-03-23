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
          cell: (info) => info.getValue() || 'N/A',
        }),
        columnHelper.accessor("abbreviation", {
          id: "code",
          cell: (info) => <i>{info.getValue() || 'N/A'}</i>,
          header: () => <span>Code</span>,
        }),
        columnHelper.accessor("capital", {
          header: () => "Capital",
          cell: (info) => info.renderValue() || 'N/A',
        }),
        columnHelper.accessor("phone", {
          header: () => "Ph Code",
          cell: (info) => info.renderValue() || 'N/A'
        }),
        columnHelper.accessor("population", {
          header: "Population",
          cell: (info) => info.renderValue() || 'N/A'
        }),
        columnHelper.accessor("media", {
          header: "Flag",
          cell: (info) => {
            return (
              <img
                className="flag"
                src={info.renderValue()?.flag}
                alt={"N/A"}
              />
            );
          },
        }),
        columnHelper.accessor("media", {
          header: "Emblem",
          cell: (info) => {
            return (
              <img
                className="flag"
                src={info.renderValue()?.emblem}
                alt={"N/A"}
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