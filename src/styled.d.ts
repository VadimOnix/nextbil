import 'styled-components'

// Из-за ограничений используемых библиотек, для реализации такого типа буду использовать пакет @types/color
type Color = string



declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      common: {
        black: '#000000'
        white: '#FFFFFF'
      }
      text: {
        primary: Color
        secondary: Color
        disabled: Color
        error: Color
      },
      primary: {
        main: Color
        contrastText: Color
      },
      background: {
        default: Color,
        input: Color
      },
      action: {
        disabled: Color
      }
    },
    typography: {
      fontSize: number
      fontSizeHtml?: number
      fontFamily: string
      fontWeightRegular: number
      fontWeightBold: number
      lineHeight: number
    },
    shape: {
      borderRadius: string
    },
    zIndex: {
      dropDown: number
    }
  }
}
