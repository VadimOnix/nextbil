import { useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components/macro';
import Input from '../Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Select, { SelectItem } from '../Select/Select';
import RadioGroup, { RadioOptions } from '../RadioGroup/RadioGroup';
import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';

const countryOptions: SelectItem[] = [
  { value: 'Latvia', text: 'Latvia' },
  { value: 'Lebanon', text: 'Lebanon' },
  { value: 'Lesotho', text: 'Lesotho' },
  { value: 'Liberia', text: 'Liberia' },
  { value: 'Libya', text: 'Libya' },
];

const genderOptions: RadioOptions[] = [
  { value: 'Male', text: 'Male' },
  { value: 'Female', text: 'Female' },
];

const FormSignUp = () => {
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      country: '',
      gender: '',
      terms: false,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div className="title-wrapper">
        <h1 className="title">Create a new account</h1>
      </div>
      <div className="input-group">
        <Input
          aria-label="Enter your name"
          autoComplete={'username'}
          error={'Please enter a valid name'}
          id={'name'}
          name={'name'}
          onChange={handleChange}
          placeholder="Enter your name"
          type={'text'}
          value={values.name}
        />
        <Input
          aria-label="Enter email"
          autoComplete={'email'}
          error={'Please enter a valid email address'}
          icon={<FontAwesomeIcon icon={faEnvelope} />}
          id={'email'}
          name={'email'}
          onChange={handleChange}
          placeholder="Email"
          type={'text'}
          value={values.email}
        />
        <Input
          aria-label="Enter password"
          autoComplete={'current-password'}
          error={'Password must contain at least 6 symbols'}
          icon={<FontAwesomeIcon icon={faLock} />}
          id={'password'}
          name={'password'}
          onChange={handleChange}
          placeholder="Password"
          type={'password'}
          value={values.password}
        />
        <Select
          defaultValue={'Select country'}
          error={'You must select your country'}
          handleSelect={setFieldValue}
          items={countryOptions}
          name="country"
          value={values.country}
        />
      </div>
      <div className="radio-group">
        <RadioGroup
          error={'You must select the gender'}
          name="gender"
          options={genderOptions}
          value={values.gender}
          onChange={handleChange}
        />
      </div>
      <div className="checkbox-group">
        <Checkbox
          name="terms"
          checked={values.terms}
          onChange={handleChange}
          error={'You must accept the policies'}>
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
        <Button stretch disabled>Sign Up</Button>
      </div>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  align-items: center;
  border-radius: ${(p) => p.theme.shape.borderRadius};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 605px;
  padding: 32px 28px 53px 29px; // TODO: Вопрос к дизайнеру по левому и правому отступу
  width: 400px;
  .title-wrapper {
    .title {
      color: ${(p) => p.theme.palette.text.primary};
      font-size: 1.7rem;
      font-weight: ${(p) => p.theme.typography.fontWeightBold};
      letter-spacing: 0px;
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
`;

export default FormSignUp;
