// React と NextPage を読み込む
import React, {useState} from 'react'
import axios, { AxiosInstance } from 'axios'

import { Alert } from 'react-bootstrap'
import Head from 'next/head'
import { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [showDownloadAPIDataSuccessAlert, setDownloadAPIDataSuccessAlert] = useState(false)
  const getData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("inside getdata")
    let instance: AxiosInstance
    instance = axios.create({
      baseURL: 'https://www.alphavantage.co',
    })
  
    try {
      const response = await instance.get('/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=C3VP04YVKEMNHV0U')
      console.log(response)
      setDownloadAPIDataSuccessAlert(true)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <input type="submit" onChange={getData} value="hello"/>
        <button onClick={getData}>
          Activate
        </button>
        <p className={styles.description}>
          Get started bdfasdfsy editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <Alert
          variant="success"
          show={showDownloadAPIDataSuccessAlert}
          onClose={() => setDownloadAPIDataSuccessAlert(false)}
          dismissible
        >
          データをダウンロードしました。
        </Alert>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

// export を分離
export default Home
