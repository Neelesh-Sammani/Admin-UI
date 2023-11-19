import AdminUI from './Components/AdminUI';
import { SnackbarProvider } from 'notistack';

function App() {
  
  return (
    <SnackbarProvider maxSnack={1}  anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}>
      <AdminUI />
    </SnackbarProvider>
  );
}

export default App;
