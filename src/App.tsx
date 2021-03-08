import React from 'react'
import FormSignUp from './components/FormSignUp/FormSignUp'
import { mainTheme } from './utils/Theme'
import CustomThemeProvider from './utils/ThemeProvider'

function App() {
  return (
    <CustomThemeProvider theme={mainTheme}>
      <FormSignUp />
    </CustomThemeProvider>
  )
}

export default App
