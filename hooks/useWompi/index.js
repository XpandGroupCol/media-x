import { useNotification } from 'providers/notificationProvider'
import { useCallback, useLayoutEffect, useState } from 'react'
import { WOMPI_KEY } from 'utils/config'

const config = {
  currency: 'COP',
  amountInCents: 2490000,
  reference: `media-x-${Math.random().toString().slice(2, 16)}`,
  publicKey: WOMPI_KEY,
  customerData: { // Optional
    email: 'lola@gmail.com',
    fullName: 'Lola Flores',
    phoneNumber: '3040777777',
    phoneNumberPrefix: '+57',
    legalId: '123456789',
    legalIdType: 'CC'
  },
  shippingAddress: { // Optional
    addressLine1: 'Calle 123 #4-5',
    city: 'Bogota',
    phoneNumber: '3019444444',
    region: 'Cundinamarca',
    country: 'CO'
  }
}

const useWompi = () => {
  const [disabled, setDisabled] = useState(false)
  const { notify } = useNotification()
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || typeof window?.WidgetCheckout === 'undefined') {
      setDisabled(true)
    }
  }, [])

  const wompi = useCallback((params = config) => {
    const checkout = new window.WidgetCheckout({ ...params })
    if (!checkout) return notify({ message: 'Estamos presentando un inconveniento por favor intente mas tarde.', type: 'error' })

    checkout.open(function ({ transaction }) {
      const { createdAt, id, paymentMethodType, status } = transaction
      // aqui debo llamar al back para guardar esta data
      console.log({ createdAt, id, paymentMethodType, status })
    })
  }, [])

  return {
    disabled,
    wompi
  }
}

export default useWompi
