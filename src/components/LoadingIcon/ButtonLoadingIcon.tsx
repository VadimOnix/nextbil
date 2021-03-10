import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import styled, { keyframes } from 'styled-components/macro'

const LoadingIcon = () => {
  return (
    <StyledLoadingIconWrapper>
      <FontAwesomeIcon icon={faCircleNotch} />
    </StyledLoadingIconWrapper>
  )
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const StyledLoadingIconWrapper = styled.div`
  animation: ${rotate} 1s linear infinite;
`

export default LoadingIcon
