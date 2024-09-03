import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link, IconButton } from "@mui/material";
import aeroIcon from "/aerosendIcon.svg";

interface Column {
  id: "name" | "email" | "mobile" | "role" | "message" | "action";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "name", label: "Name", minWidth: 126 },
  { id: "email", label: "Email", minWidth: 205 },
  {
    id: "mobile",
    label: "Mobile No",
    minWidth: 156,
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "role",
    label: "Role",
    minWidth: 130,
  },
  {
    id: "message",
    label: "Message",
    minWidth: 200,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 60,
    align: "center",
  },
];

interface Data {
  name: string;
  email: string;
  mobile: number;
  role: string;
  message: string;
}

function createData(
  name: string,
  email: string,
  mobile: number,
  role: string,
  message: string
): Data {
  return { name, email, mobile, role, message };
}

const rows = [
  createData("India", "example@example.com", 1324171354, "sales", "hi"),
  createData(
    "China",
    "test@test.com",
    1403500365,
    "enquiry",
    "this is the paragraph of memories"
  ),
  createData(
    "Italy",
    "longmessage@domain.com",
    60483973,
    "document",
    "this is a very long paragraph of memories that needs truncating or wrapping"
  ),
  createData(
    "China",
    "test@test.com",
    1403500365,
    "support",
    "this is the paragraph of memories"
  ),
  createData(
    "Italy",
    "longmessage@domain.com",
    60483973,
    "sales",
    "this is a very long paragraph of memories that needs truncating or wrapping"
  ),
  createData("India", "example@example.com", 1324171354, "sales", "hi"),
  createData(
    "China",
    "test@test.com",
    1403500365,
    "enquiry",
    "this is the paragraph of memories"
  ),
  createData(
    "Italy",
    "longmessage@domain.com",
    60483973,
    "document",
    "this is a very long paragraph of memories that needs truncating or wrapping"
  ),
  createData(
    "China",
    "test@test.com",
    1403500365,
    "support",
    "this is the paragraph of memories"
  ),
  createData(
    "Italy",
    "longmessage@domain.com",
    60483973,
    "sales",
    "this is a very long paragraph of memories that needs truncating or wrapping"
  ),
];

export default function ContactFormTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.email}
                    sx={{ paddingInline: "16px" }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id as keyof Data];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ padding: "8px" }}
                        >
                          {column.id === "role" ? (
                            <span
                              style={{
                                backgroundColor:
                                  value === "sales"
                                    ? "#8D9DF7"
                                    : value === "support"
                                    ? "#70C0F2"
                                    : value === "enquiry"
                                    ? "#32E47C"
                                    : "#f1f1f1",
                                color: "#221F1F",
                              }}
                              className="font-semibold text-xs px-2 py-1 rounded"
                            >
                              {value}
                            </span>
                          ) : column.id === "action" ? (
                            <Link href={`mailto:${row.email}`} underline="none">
                              <IconButton aria-label="send email">
                                <img src={aeroIcon} alt="" />
                              </IconButton>
                            </Link>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
