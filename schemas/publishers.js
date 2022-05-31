import * as yup from 'yup'

export const defaultValues = {
  publishers: []
}

export const publisherSchema = yup.object({
  publishers: yup.array().of(
    yup.object({
      share: yup.string().required('Share es requerido.').nullable()
    })
  )
}).required()
