// React と NextPage を読み込む
import React, {useState} from 'react'
import axios, { AxiosInstance } from 'axios'

import { Alert } from 'react-bootstrap'
import { DataTable } from '../../components/dataTable'
import Head from 'next/head'
import { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  type datagraph = {
    id: Number
    dp: Number
  }
  const alphaVantData : datagraph[] = []
  const [showDownloadAPIDataSuccessAlert, setDownloadAPIDataSuccessAlert] = useState(false)
  const [dataForTable, setDataForTable] = useState<datagraph[]>([])
  const getData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("inside getdata")
    let instance: AxiosInstance
    instance = axios.create({
      baseURL: 'https://www.alphavantage.co',
    })
  
    try {
      const ibmdata: number[] = []
      const response = await instance.get('/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=' + process.env.APIKEY)    
      const weekly_data: Object[] = response.data['Weekly Time Series']

      Object.keys(weekly_data).map((key) => (
        ibmdata.push(weekly_data[key]['2. high'])
      ))
      Object.keys(weekly_data).forEach((value, key) => (
        alphaVantData.push({id:key, dp:weekly_data[value]['2. high']})
      ))
      console.log("ibm data")
      console.log(ibmdata)
      console.log(ibmdata.length)
      console.log(alphaVantData)
      setDownloadAPIDataSuccessAlert(true)
      setDataForTable(alphaVantData)
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
        <input type="submit" onChange={getData} value="hello"/>
        <button onClick={getData}>
          Get IBM Data
        </button>
        <p className={styles.description}>
          Get started bdfasdfsy editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <DataTable
          ibmdatapoints={dataForTable}
        />

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
