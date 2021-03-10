import * as yup from 'yup'
import { Gender } from '../../apollo/__generated__/globalTypes'


export type FormData = {
  name: string
  email: string
  password: string
  country: string
  gender?: Gender
  terms: boolean
}

export const formSignUpSchemaValidation = yup.object().shape<FormData>({
  name: yup.string().required('Name is required').matches(/^[a-zA-Z]+$/, 'Please enter a valid name'),
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  password: yup.string().required('Password is required').min(6, 'Password must contain at least 6 symbols'),
  gender: yup.string().required('You must select the gender') as yup.MixedSchema<Gender>,
  country: yup.string().required('You must select your country'),
  terms: yup.boolean().required('Policies is required').oneOf([true], 'You must accept the policies')
})