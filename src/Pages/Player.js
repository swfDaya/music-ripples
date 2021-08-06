import React, { useState, useContext, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { useWindowResize } from 'beautiful-react-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { PlayerContext } from '../Context Providers/PlayerContextProvider'
import { CentralDataContext } from '../Context Providers/CentralDataContextProvider'
import { AudioDataContext } from '../Context Providers/AudioDataContextProvider'
import { YourFavoritesContext } from '../Context Providers/YourFavoritesContextProvider'
import '../Styles/Player.css'

const Player = () => {

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    const { isPlayerActive, setIsPlayerActive } = useContext(PlayerContext)
    const { fetchSongData, fetchSongQueue } = useContext(CentralDataContext)
    const { currentSongQueue, setCurrentSongQueue, selectedSongImage, setSelectedImage, selectedSong, setSelectedSong, fetchSelectedSongImage,
            hasPicLoaded, setHasPicLoaded, fetchSong, setIsAudioPlaying, audioRef, isAudioPlaying } = useContext(AudioDataContext)
    const { listYourFavorites, alterYourFavorites } = useContext(YourFavoritesContext)

    const tempArray = [1,2,3,4,5,6,7,8,9,1,2,3,4,5]

    const [ currentPlayerQueue, setCurrentPlayerQueue ] = useState(fetchSongQueue(currentSongQueue))

    const fetchTimeFormat = ( runTime ) => {
        const minute = Math.floor(runTime/60)
        const second = runTime - (minute * 60)
        return isNaN(minute) || isNaN(second) || (runTime < 0) ? '0:00' : minute + ':' + (second < 10 ? '0' + second  : second)
    }

    const onSongClickInPlayerQueue = ( songID ) => {
        audioRef.current.currentTime = 0
        setIsAudioPlaying(false)
        setHasPicLoaded(false)
        setSelectedSong(...fetchSongData(songID))
        fetchSelectedSongImage(songID)
        fetchSong(songID)
    }

    const playerQueue = useRef(null)

    useEffect(
        () => {
            setIsPlayerActive(true)
            var tempIndex = currentSongQueue.findIndex(item => item === selectedSong.songID )
            playerQueue.current.scrollTop = (0.075 * wHeight) * tempIndex
        }, []
    )

    return (

        <div
        className = { classNames('player', 'toCenter') }
        style = {{
            height: ( wWidth > 991 ? 0.5 : 0.45 ) * wHeight, 
            width: wWidth > 1599 ? 1600 : '100%',
        }}
        >
            <div
            className = { classNames('playerContainer') }
            ref = {playerQueue}
            style = {{
                height: '100%',
                width: wWidth > 991 ? '60%' : ( wWidth - (0.065 * wHeight) ),
            }}
            >
                <div
                className = { classNames('spacerPlayer') }
                style = {{
                    
                }}
                >
                </div>
                {
                    [...fetchSongQueue(currentSongQueue)].map(
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
                                        onClick = { () => onSongClickInPlayerQueue(item.songID) }
                                        className = { classNames('songNameContainer', 'clickable') }
                                        >
                                            <div
                                            className = { classNames('songNameContent') }
                                            >
                                            {item.songName} - {item.artistName}
                                            </div>
                                        </div>
                                        <div
                                        className = { classNames('songNameRectangle', 'toCenter') }
                                        style = {{
                                            height: 0.075 * wHeight,
                                            minWidth: 0.125 * wHeight,
                                        }}
                                        >
                                            {fetchTimeFormat(
                                                item.songID === selectedSong.songID ?
                                                isAudioPlaying ? Math.floor(selectedSong.runTime - (audioRef ? audioRef.current.currentTime : 0)) : item.runTime
                                                :
                                                item.runTime
                                                )}
                                        </div>
                                        <div
                                        className = { classNames('songNameSquare', 'toCenter') }
                                        style = {{
                                            height: 0.075 * wHeight,
                                            minWidth: 0.075 * wHeight,
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
                <div
                className = { classNames('spacerPlayer') }
                style = {{
                    
                }}
                ></div>
            </div>
        </div>

    )

}

export default Player
