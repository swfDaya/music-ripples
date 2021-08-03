import React, { useState, useContext } from 'react'
import '../Styles/MainPage.css'
import classNames from 'classnames'
import { PlayerContext } from '../Context Providers/PlayerContextProvider'
import { useWindowResize } from 'beautiful-react-hooks'
import TopBar from './TopBar'
import BottomBar from './BottomBar'
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import ExplorePage from './ExplorePage'
import Player from './Player'
import HomeRedirect from './HomeRedirect'
import ThemePage from './ThemePage'

const MainPage = () => {

    const { isPlayerActive, setIsPlayerActive } = useContext(PlayerContext)

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    return (

        <div
        className = { classNames('mainPage') }
        style = {{
            height: wHeight, width: '100%'
        }}
        >
            <div
            className = { classNames('topBarContainer', 'toCenter') }
            style = {{
                height: 0.1 * wHeight, width: '100%'
            }}
            >
                <TopBar />
            </div>
            <div
            className = { classNames('middleContainer', 'toCenter') }
            style = {{
                height: ( isPlayerActive ? ( wWidth > 991 ? 0.5 : 0.45 ) : 0.8 ) * wHeight, 
                width: '100%',
            }}
            >
                <Switch>
                    <Route
                    exact path = '/'
                    children = {
                        <HomeRedirect />
                    }
                    />
                    <Route
                    exact path = '/home'
                    children = {
                        <HomePage />
                    }
                    />
                    <Route
                    exact path = '/explore'
                    children = {
                        <ExplorePage />
                    }
                    />
                    <Route
                    exact path = '/player'
                    children = {
                        <Player />
                    }
                    />
                    <Route
                    exact path = '/theme/:themeType'
                    children = {
                        <ThemePage />
                    }
                    />
                </Switch>
            </div>
            <div
            className = { classNames('bottomBarContainer', 'toCenter') }
            style = {{
                height: ( isPlayerActive ? ( wWidth > 991 ? 0.4 : 0.45 ) : 0.1 ) * wHeight, 
                width: '100%'
            }}
            >
                <BottomBar />
            </div>
        </div>

    )

}

export default MainPage
