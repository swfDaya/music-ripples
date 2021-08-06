import React, { useState, useContext, useEffect, useReducer } from 'react'
import '../Styles/ThemePage.css'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'
import { useWindowResize } from 'beautiful-react-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faHeart } from '@fortawesome/free-solid-svg-icons'
import shuffleColor from '../Images/shuffleColor.svg'
import arrowLeft from '../Images/arrowLeft.svg'
import { CentralDataContext } from '../Context Providers/CentralDataContextProvider'
import { AudioDataContext } from '../Context Providers/AudioDataContextProvider'
import { PlayerContext } from '../Context Providers/PlayerContextProvider'
import { ListenAgainContext } from "../Context Providers/ListenAgainContextProvider";
import { YourFavoritesContext } from "../Context Providers/YourFavoritesContextProvider";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import firebase from './firebase'
import { useHistory, useLocation } from 'react-router-dom'

const ThemePage = () => {

    //forceUpdate
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const history = useHistory()

    const { themeType } = useParams()
    
    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    const tempArray = [1,2,3,4,5,6,7,8,9,1,2,3,4,5]

    const { idListenAgain, listListenAgain, dataListenAgain, titleListenAgain } = useContext(ListenAgainContext)
    const { idYourFavorites, listYourFavorites, dataYourFavorites, titleYourFavorites, alterYourFavorites } = useContext(YourFavoritesContext)
    const { fetchThemeQueue, fetchSongData, fetchSongQueue } = useContext(CentralDataContext)
    const { currentSongQueue, setCurrentSongQueue, selectedSongImage, setSelectedImage, selectedSong, setSelectedSong, addSongsToSongQueue,
        fetchSelectedSongImage, isFirstTime, getSources, setIsFirstTime, audioRef, setIsAudioPlaying, fetchSong, addToSongQueue  } = useContext(AudioDataContext)

    const setCurrentThemeQueueState = ( type ) => {
        if ( type === 'listenAgain' ) {
            return fetchSongQueue(listListenAgain)
        }
        else if ( type === 'yourFavorites' ) {
            return fetchSongQueue(listYourFavorites)
        }
        else {
            return fetchThemeQueue(type)
        }
    }
    
    const [ currentThemeQueue, setCurrentThemeQueue ] = useState(setCurrentThemeQueueState(themeType))

    const fetchTimeFormat = ( runTime ) => {
        const minute = Math.floor(runTime/60)
        const second = runTime - (minute * 60)
        return minute + ':' + (second < 10 ? '0' + second  : second)
    }

    const [ hasPicLoaded, setHasPicLoaded ] = useState(false)

    const [ currentThemeImage, setCurrentThemeImage ] = useState()
    const fetchThemeQueueImage = ( item ) => {
        firebase.storage().ref().child('Thumbnails').child(`${item}.jpg`).getDownloadURL().then(
            response => {
                var tempImage = new Image()
                tempImage.src = response
                setCurrentThemeImage(tempImage.src)
            }
        )
    }

    useEffect(
        () => 
        {
            fetchThemeQueueImage(themeType)
        }, []
    )
    
    const { isPlayerActive, setIsPlayerActive } = useContext(PlayerContext)
    setIsPlayerActive(false)

    const fetchTotalTime = () => {
        var totalTime = 0
        currentThemeQueue.map(
            item => {
                totalTime += item.runTime
            }
        )
        return Math.floor(totalTime/60)
    }
    
    const currentThemeQueueTotalTime = fetchTotalTime()

    const clickPlayInTheme = () => {
        var tempQueue = []
        currentThemeQueue.forEach(
            item => {
                tempQueue.push(item.songID)
                forceUpdate()
            }
        )
        if ( isFirstTime ) {
            getSources()
            setIsFirstTime(false)
        }
        addSongsToSongQueue(tempQueue)
        setSelectedSong(currentThemeQueue[0])
        fetchSelectedSongImage(currentThemeQueue[0].songID)
        fetchSong(currentThemeQueue[0].songID)
    }

    const shuffleThemeQueue = () =>  {
        for (let i = currentThemeQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentThemeQueue[i], currentThemeQueue[j]] = [currentThemeQueue[j], currentThemeQueue[i]];
            forceUpdate()
        }
    }

    const onSongNameClickInThemePage = ( id ) => {
        if ( isFirstTime ) {
            getSources()
            setIsFirstTime(false)
        }
        setIsAudioPlaying(false)
        fetchSong(id)
        setHasPicLoaded(false)
        setSelectedSong(...fetchSongData(id))
        fetchSelectedSongImage(id)
        addToSongQueue(id)
    }

    return (

        <div
        className = { classNames('themePage', 'toCenter') }
        style = {{
            height: 0.8 * wHeight, 
            width: wWidth > 1599 ? 1600 : '100%',
        }}
        >
            <div
            className = { classNames('spacer') }
            >
            </div>
            <div
            className = { classNames('themePageContainer') }
            style = {{
                height: '100%',
                width: wWidth > 991 ? '60%' : ( wWidth - (0.065 * wHeight) ),
            }}
            >
                <div
                className = { classNames('themePageBannerContainer', 'toCenter') }
                style = {{
                    height: wWidth < 599 ? '150px' : '30%',
                }}
                >
                    <div
                    className = { classNames('themeImageContainer', 'toCenter') }
                    style = {{
                        height: wWidth < 599 ? '150px' : ( 0.23 * wHeight ),
                        width: wWidth < 599 ? '150px' : ( 0.23 * wHeight ),
                    }}
                    >
                        <div
                        className = { classNames('themeImageContent') }
                        >
                            <img
                            className = { classNames('themeImage') }
                            style = {{
                                display: hasPicLoaded ? 'flex' : 'none',
                            }}
                            src = {currentThemeImage}
                            alt = ''
                            onLoad = {() => setHasPicLoaded(true)}
                            />
                            <div
                            style = {{
                                display: hasPicLoaded ? 'none' : 'flex'
                            }}
                            >
                            <SkeletonTheme 
                            color="#202020" highlightColor="#444">
                                <section>
                                <Skeleton 
                                height={wWidth < 599 ? '127px' : ( 0.195 * wHeight )} 
                                width={wWidth < 599 ? '127px' : ( 0.195 * wHeight )} 
                                style = {{ borderRadius: '7%' }}
                                />
                                </section>
                            </SkeletonTheme>
                            </div>
                        </div>
                    </div>
                    <div
                    className = { classNames('themeDetailsContainer') }
                    style = {{
                        height: wWidth < 599 ? '128px' : ( 0.195 * wHeight ),
                        width: wWidth < 599 ? '150px' : ( 0.23 * wHeight ),
                    }}
                    >
                        <div
                        className = { classNames('themeNameContainer') }
                        >
                            {themeType[0].toUpperCase() + themeType.substring(1)}
                        </div>
                        <div
                        className = { classNames('themeQueueDetailsContainer') }
                        >
                            {currentThemeQueue.length} Songs {currentThemeQueueTotalTime} mins
                        </div>
                        <div
                        className = { classNames('themeQueueButtonsContainer') }
                        >
                            <div
                            onClick = { () => clickPlayInTheme() }
                            className = { classNames('themeQueueButtonsSquare', 'clickable', 'toCenter') }
                            style = {{
                                height: wWidth < 599 ? '37px' : ( 0.05 * wHeight ),
                                width: wWidth < 599 ? '37px' : ( 0.05 * wHeight ),
                            }}
                            >
                                <FontAwesomeIcon
                                style = {{
                                    height: '40%', width: '40%', color: '#b92b27'
                                }}
                                icon = {faPlay}
                                />
                            </div>
                            <div
                            className = { classNames('themeQueueButtonsSquareSpacer') }
                            style = {{
                                height: wWidth < 599 ? '37px' : ( 0.05 * wHeight ),
                                width: wWidth < 599 ? '15px' : ( 0.02 * wHeight ),
                            }}
                            >

                            </div>
                            <div
                            onClick = { () => shuffleThemeQueue() }
                            className = { classNames('themeQueueButtonsSquare', 'clickable', 'toCenter') }
                            style = {{
                                height: wWidth < 599 ? '37px' : ( 0.05 * wHeight ),
                                width: wWidth < 599 ? '37px' : ( 0.05 * wHeight ),
                            }}
                            >
                                <img
                                style = {{
                                    height: '40%', width: '40%',
                                }}
                                src = {shuffleColor}
                                alt = ''
                                />
                            </div>
                            <div
                            className = { classNames('themeQueueButtonsSquareSpacer') }
                            style = {{
                                height: wWidth < 599 ? '37px' : ( 0.05 * wHeight ),
                                width: wWidth < 599 ? '15px' : ( 0.02 * wHeight ),
                            }}
                            >
            
                            </div>
                            <div
                            onClick = { () => history.goBack() }
                            className = { classNames('themeQueueButtonsSquare', 'clickable', 'toCenter') }
                            style = {{
                                height: wWidth < 599 ? '37px' : ( 0.05 * wHeight ),
                                width: wWidth < 599 ? '37px' : ( 0.05 * wHeight ),
                            }}
                            >
                                <img
                                style = {{
                                    height: '40%', width: '40%',
                                }}
                                src = {arrowLeft}
                                alt = ''
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                className = { classNames('spacer') }
                >
                </div>
                <div
                className = { classNames('themePagePlayerContainer') }
                style = {{
                    width: '100%',
                    height: ( 0.72 * wHeight ) - (wWidth < 599 ? 150 : (0.24 * wHeight)),
                }}
                >
                {
                    currentThemeQueue.map(
                        ( item, index ) => {
                            return(
                                <div
                                className = { classNames('songContainerSpacer') }
                                >
                                    <div
                                    className = { classNames('songContainer') }
                                    style = {{
                                        height: 0.075 * wHeight,
                                        width: '100%',
                                        borderBottom: item.songID === selectedSong.songID ? '1px solid #b92b27' : '1px solid #2f3030',
                                    }}
                                    >
                                        <div
                                        className = { classNames('songNameContainer', 'clickable') }
                                        onClick = { () => onSongNameClickInThemePage(item.songID) }
                                        >
                                            <div
                                            className = { classNames('songNameContent') }
                                            >
                                            {item.songName} - {item.artistName}
                                            </div>
                                        </div>
                                        <div
                                        className = { classNames('songNameRectangle') }
                                        style = {{
                                            height: 0.075 * wHeight,
                                            minWidth: 0.125 * wHeight,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end'
                                        }}
                                        >
                                            {fetchTimeFormat(item.runTime)}
                                        </div>
                                        <div
                                        className = { classNames('songNameSquare') }
                                        style = {{
                                            height: 0.075 * wHeight,
                                            minWidth: 0.075 * wHeight,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end'
                                        }}
                                        >
                                           <FontAwesomeIcon
                                            className = { classNames('clickable') }
                                            onClick = { () => alterYourFavorites( item.songID ) }
                                            style = {{
                                                height: '35%', width: '35%', 
                                                color: listYourFavorites.includes(item.songID) ? '#b92b27' : 'white'
                                            }}
                                            icon = {faHeart}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
                </div>
            </div>
        </div>

    )

}

export default ThemePage
