import AdminUI from './Components/AdminUI';
import { SnackbarProvider } from 'notistack';
import { Box } from '@mui/material';

function App() {
  
  return (
    <Box sx={{width:'100%',height:'100%'}}>
    <SnackbarProvider maxSnack={1}  anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}>
      <AdminUI />
    </SnackbarProvider>
    </Box>
  );
}

export default App;
