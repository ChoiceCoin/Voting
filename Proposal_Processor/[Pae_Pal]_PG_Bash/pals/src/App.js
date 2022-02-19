import { ThemeProvider, createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors'
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import Routes from './components/routes'
import { AccountProvider } from './context/account';
import { ProposalProvider } from './context/proposal';

const outerTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(250,250,250,0.12)'
    },
    text: {
      primary: grey[200],
      secondary: grey[100]
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={outerTheme}>
      <BrowserRouter>
        <AccountProvider>
          <ProposalProvider>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right'}}>
              <Routes />
            </SnackbarProvider>
          </ProposalProvider>
        </AccountProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
