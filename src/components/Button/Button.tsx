import React, { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components/macro';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  stretch?: boolean;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
};

interface StyleButtonProps {
  stretch?: boolean;
  disabled?: boolean;
}

const StyledButton = styled.button<StyleButtonProps>`
  height: 62px;
  width: ${(p) => (p.stretch ? '100%' : 'max-content')};
  background: ${(p) =>
    p.disabled
      ? p.theme.palette.action.disabled
    : p.theme.palette.primary.main};
  color: ${p => p.theme.palette.common.white};
  border: none;
  border-radius: 31px;
  cursor: pointer;
  padding: 0px 31px;
  outline:none;
`;

export default Button;
