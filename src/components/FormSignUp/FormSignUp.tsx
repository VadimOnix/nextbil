import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Input from '../Input/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import Select, { SelectItem } from '../Select/Select'
import RadioGroup, { RadioOptions } from '../RadioGroup/RadioGroup'
import Checkbox from '../Checkbox/Checkbox'
import Button from '../Button/Button'
import { FormData, formSignUpSchemaValidation } from './validationSchema'
import { ApolloError, gql, useMutation } from '@apollo/client'
import { signUpUser, signUpUserVariables } from './__generated__/signUpUser'
import { Gender } from '../../apollo/__generated__/globalTypes'
import LoadingIcon from '../LoadingIcon/ButtonLoadingIcon'

const countryOptions: SelectItem[] = [
  { value: 'Latvia', text: 'Latvia' },
  { value: 'Lebanon', text: 'Lebanon' },
  { value: 'Lesotho', text: 'Lesotho' },
  { value: 'Liberia', text: 'Liberia' },
  { value: 'Libya', text: 'Libya' },
]

const genderOptions: RadioOptions[] = [
  { value: 'MALE', text: 'Male' },
  { value: 'FEMALE', text: 'Female' },
]

const SIGN_UP_USER = gql`
  mutation signUpUser($input: SignupInput!) {
    signup(input: $input) {
      id
      name
      email
      country
      gender
    }
  }
`

const FormSignUp = () => {
  const [error, setError] = useState<ApolloError>()
  const [signUpMutation, { data, loading }] = useMutation<signUpUser, signUpUserVariables>(SIGN_UP_USER, {
    onError: (error) => setError(error),
  })

  const sendData = async (data: FormData) => {
    await signUpMutation({
      variables: {
        input: {
          name: data.name,
          email: data.email,
          password: data.password,
          country: data.country,
          gender: data.gender as Gender,
        },
      },
    })
  }

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    setFieldValue,
    isValid,
    dirty,
    touched,
  } = useFormik<FormData>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      country: '',
      gender: undefined,
      terms: false,
    },
    validateOnChange: true,
    validationSchema: formSignUpSchemaValidation,
    onSubmit: sendData,
  })

  useEffect(() => setError(undefined), [values])

  useEffect(() => console.log(data), [data])

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div className="title-wrapper">
        <h1 className="title">Create a new account</h1>
      </div>
      <div className="input-group">
        <Input
          aria-label="Enter your name"
          autoComplete={'username'}
          error={(touched.name && errors.name) as string}
          id={'name'}
          name={'name'}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your name"
          type={'text'}
          value={values.name}
          tabIndex={1}
        />
        <Input
          aria-label="Enter email"
          autoComplete={'email'}
          error={(touched.email && errors.email) as string}
          icon={<FontAwesomeIcon icon={faEnvelope} />}
          id={'email'}
          name={'email'}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
          type={'text'}
          value={values.email}
          tabIndex={2}
        />
        <Input
          aria-label="Enter password"
          autoComplete={'current-password'}
          error={(touched.password && errors.password) as string}
          icon={<FontAwesomeIcon icon={faLock} />}
          id={'password'}
          name={'password'}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
          type={'password'}
          value={values.password}
          tabIndex={3}
        />
        <Select
          defaultValue={'Select country'}
          error={(touched.country && errors.country) as string}
          handleSelect={setFieldValue}
          onBlur={handleBlur}
          items={countryOptions}
          name="country"
          value={values.country}
          tabIndex={4}
        />
      </div>
      <div className="radio-group">
        <RadioGroup
          error={(touched.gender && errors.gender) as string}
          name="gender"
          options={genderOptions}
          value={values.gender as string}
          onBlur={handleBlur}
          onChange={handleChange}
          tabIndex={5}
        />
      </div>
      <div className="checkbox-group">
        <Checkbox
          name="terms"
          checked={values.terms}
          onChange={handleChange}
          error={(touched.terms && errors.terms) as string}
          tabIndex={6}
          onBlur={handleBlur}
        >
          Accept{' '}
          {
            <a href="#terms" className="link">
              terms
            </a>
          }{' '}
          and{' '}
          {
            <a href="#conditions" className="link">
              conditions
            </a>
          }
        </Checkbox>
      </div>
      <div className="submit-wrapper">
        <Button
          stretch
          disabled={!isValid || !dirty || loading}
          loading={loading}
          loadingIcon={<LoadingIcon />}
          error={!!error}
          tabIndex={7}
        >
          Sign Up
        </Button>
      </div>
      <div className="fetch-error-wrapper">{error?.message}</div>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  align-items: center;
  border-radius: ${(p) => p.theme.shape.borderRadius};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 605px;
  padding: 32px 28px 0 29px; // TODO: Вопрос к дизайнеру по левому и правому отступу
  width: 400px;
  .title-wrapper {
    .title {
      color: ${(p) => p.theme.palette.text.primary};
      font-size: 1.7rem;
      font-weight: ${(p) => p.theme.typography.fontWeightBold};
      letter-spacing: 0px;
      margin: 0;
    }
  }
  .input-group {
    margin-top: 37px;
    width: 100%;
    & > *:not(:last-child) {
      margin-bottom: 6px;
    }
  }
  .radio-group {
    margin-top: 14px;
    width: 100%;
  }
  .checkbox-group {
    margin-top: 17px;
    width: 100%;
  }
  .link {
    text-decoration: none;
    color: ${(p) => p.theme.palette.primary.main};
    &:active {
      text-decoration: none;
    }
  }
  .submit-wrapper {
    margin-top: 23px;
    width: 100%;
  }
  .fetch-error-wrapper {
    margin-top: 10px;
    min-height: 20px;
    font-size: 13px;
    text-align: center;
    color: ${(p) => p.theme.palette.primary.error};
  }
`

export default FormSignUp
