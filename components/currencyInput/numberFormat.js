import { forwardRef } from 'react'
import NumberFormat from 'react-number-format'

const NumberFormatCustom = forwardRef(function NumberFormatCustom (props, ref) {
  const { onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        })
      }}
      thousandSeparator='.'
      decimalSeparator=','
      isNumericString
      prefix=''
    />
  )
})

export default NumberFormatCustom
