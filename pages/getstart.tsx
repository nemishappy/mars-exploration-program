import React, { useState } from "react";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

let nextId = 1;
const initialTasks = [
  { id: 0, direction: "N", posX: "0", posY: "0", reachEdge: false },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ColoredTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#60A5FA",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const GetStart = () => {
  const [isValid, setValid] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [range, setRange] = useState(0);
  const [output, setOutput] = useState(initialTasks);

  const header = ["input", "output"];
  const data = [
    ["rl11", "rl12", "rl13"],
    ["rl21", "rl22", "rl23"],
    ["r31", "rl32", "rl33"],
  ];

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const { files } = e.currentTarget;
    if (files && files.length != 0) {
      fileReader.readAsText(files[0], "UTF-8");
      fileReader.onload = (e) => {
        const content = e.target!.result;
        const lines = (content as string).split(/\r\n|\r|\n/);

        if (validInputs(lines)) {
          setErrMsg("");
          processInputs(lines);
        } else {
          console.log("Invalid input");
          setErrMsg(
            "This is mars exploration mission every input must be correct."
          );
        }
        console.log(content);
      };
    }
  };
  function validInputs(lines: string[]): boolean {
    if (lines[0] && !isNaN(Number(lines[0]))) {
      for (let index = 1; index < lines.length; index++) {
        const element = lines[index];
        switch (element) {
          case "F":
            console.log(true);
            break;

          case "L":
            console.log(true);
            break;

          case "R":
            console.log(true);
            break;

          case "A":
            console.log(true);
            break;

          default:
            setValid(false);
            return false;
        }
      }
      setValid(true);
      return true;
    }
    setValid(false);
    return false;
  }

  function processInputs(lines: string[]): void {
    lines.forEach(function (value) {
      console.log(value);
    });
  }

  return (
    <Layout>
      <section>
        <div className={utilStyles.dFlexCol}>
          <input accept="text/plain" type="file" onChange={handleChange} />
          <button className={utilStyles.my1} disabled={!isValid}>Process</button>
        </div>
        {errMsg ? <p className={utilStyles.error}>{errMsg}</p> : <></>}
      </section>

      <section className={utilStyles.my1r }>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">{header[0]}</StyledTableCell>
                <StyledTableCell align="center">{header[1]}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {output.map(({id, direction, posX, posY}) => {
                const WhichTableCell = StyledTableCell;
                return (
                  <StyledTableRow key={id}>
                    <WhichTableCell align="center">{direction}</WhichTableCell>
                    <WhichTableCell align="center">{posX +':'+posY}</WhichTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </Layout>
  );
};

export default GetStart;
