import { CssBaseline, ThemeProvider } from '@mui/material';
import { purpleTheme } from './';

const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
};

export { AppTheme };
