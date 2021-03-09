import React from 'react'
import FormSignUp from './components/FormSignUp/FormSignUp'
import { mainTheme } from './utils/Theme'
import CustomThemeProvider from './utils/ThemeProvider'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo/ApolloClient'

function App() {
  return (
    <ApolloProvider client={client}>
      <CustomThemeProvider theme={mainTheme}>
        <FormSignUp />
      </CustomThemeProvider>
    </ApolloProvider>
  )
}

export default App
