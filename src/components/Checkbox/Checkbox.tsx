import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components/macro';
import { StyledError } from '../Input/Input';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  error?: string;
}

const Checkbox: FC<InputProps> = ({
  name,
  checked,
  children,
  error,
  ...props
}) => {
  return (
    <StyledCheckbox>
      <div className='checkbox-wrapper'>
        <input
          id={name}
          type="checkbox"
          name={name}
          checked={checked}
          {...props}
        />
        <label htmlFor={name}>{children}</label>
      </div>
      {error && <StyledError>{error}</StyledError>}
    </StyledCheckbox>
  );
};

const StyledCheckbox = styled.div`
  .checkbox-wrapper > input[type='checkbox'] {
    display: none;
  }
  .checkbox-wrapper > label {
    font-size: ${(p) => p.theme.typography.fontSize}px;
    line-height: ${(p) => p.theme.typography.lineHeight}px;
    margin-left: 22px;
  }
  .checkbox-wrapper > label:before {
    border-radius: 3px;
    border: 1px solid ${(p) => p.theme.palette.primary.main};
    bottom: 1px;
    content: '';
    display: inline-block;
    height: 12px;
    left: 0;
    position: absolute;
    width: 12px;
  }
  .checkbox-wrapper > input[type='checkbox']:checked + label:after {
    background: transparent;
    border-bottom: 1px solid ${(p) => p.theme.palette.primary.main};
    border-left: 1px solid ${(p) => p.theme.palette.primary.main};
    bottom: 8px;
    content: '';
    display: inline-block;
    height: 3px;
    left: 3px;
    position: absolute;
    transform: rotate(-45deg);
    width: 7px;
  }
  .checkbox-wrapper {
    position:relative;
  }
`;
export default Checkbox;
