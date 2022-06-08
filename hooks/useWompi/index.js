import useNotification from 'hooks/useNotification'
import { useCallback, useLayoutEffect, useState } from 'react'
import { WOMPI_KEY } from 'utils/config'

const config = ({ amountInCents, email, fullName, phoneNumber, legalId, phoneNumberPrefix, redirectUrl, reference }) => ({
  currency: 'COP',
  amountInCents,
  reference,
  publicKey: WOMPI_KEY,
  redirectUrl,
  customerData: {
    email,
    fullName,
    phoneNumber,
    legalId,
    legalIdType: 'NIT',
    phoneNumberPrefix
  }
})

const useWompi = () => {
  const [disabled, setDisabled] = useState(false)
  const notify = useNotification()

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || typeof window?.WidgetCheckout === 'undefined') {
      setDisabled(true)
    }
  }, [])

  const wompi = useCallback((params) => {
    const checkout = new window.WidgetCheckout({ ...config(params) })
    if (!checkout) return notify({ message: 'Estamos presentando un inconveniento por favor intente mas tarde.', type: 'error' })

    return checkout
  }, [])

  return {
    disabled,
    wompi
  }
}

export default useWompi
