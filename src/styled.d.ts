import 'styled-components';

interface IPalette {
  main: string
  contrastText: string
  hint: string
  primary: string
  hover: string
  border: {
    default: string
    focus: string
  },
  guide: {
    background: string
  },
  fail: string
  success: string
}
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string
    palette: IPalette,
  }
}
