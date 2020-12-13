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
      const response = await instance.get('/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=' + process.env.APIKEY)
      console.log(response)
      console.log(response.data.bestMatches[0])
      response.data.bestMatches.forEach((element) => {
        console.log(element['9. matchScore'])
      })
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
