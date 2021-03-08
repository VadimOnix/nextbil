import React, { ChangeEvent, FC, InputHTMLAttributes, useMemo } from 'react'
import styled from 'styled-components/macro'
import { StyledError } from '../Input/Input'
import RadioButton from '../RadioButton/RadioButton'

export type RadioOptions = {
  text: string
  value: string | number
}

interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  options: RadioOptions[]
  value: string | number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const RadioGroup: FC<RadioGroupProps> = ({ error, name, onChange, options, value, ...props }) => {
  const radioItems = useMemo(
    () =>
      options.map((o, i) => (
        <RadioButton
          key={o.value}
          name={name}
          id={`${name}-${i}`}
          value={o.value as string}
          onChange={onChange}
          {...props}
        />
      )),
  )

  return (
    <RadioGroupWrapper>
      <div className="options-wrapper">{radioItems}</div>
      {error && <StyledError>{error}</StyledError>}
    </RadioGroupWrapper>
  )
}

const RadioGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 31px;
  .options-wrapper {
    margin-bottom: auto;
    display: flex;
    flex-basis: 100%;
  }
`

export default RadioGroup
