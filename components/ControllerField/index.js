import { Controller } from 'react-hook-form'

const ControllerField = ({ element: Component, name, control, ...props }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => <Component {...field} {...props} />}
  />
)

export default ControllerField
