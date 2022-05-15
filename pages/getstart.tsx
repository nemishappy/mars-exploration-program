import React, { useState } from "react";
import Layout from "../components/layout";
import { getPostData } from "../lib/mission";
import { GetStaticProps, GetStaticPaths } from "next";

const GetStart = () => {
  const [inputs, setInputs] = useState<string[]>([]);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const { files } = e.currentTarget;
    if (files && files.length != 0) {
      fileReader.readAsText(files[0], "UTF-8");
      fileReader.onload = (e) => {
        const content = e.target!.result;
        const inputs = (content as string).split(/\r\n|\r|\n/);
        if (vaildInputs(inputs)) {
          setInputs(inputs);
        }
        console.log(content);
        console.log(inputs);
      };
    }
  };
  return (
    <Layout>
      <div>
        {inputs}
        <input accept="text/plain" type="file" onChange={handleChange} />
      </div>
    </Layout>
  );
};

function vaildInputs(inputs: string[]): boolean {
  if (inputs.length != 0) return true;
  return false;
}

function processInputs(): void {}

export default GetStart;
