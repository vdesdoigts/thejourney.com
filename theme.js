import { extendTheme } from '@chakra-ui/react'

const styles = {
  global: (props) => ({
    "html, body": {
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: '#222222',
      color: 'white',
    },
    "html": {
      overflow: 'hidden',
      fontSize: '62.5%',
      fontSize: 'calc(1em * 0.625)',
      wordBreak: 'break-word',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
    },
  }),
}

const fonts = {
  body: "Cormorant, sans-serif",
  heading: "Kanit, serif",
  mono: "Menlo, monospace",
}

export const theme = extendTheme({ styles, fonts })
