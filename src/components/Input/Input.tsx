import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components/macro';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: JSX.Element;
  name: string;
}

const Input: FC<InputProps> = ({ error, icon, name, ...props }) => {
  return (
    <div className="input-wrapper">
      <StyledInput>
        {icon && <div className="icon-wrapper">{icon}</div>}
        <input
          id={props.id}
          name={name}
          onChange={props.onChange}
          type={props.type}
          value={props.value}
          {...props}
        />
      </StyledInput>
      {error && <StyledError>{error}</StyledError>}
    </div>
  );
};

export const StyledError = styled.span`
  color: ${(p) => p.theme.palette.text.error};
  display: block;
  font-size: 0.625rem;
  line-height: 0.8125rem;
  margin-left: 18px;
`;

export const StyledInput = styled.div`
  align-items: center;
  background-color: ${(p) => p.theme.palette.background.input};
  border-radius: ${(p) => p.theme.shape.borderRadius};
  display: flex;
  margin-bottom: 2px;
  padding: 17px 18px;
  input {
    background-color: ${(p) => p.theme.palette.background.input};
    border: none;
    color: ${(p) => p.theme.palette.text.primary};
    font-size: ${(p) => p.theme.typography.fontSize}px;
    line-height: ${(p) => p.theme.typography.lineHeight}px;
    width: 100%;
  }
  input:focus {
    outline: none;
  }
  .icon-wrapper {
    color: ${(p) => p.theme.palette.text.secondary};
    width: 34px;
  }
`;

export default Input;
