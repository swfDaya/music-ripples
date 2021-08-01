import MainPage from './Pages/MainPage';
import './App.css';
import PlayerContextProvider from './Context Providers/PlayerContextProvider';
import BannerComponentContextProvider from './Context Providers/BannerComponentContextProvider';
import { BrowserRouter } from 'react-router-dom'

const App = () => {

  return (

    <BannerComponentContextProvider>
      <PlayerContextProvider>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </PlayerContextProvider>
    </BannerComponentContextProvider>
    
  );

}

export default App;
