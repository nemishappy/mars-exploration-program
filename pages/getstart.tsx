import React, { useState } from "react";
import Layout from "../components/layout";
import { GetStaticProps, GetStaticPaths } from "next";
import utilStyles from "../styles/utils.module.css";

let nextId = 1;
const initialTasks = [
  { id: 0, direction: "N", posX: "0", posY: "0", reachEdge: false },
];
const GetStart = () => {
  const [isValid, setValid] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [range, setRange] = useState(0);
  const [output, setOutput] = useState(initialTasks);

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
      <div className={utilStyles.dFlexCol}>
        <input accept="text/plain" type="file" onChange={handleChange} />
        <button disabled={!isValid}>Process</button>
      </div>
      {errMsg ? <p className={utilStyles.error}>{errMsg}</p> : <></>}
    </Layout>
  );
};

export default GetStart;
