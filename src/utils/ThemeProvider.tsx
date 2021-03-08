import React, { FC } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import GlobalStyles from './GlobalStyles'

type ThemeProviderProps = {
  theme: DefaultTheme
}

const CustomThemeProvider: FC<ThemeProviderProps> = ({ children, theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default CustomThemeProvider
