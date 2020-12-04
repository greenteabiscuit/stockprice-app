import '../styles/globals.css'

import { AppProps } from 'next/app'
import React from 'react'

// 引数に型を追加する
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // 関数の内容はそのまま
  return <Component {...pageProps} />
}

export default MyApp
