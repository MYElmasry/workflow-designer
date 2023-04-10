import "./WorkflowList.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WorkflowList() {
  const [Workflows, setWorkflows] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://64307b10d4518cfb0e50e555.mockapi.io/workflow"
      );
      const data = await response.json();
      setWorkflows(data);
    }
    fetchData();
  }, []);
  return (
    <>
      <nav>
        <div className="container mx-auto">
          <h3 className="m-0 py-2">Workflows</h3>
        </div>
      </nav>
      <div className="container mx-auto pt-5">
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Input Type</TableCell>
                <TableCell align="right">Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Workflows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link to={`/workflow/${row.id}`}>
                      <span className="text-black">{row.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell align="right">{row.input_type}</TableCell>
                  <TableCell align="right">
                    {row.createdAt.slice(0, 10)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default WorkflowList;
