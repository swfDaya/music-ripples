import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { useWindowResize } from 'beautiful-react-hooks'
import BannerComponent from './BannerComponent'
import SongComponent from './SongComponent'
import '../Styles/HomePage.css'
import { ListenAgainContext } from "../Context Providers/ListenAgainContextProvider";
import { YourFavoritesContext } from "../Context Providers/YourFavoritesContextProvider";
import { PlayerContext } from '../Context Providers/PlayerContextProvider'
import { ChooseByMoodContext } from '../Context Providers/ChooseByMoodContextProvider'
import { ChooseByGenreContext } from '../Context Providers/ChooseByGenreContextProvider'

const HomePage = () => {

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    const { isPlayerActive, setIsPlayerActive, tabSelected, setTabSelected } = useContext(PlayerContext)
    const { idListenAgain, listListenAgain, dataListenAgain, titleListenAgain } = useContext(ListenAgainContext)
    const { idYourFavorites, listYourFavorites, dataYourFavorites, titleYourFavorites } = useContext(YourFavoritesContext)
    const { dataChooseByMood,  titleChooseByMood, listChooseByMood, idChooseByMood } = useContext(ChooseByMoodContext)
    const { dataChooseByGenre,  titleChooseByGenre, listChooseByGenre, idChooseByGenre } = useContext(ChooseByGenreContext)

    setIsPlayerActive(false)
    setTabSelected('/home')

    return (

        <div
        className = { classNames('homePage') }
            style = {{
                height: 0.8 * wHeight, 
                width: wWidth > 1599 ? 1600 : '100%',
            }}
            >
            <div
            className = { classNames('spacer') }
            >
            </div>
            <BannerComponent />
            <div
            className = { classNames('spacer') }
            >
            </div>
            <SongComponent
            content = {dataChooseByGenre}
            title = {titleChooseByGenre}
            id = {idChooseByGenre}
            list = {listChooseByGenre}
            type = {'theme'}
            />
            <div
            className = { classNames('spacer') }
            >
            </div>
            <SongComponent
            content = {dataChooseByMood}
            title = {titleChooseByMood}
            id = {idChooseByMood}
            list = {listChooseByMood}
            type = {'theme'}
            />
            <div
            className = { classNames('spacer') }
            >
            </div>
            <SongComponent
            content = {dataListenAgain}
            title = {titleListenAgain}
            id = {idListenAgain}
            list = {listListenAgain}
            type = {'song'}
            />
            <div
            className = { classNames('spacer') }
            >
            </div>
            <SongComponent
            content = {dataYourFavorites}
            title = {titleYourFavorites}
            id = {idYourFavorites}
            list = {listYourFavorites}
            type = {'song'}
            />
            <div
            className = { classNames('spacer') }
            >
            </div>
        </div>

    )

}

export default HomePage
