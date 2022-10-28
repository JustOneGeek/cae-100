import {createTheme} from "@mui/material/styles";

export const themeOptions= {
  palette: {
    type: 'dark',
    mode: 'dark',
    primary: {
      main: '#c16fe9',
    },
    secondary: {
      main: '#7978ff',
    },
    info: {
      main: '#CDF7F6',
    },
    error: {
      main: '#FE4A49',
    },
    success: {
      main: '#219835',
    },
    warning: {
      main: '#ff9800',
    },
    background: {
      default: '#dcdcdc',
      paper: '#1f0745',
    },
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#1f0745',
        color: '#fff',
      },
    },
  },
  props: {
    MuiAppBar: {
      color: 'inherit',
    },
  },
};


const theme = createTheme(themeOptions)
export default theme