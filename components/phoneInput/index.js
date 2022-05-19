import { forwardRef } from 'react'
import Phone from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import styles from './phone.module.css'
const PhoneInput = forwardRef(({ value, onChange, label, name, ...props }, ref) => (
  <Phone
    label={label}
    value={value}
    fullWidth
    onChange={(value, data) => {
      onChange({
        phone: value,
        dialCode: data.dialCode
      })
    }}
    name={name}
    country='co'
    onlyCountries={['co']}
    containerClass={styles.input}
    inputClass={styles.inputClass}
    {...props}
  />
))

export default PhoneInput
