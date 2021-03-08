import React, { FC } from 'react'
import styled from 'styled-components'

const SelectItem: FC<any> = ({ children, ...props }) => {
  return <StyledItem {...props}>{children}</StyledItem>
}

const StyledItem = styled.div`
  font-size: 0.875em;
  line-height: 32px;
  padding: 0 20px;
  cursor: pointer;
  &:hover {
    background: #f5f8fa;
  }
`

export default SelectItem
