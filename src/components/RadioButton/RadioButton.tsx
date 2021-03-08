import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react'
import styled from 'styled-components/macro'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string
  id: string
  name: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
}

const RadioButton: FC<InputProps> = ({ id, name, value, text, onChange, ...props }: any) => {
  return (
    <StyledRadioButton>
      <input {...props} id={id} type="radio" name={name} value={value} onChange={onChange} />
      <label htmlFor={id}>{text}</label>
    </StyledRadioButton>
  )
}

const StyledRadioButton = styled.div`
  position: relative;
  & > input[type='radio'] {
    opacity: 0;
  }
  & > label {
    font-size: ${(p) => p.theme.typography.fontSize}px;
    line-height: ${(p) => p.theme.typography.lineHeight}px;
    padding-left: 8px;
  }
  & > label:before {
    border-radius: 50%;
    border: 1px solid ${(p) => p.theme.palette.primary.main};
    bottom: 2px;
    content: '';
    display: inline-block;
    height: 12px;
    left: 0;
    position: absolute;
    width: 12px;
  }
  & > input[type='radio']:checked + label:after {
    background: ${(p) => p.theme.palette.primary.main};
    border-radius: 50%;
    bottom: 5px;
    content: '';
    display: inline-block;
    height: 8px;
    left: 3px;
    position: absolute;
    width: 8px;
  }

  & + & {
    font-size: ${(p) => p.theme.typography.fontSize};
    margin-left: 25px;
  }
`

export default RadioButton
