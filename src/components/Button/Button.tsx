import React, { ButtonHTMLAttributes, FC } from 'react'
import styled from 'styled-components/macro'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  stretch?: boolean
  disabled?: boolean
  error?: boolean
  loading?: boolean
  loadingIcon?: JSX.Element
}

const Button: FC<ButtonProps> = ({ children, loading, loadingIcon, ...props }) => {
  return <StyledButton {...props}>{loading ? loadingIcon : children}</StyledButton>
}

interface StyleButtonProps {
  stretch?: boolean
  disabled?: boolean
  error?: boolean
}

const StyledButton = styled.button<StyleButtonProps>`
  height: 62px;
  width: ${(p) => (p.stretch ? '100%' : 'max-content')};
  background: ${(p) =>
    p.disabled
      ? p.theme.palette.action.disabled
      : p.error
      ? p.theme.palette.primary.error
      : p.theme.palette.primary.main};
  color: ${(p) => p.theme.palette.common.white};
  border: none;
  border-radius: 31px;
  cursor: pointer;
  padding: 0px 31px;
  outline: none;
  transition: background-color 0.2s ease-in-out;
`

export default Button
