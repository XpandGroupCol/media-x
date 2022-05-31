import { SWRConfig } from 'swr'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import { lightTheme } from '../theme'
import './globalStyles.css'
import ListProvider from 'providers/listProvider'
import SessionProvider from 'providers/sessionProvider'
import Layout from 'layout'
import { fetcher } from 'utils/fetcher'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp ({ Component, pageProps }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>

        <SessionProvider>
          <SWRConfig value={{
            fetcher: (resource) => fetcher(resource).then(({ data }) => data),
            revalidateOnFocus: false
          }}
          >
            {pageProps.protected
              ? (
                <Component {...pageProps} />
                )
              : (

                <Layout>
                  <ListProvider>
                    <Component {...pageProps} />
                  </ListProvider>
                </Layout>
                )}
          </SWRConfig>
        </SessionProvider>
        <CssBaseline />
        <ToastContainer theme='colored' />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default MyApp
