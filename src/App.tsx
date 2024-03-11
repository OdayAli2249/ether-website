import { QueryClientProvider } from 'react-query';
import './App.scss';
import { queryClient } from './helpers/queryClient';
import MainPage from './views/pages/mainPage';

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <MainPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
