import * as yup from 'yup'

export const defaultValues = {
  publishers: []
}

export const publisherSchema = yup.object({
  publishers: yup.array().of(
    yup.object({
      publisherId: yup.string().required('Formato es requerido.').nullable(),
      publisher: yup.string().required('Formato es requerido.').nullable(),
      device: yup.string().required('Formato es requerido.').nullable(),
      format: yup.array().min(1).required(),
      share: yup.string().required('Formato es requerido.').nullable(),
      value: yup.string().required('Formato es requerido.').nullable(),
      objectiveGoal: yup.string().required('Formato es requerido.').nullable()
    })
  )
}).required()
