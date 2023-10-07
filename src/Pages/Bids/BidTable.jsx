import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatTimestamp } from "state/globalFunctions";

// Define a functional component named BasicTable that takes a 'rows' prop
export default function BasicTable({ rows }) {
  // Render a table with the provided rows
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {/* Table header */}
        <TableHead>
          <TableRow>
            <TableCell>Bidder</TableCell>
            <TableCell>Bid Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        {/* Table body */}
        <TableBody>
          {/* Map over the 'rows' prop to generate table rows */}
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* Display bidder's name */}
              <TableCell>{row.user_id.name}</TableCell>
              {/* Display bid amount */}
              <TableCell>{row.bid_amount}</TableCell>
              {/* Display date using the 'formatTimestamp' function */}
              <TableCell>{formatTimestamp(row.timestamp).date}</TableCell>
              {/* Display time using the 'formatTimestamp' function */}
              <TableCell>{formatTimestamp(row.timestamp).time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
