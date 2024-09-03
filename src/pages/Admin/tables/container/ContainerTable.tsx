import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as XLSX from "xlsx";
import { ExportIcon } from "../../../../components/svg/Tick";
import { useDolorFormat } from "../../../../utils/useDollorFormat";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import debounce from "lodash.debounce";

interface Column {
  id:
    | "container"
    | "size"
    | "condition"
    | "country"
    | "portLocation"
    | "price"
    | "quantity";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "container", label: "Container", minWidth: 150 },
  { id: "size", label: "Size", minWidth: 71 },
  {
    id: "condition",
    label: "Condition",
    minWidth: 100,
    format: (value: number) => value.toLocaleString("en-US"),
  },
  { id: "country", label: "Country", minWidth: 120 },
  { id: "portLocation", label: "Port", minWidth: 120 },
  { id: "price", label: "Price", minWidth: 70, align: "center" },
  { id: "quantity", label: "Quantity", minWidth: 88, align: "center" },
];

interface Data {
  type: string;
  size: string;
  condition: string;
  country: string;
  portLocation: string;
  price: string;
  stockCount: string;
  _id: string;
}
interface ExportData {
  type: string;
  size: string;
  condition: string;
  stockCount: string;
  portLocation: string;
  country: string;
  price: string;
}

export default function ContainerTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [exportData, setExportData] = useState<ExportData[]>([]);

  const [rows, setRows] = useState<Data[]>([]);
  const [totalcontainers, setTotalContainers] = useState(0);

  const [filter, setFilter] = useState({
    country: "",
    size: "",
    port: "",
    condition: "",
    type: "",
  });

  const fetchContainers = useCallback(
    debounce(async (filter) => {
      try {
        const response = await axiosInstance.get(
          "/api/containers/getallcontainer",
          {
            params: {
              country: filter.country,
              port: filter.port,
              size: filter.size,
              type: filter.type,
              condition: filter.condition,
              rowsPerPage: rowsPerPage,
              page: page,
            },
          }
        );
        setRows(response.data?.containers);
        console.log(response, "containers");
        setTotalContainers(response.data.totalContainers);
      } catch (error) {
        console.error(error);
      }
    }, 500),
    [rowsPerPage, page]
  );

  useEffect(() => {
    fetchContainers(filter);
  }, [filter, fetchContainers, page]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };
  const handleExport = () => {
    updateExport();
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "export.xlsx");
  };
  const updateExport = () => {
    const data: ExportData[] = rows.map((row) => ({
      type: row.type,
      size: row.size,
      condition: row.condition,
      stockCount: row.stockCount,
      portLocation: row.portLocation,
      country: row.country,
      price: row.price,
    }));
    setExportData(data);
  };
  return (
    <>
      <div className="px-4 py-3 flex justify-between items-center">
        <p className="text-2xl font-semibold">Container List</p>
        <div>
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-2 bg-[#8DF7E6] rounded-md p-3"
          >
            <span className="text-[#0E8773]">Export</span>{" "}
            <ExportIcon color="#0E8773" />
          </button>
        </div>
      </div>
      {/* dropdown for filter */}
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="max-w-40 px-4 py-3 rounded-xl border">
          <select name="" id="containerFilter" className="w-full">
            <option value="" selected>
              container
            </option>
            <option value="hi">size</option>
          </select>
        </div>
        <div className="max-w-40 px-4 py-3 rounded-xl border">
          <select name="" id="sizeFilter" className="w-full">
            <option value="" selected>
              Size
            </option>
            <option value="hi">size</option>
          </select>
        </div>
        <div className="max-w-40 px-4 py-3 rounded-xl border">
          <select name="" id="conditionFilter" className="w-full">
            <option value="" selected>
              Condition
            </option>
            <option value="hi">size</option>
          </select>
        </div>
        <div className="max-w-40 px-4 py-3 rounded-xl border">
          <select name="" id="countryFilter" className="w-full">
            <option value="" selected>
              Country
            </option>
            <option value="hi">size</option>
          </select>
        </div>
        <div className="max-w-40 px-4 py-3 rounded-xl border">
          <select name="" id="portFilter" className="w-full">
            <option value="" selected>
              Port
            </option>
            <option value="hi">size</option>
          </select>
        </div>
        <div>
          <button className="bg-[#005E99] rounded  px-6 py-[10px] text-white">
            Apply
          </button>
        </div>
      </div>

      {/* table */}

      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, background: "#E4E4E4" }}
                  >
                    <span className="font-semibold"> {column.label}</span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof Data];
                      const dolor = useDolorFormat;
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ padding: "8px" }}
                        >
                          {column.id === "price" ? (
                            <> {dolor(Number(value))}</>
                          ) : column.id === "container" ? (
                            row.type
                          ) : column.id === "portLocation" ? (
                            row.portLocation
                          ) : column.id === "quantity" ? (
                            row.stockCount
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={totalcontainers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
