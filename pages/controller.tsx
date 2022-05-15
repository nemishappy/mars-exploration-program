import React, { useState } from "react";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Head from "next/head";

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
  { id: 0, input: "", direction: "N", posX: 0, posY: 0, reachEdge: false },
];
interface Output {
  id: number;
  input: string;
  direction: string;
  posX: number;
  posY: number;
  reachEdge: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

const Controller = () => {
  const [isValid, setValid] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [outputs, setOutput] = useState(initialTasks);

  const header = ["input", "output"];

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
      };
    }
  };

  function validInputs(lines: string[]): boolean {
    if (lines[0] && !isNaN(Number(lines[0]))) {
      for (let index = 1; index < lines.length; index++) {
        const element = lines[index];
        switch (element) {
          case "F":
            break;

          case "L":
            break;

          case "R":
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
    const dirc = ["N", "E", "S", "W"];
    // Make a shallow copy of the items
    let items = [...outputs];
    // Make a shallow copy of the item to mutate
    let item = {
      ...items[0],
      input: lines[0],
    };
    // Put it back into our array.
    items[0] = item;
    // Set the state to our new copy
    setOutput([...items]);
    const range = Number(lines[0]);
    let rotation = range * 4;
    let prevDirc = 0;
    let prevX = outputs[0].posX;
    let prevY = outputs[0].posY;
    let output: Output;
    for (let index = 1; index < lines.length; index++) {
      const element = lines[index];

      switch (element) {
        case "F":
          switch (prevDirc) {
            case 0: // North
              if (prevY < range) {
                prevY++;
              }
              break;

            case 1: // East
              if (prevX < range) {
                prevX++;
              }
              break;

            case 2: // South
              if (prevY > 0) {
                prevY--;
              }
              break;

            case 3: // West
              if (prevX > 0) {
                prevX--;
              }
              break;

            default:
              setErrMsg("Something went wrong.");
              return;
          }

          break;

        case "L":
          rotation--;
          break;

        case "R":
          rotation++;
          break;
      }
      prevDirc = rotation % 4;

      output = {
        id: nextId++,
        input: element,
        direction: dirc[prevDirc],
        posX: prevX,
        posY: prevY,
        reachEdge: false,
      };
      add(output);
    }
  }

  function add(item: Output): void {
    setOutput((prev) => [...prev, item]);
  }
  function resetOutput() {
    setOutput(initialTasks);
    nextId = 1;
  }

  return (
    <Layout>
      <Head>
        <title>Get Strat!</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Help us control rover that explore Mars planet!</p>
        <h3>Controller</h3>
        <p>Please upload control order code (.txt only)</p>

        <p>
          &emsp;NOTE: becareful if rover reaching the edge it will be stuck!
        </p>
      </section>
      <section>
        <div className={utilStyles.dFlexCol}>
          <input accept="text/plain" type="file" onChange={handleChange} />
          <button
            className={utilStyles.my1}
            onClick={resetOutput}
            disabled={!isValid}
          >
            Reset
          </button>
        </div>
        {errMsg ? <p className={utilStyles.error}>{errMsg}</p> : <></>}
      </section>

      <section className={utilStyles.my1r}>
        {outputs[0].input ? (
          <>
            <h3>Result</h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      {header[0]}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {header[1]}
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {outputs.map(({ id, input, direction, posX, posY }) => {
                    const WhichTableCell = StyledTableCell;
                    return (
                      <StyledTableRow key={id}>
                        <WhichTableCell align="center">{input}</WhichTableCell>
                        <WhichTableCell align="center">
                          {direction + ":" + posX + "," + posY}
                        </WhichTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <></>
        )}
      </section>
    </Layout>
  );
};

export default Controller;
