import type { NextPage } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>The mission to explore Mars planet</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>About</h2>
        <div className={styles.grid}>
          <Link href="/">
            <a className={styles.card}>
              <h2>Get Start &rarr;</h2>
              <p>Let&apos;s help us control rover that explore Mars planet!</p>
            </a>
          </Link>
          {/* <Link href="/">
            <a className={styles.card}>
              <h2>Incoming &rarr;</h2>
              <p>Yes this is incoming!</p>
            </a>
          </Link> */}
        </div>
      </section>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </Layout>
  );
};

export default Home;
