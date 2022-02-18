import { ThemeProvider, createTheme, alpha } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import Routes from './components/routes'
import { AccountProvider } from './context/account';

const outerTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: alpha("#0000", 0.8),
      light: alpha('#efefef', 0.7)
    },
    secondary: { 
      main: "#fff",
    },
    text: {
      primary: grey[600],
      secondary: grey[500],
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={outerTheme}>
      <BrowserRouter>
        <AccountProvider> 
          <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right'}}>
            <Routes />
          </SnackbarProvider>
        </AccountProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
