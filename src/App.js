import MainPage from './Pages/MainPage';
import './App.css';
import PlayerContextProvider from './Context Providers/PlayerContextProvider';
import BannerComponentContextProvider from './Context Providers/BannerComponentContextProvider';
import CentralDataContextProvider from './Context Providers/CentralDataContextProvider';
import ListenAgainContextProvider from './Context Providers/ListenAgainContextProvider';
import YourFavoritesContextProvider from './Context Providers/YourFavoritesContextProvider';
import NewReleasesContextProvider from './Context Providers/NewReleasesContextProvider';
import FeaturedThisWeekContextProvider from './Context Providers/FeaturedThisWeekContextProvider';
import EditorialPicksContextProvider from './Context Providers/EditorialPicksContextProvider';
import ChooseByGenreContextProvider from './Context Providers/ChooseByGenreContextProvider';
import ChooseByMoodContextProvider from './Context Providers/ChooseByMoodContextProvider';
import JukeBoxContextProvider from './Context Providers/JukeBoxContextProvider';
import AudioDataContextProvider from './Context Providers/AudioDataContextProvider';
import { BrowserRouter } from 'react-router-dom'

const App = () => {

  return (

    <CentralDataContextProvider>
      <ChooseByGenreContextProvider>
        <ChooseByMoodContextProvider>
          <JukeBoxContextProvider>
            <NewReleasesContextProvider>
              <FeaturedThisWeekContextProvider>
                <EditorialPicksContextProvider>
                  <BannerComponentContextProvider>
                    <ListenAgainContextProvider>
                      <PlayerContextProvider>
                        <YourFavoritesContextProvider>
                          <AudioDataContextProvider>
                            <BrowserRouter>
                              <MainPage />
                            </BrowserRouter>
                          </AudioDataContextProvider>
                        </YourFavoritesContextProvider>
                      </PlayerContextProvider>
                    </ListenAgainContextProvider>
                  </BannerComponentContextProvider>
                </EditorialPicksContextProvider>
              </FeaturedThisWeekContextProvider>
            </NewReleasesContextProvider>
          </JukeBoxContextProvider>
        </ChooseByMoodContextProvider>
      </ChooseByGenreContextProvider>
    </CentralDataContextProvider>
    
    
  );

}

export default App;
