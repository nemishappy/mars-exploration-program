import React from "react";
import Layout from "../components/layout";

const getstart = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <Layout>
      <div>
        <input accept="text/plain" type="file" onChange={handleChange} />
      </div>
    </Layout>
  );
};

export default getstart;
