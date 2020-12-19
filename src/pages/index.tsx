import { HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from "react-vis";
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
    x: String
    y: Number
  }
  interface DataTypes {
    x: Number;
    y: Number;
  }
  const alphaVantData : datagraph[] = []
  const [showDownloadAPIDataSuccessAlert, setDownloadAPIDataSuccessAlert] = useState(false)
  const [dataForTable, setDataForTable] = useState<datagraph[]>([])
  const [dataReactVis, setDataReactVis] = useState<DataTypes[]>([])
  
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
        alphaVantData.push({x:key, y:weekly_data[key]['2. high']})
      ))
      console.log("ibm data")
      console.log(ibmdata)
      console.log(ibmdata.length)
      console.log(alphaVantData)
      setDownloadAPIDataSuccessAlert(true)
      setDataForTable(alphaVantData)
      const randomdata: DataTypes[] = []
      Object.keys(weekly_data).map((value, key) => (
        randomdata.push({x:key, y:weekly_data[value]['2. high']})
      ))
      console.log(randomdata.slice(1, 100))
      setDataReactVis(randomdata.slice(1, 20))
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
        <button onClick={getData}>
          Get IBM Data
        </button>
        <p className={styles.description}>
          Get started bdfasdfsy editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <XYPlot width={800} height={400}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries data={dataReactVis} />
        </XYPlot>
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
