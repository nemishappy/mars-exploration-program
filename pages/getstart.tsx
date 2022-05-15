import React from "react";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Head from "next/head";
import Link from "next/link";

const GetStart = () => {
  return (
    <Layout>
      <Head>
        <title>Get Strat!</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2>Introduction</h2>
        <h3>How to control rover?</h3>
        <p>1. Write control order code in text file! (.txt)</p>
        <p>
          &emsp;First line will always be a size of a maps.
          <br />
          &emsp;After that will be an instruction to move or rotate
        </p>
        <p>&emsp;The Control Order Code</p>
        <ul>
          <li className={utilStyles.listItem}>F for moving forward 1 block.</li>
          <li className={utilStyles.listItem}>L for turning left.</li>
          <li className={utilStyles.listItem}>R for turing right.</li>
        </ul>
        <p>
          &emsp;After the turning only direction will move.
          <br />
          &emsp;The rover will start at block(0,0) facing north.
          <br />
          &emsp;The maps will simulate in 3rd quadrant(+,+)
        </p>
        <p>
          &emsp;NOTE: Be careful if rover reaching the edge it will be stuck!
        </p>
        <p>2. Upload control order code to control rover</p>
      </section>
      <Link href="/controller">
        <a>
          <h2>Let&apos;s explore the Mars planet! &rarr;</h2>
          <p>Let&apos;s help us control rover that explore Mars planet!</p>
        </a>
      </Link>
    </Layout>
  );
};

export default GetStart;
