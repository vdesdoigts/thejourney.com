import { extendTheme } from '@chakra-ui/react'

const styles = {
  global: (props) => ({
    "html, body": {
      overflowX: 'hidden',
      backgroundColor: '#222222',
      color: 'white',
    },
    "html": {
      overflowY: 'scroll',
      fontSize: '62.5%',
      fontSize: 'calc(1em * 0.625)',
      wordBreak: 'break-word',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
    }
  }),
}

const fonts = {
  body: "Kanit, sans-serif",
  heading: "Kanit, serif",
  mono: "Menlo, monospace",
}

export const theme = extendTheme({ styles, fonts })
