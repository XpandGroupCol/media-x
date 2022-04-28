import { useEffect, useState, createContext, useContext } from 'react'
import { Alert, Snackbar } from '@mui/material'

const NotificationContext = createContext()

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ message: '', type: 'success' })
  const [showNotification, setShowNotification] = useState(false)

  const handleCloseNotification = () => {
    setShowNotification(false)
    setNotification(prev => ({ ...prev, message: '' }))
  }

  useEffect(() => {
    setShowNotification(Boolean(notification?.message))
  }, [notification, showNotification])

  return (
    <NotificationContext.Provider
      value={{ notify: setNotification }}
    >
      <Snackbar
        open={showNotification}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification?.type}>
          {notification?.message}
        </Alert>
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)

export default NotificationProvider
