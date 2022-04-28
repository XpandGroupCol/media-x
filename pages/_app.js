import { SWRConfig } from 'swr'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import NotificationProvider from 'providers/notificationProvider'

import { lightTheme } from '../theme'
import './globalStyles.css'
import ListProvider from 'providers/listProvider'
import SessionProvider from 'providers/sessionProvider'
import Layout from 'layout'
import { fetcher } from 'utils/fetcher'

function MyApp ({ Component, pageProps }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <NotificationProvider>
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
        </NotificationProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default MyApp
