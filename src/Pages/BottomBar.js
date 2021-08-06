import React, { useState, useContext, useEffect } from 'react'
import { useWindowResize } from 'beautiful-react-hooks'
import classNames from 'classnames'
import { PlayerContext } from '../Context Providers/PlayerContextProvider'
import { AudioDataContext } from '../Context Providers/AudioDataContextProvider'
import music from '../Images/music.svg'
import shuffle from '../Images/shuffle.svg'
import shuffleColor from '../Images/shuffleColor.svg'
import repeat from '../Images/repeat.svg'
import repeatColor from '../Images/repeatColor.svg'
import vinyl from '../Images/vinyl.png'
import arrowDown from '../Images/arrowDown.svg'
import '../Styles/BottomBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faBackward, faForward, faPause, faWaveSquare, fas } from '@fortawesome/free-solid-svg-icons'
import { useHistory, useLocation } from 'react-router-dom'
import Range from 'react-range-progress'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { CentralDataContext } from '../Context Providers/CentralDataContextProvider'

const BottomBar = () => {

    const history = useHistory()

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    const { fetchSongData, fetchSongQueue } = useContext(CentralDataContext)
    const { isPlayerActive, setIsPlayerActive } = useContext(PlayerContext)
    const { selectedSongImage, selectedSong, hasPicLoaded, setHasPicLoaded, shufflePlayerArray, setSelectedSong, fetchSelectedSongImage,
            isWavesActive, setISWavesActive, playSongHandler, isAudioPlaying, setIsAudioPlaying, currentAudio, currentAudioTime, 
            slideRangeListener, currentAudioDuration, audioRef, currentSongQueue, fetchSong, addToSongQueue, isRepeatActive, setIsRepeatActive } = useContext(AudioDataContext)

    const alterPlayerPage = () => {
        if ( isPlayerActive ) {
            setIsPlayerActive( false )
            history.goBack()
        }
        else {
            setIsPlayerActive( true )
            history.push('/player')
        }
    }

    const shufflePlayerQueue = () => {
        setIsAudioPlaying(false)
        setHasPicLoaded(false)
        var tempSongID = shufflePlayerArray()
        setSelectedSong(...fetchSongData(tempSongID))
        fetchSelectedSongImage(tempSongID)
    }

    const previousSong = () => {
        let currentSongIndex = currentSongQueue.findIndex(item => item === selectedSong.songID)
        if ( currentSongIndex > 0 ) {
            setIsAudioPlaying(false)
            fetchSong(currentSongQueue[currentSongIndex - 1])
            setHasPicLoaded(false)
            setSelectedSong(...fetchSongData(currentSongQueue[currentSongIndex - 1]))
            fetchSelectedSongImage(currentSongQueue[currentSongIndex - 1])
        }
    }

    const nextSong = () => {
        let currentSongIndex = currentSongQueue.findIndex(item => item === selectedSong.songID)
        if ( currentSongIndex + 1 < currentSongQueue.length ) {
            setIsAudioPlaying(false)
            fetchSong(currentSongQueue[currentSongIndex + 1])
            setHasPicLoaded(false)
            setSelectedSong(...fetchSongData(currentSongQueue[currentSongIndex + 1]))
            fetchSelectedSongImage(currentSongQueue[currentSongIndex + 1])
        }
    }

    useEffect(
        () => {
            if ( currentAudioTime === currentAudioDuration && isAudioPlaying ) {
                setTimeout(
                    isRepeatActive ?
                    audioRef.current.currentTime = 0
                    :
                    () => nextSong()
                    , 1000
                )
            }
        }, [currentAudioTime]
    )

    return (

        <div
        className = { classNames('bottomBar', 'toCenter') }
        style = {{
            height: ( isPlayerActive ? ( wWidth > 991 ? 0.4 : 0.45 ) : 0.1 ) * wHeight,
            width: '100%',
            backgroundColor: '#060606'
        }}
        >
            <div
            className = { classNames('bottomBarPlayer') }
            style = {{
                display: isPlayerActive ? 'flex' : 'none',
                height: ( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight,
                width: wWidth > 1599 ? 1600 : '100%',
            }}
            >
                <div
                className = { classNames('cdAndWaveContainer') }
                style = {{
                    height: (( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight) - (( wWidth > 991 ? 0 : 0.05 ) * wHeight) ,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                }}
                >
                    <div
                    className = { classNames('cdAndWaveContent') }
                    style = {{
                        height: 0.9 * ((( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight) - (( wWidth > 991 ? 0 : 0.05 ) * wHeight)),
                        width: 1.25 * ((( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight) - (( wWidth > 991 ? 0 : 0.05 ) * wHeight)),
                        backgroundColor: 'white',
                        position: 'relative',
                        borderRadius: 7,
                        display: isWavesActive ? 'none' : 'flex'
                    }}
                    >
                        <div
                        className = { classNames('cdBGContent') }
                        style = {{
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            backgroundColor: '',
                        }}
                        >
                            <div
                            style = {{
                                height: 0.66 * ((( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight) - (( wWidth > 991 ? 0 : 0.05 ) * wHeight)),
                                width: 0.66 * ((( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight) - (( wWidth > 991 ? 0 : 0.05 ) * wHeight)),
                                backgroundColor: '', marginRight: '4%'
                            }}
                            >
                                <img
                                style = {{
                                    height: 0.66 * ((( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight) - (( wWidth > 991 ? 0 : 0.05 ) * wHeight)),
                                    width: 0.66 * ((( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight) - (( wWidth > 991 ? 0 : 0.05 ) * wHeight)),
                                    transform: `rotate(${currentAudioTime * 20}deg)`,
                                    transition: 'all 1s linear'
                                }}
                                src = {vinyl}
                                alt = ''
                                />
                            </div>
                        </div>
                        <div
                        className = { classNames('cdBGContent') }
                        style = {{
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            position: 'absolute',
                            paddingLeft: '5%'
                        }}
                        >
                            
                            <div
                            className = { classNames('coverBGContent') }
                            style = {{
                                height: 0.78 * ((( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight) - (( wWidth > 991 ? 0 : 0.05 ) * wHeight)),
                                width: 0.78 * ((( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight) - (( wWidth > 991 ? 0 : 0.05 ) * wHeight)),
                                position: 'relative',
                                backgroundColor: '#202020',
                                border: '1px solid #2f3030',
                            }}
                            >
                                <img
                                style = {{
                                    display: hasPicLoaded ? 'flex' : 'none',
                                }}
                                className = { classNames('coverImage') }
                                src = {selectedSongImage}
                                alt = ''
                                onLoad = {() => setHasPicLoaded(true)}
                                />
                                <div
                                style = {{
                                    display: hasPicLoaded ? 'none' : 'flex',
                                }}
                                >
                                <SkeletonTheme color="#202020" highlightColor="#444">
                                <p>
                                    <Skeleton 
                                    height = {0.78 * ((( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight) - (( wWidth > 991 ? 0 : 0.05 ) * wHeight))}
                                    width = {0.78 * ((( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight) - (( wWidth > 991 ? 0 : 0.05 ) * wHeight))}
                                    />
                                </p>
                                </SkeletonTheme>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                    style = {{
                        height: 0.9 * ((( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight) - (( wWidth > 991 ? 0 : 0.05 ) * wHeight)),
                        width: 1.25 * ((( isPlayerActive ? ( wWidth > 991 ? 0.3 : 0.35 ) : 0.1 ) * wHeight) - (( wWidth > 991 ? 0 : 0.05 ) * wHeight)),
                        position: 'relative',
                        display: isWavesActive ? 'flex' : 'none'
                    }}
                    >
                        <canvas
                        id = 'canvas'
                        style = {{
                            height: '100%',
                            width: '100%',
                        }}
                        >

                        </canvas>
                    </div>
                </div>
                <div
                className = { classNames('rangeContainer') }
                style = {{
                    display: wWidth > 991 ? 'none': 'flex',
                    height: 0.05 * wHeight,
                    width: '100%',
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                }}
                >
                    <Range
                    value = {currentAudioTime}
                    onChange = {slideRangeListener}
                    min = {0}
                    max = {currentAudioDuration}
                    width = {'90%'}
                    thumbSize = {15}
                    fillColor = {{
                        r: 185,
                        g: 43,
                        b: 39,
                        a: 1,
                    }}
                    trackColor = {{
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 0.5,
                    }}
                    />
                </div>
            </div>
            <div
            className = { classNames('bottomBarMediaControlsContainer', 'toCenter') }
            style = {{
                height: 0.1 * wHeight,
                width: '100%',
                backgroundColor: '#060606'
            }}
            >
            <div
            className = { classNames('bottomBarMediaControls') }
            style = {{
                height: 0.1 * wHeight,
                width: wWidth > 1599 ? 1600 : '100%',
            }}
            >
                <div
                className = { classNames('bottomBarName') }
                style = {{
                    height: 0.1 * wHeight, 
                    display: isPlayerActive ? ( wWidth > 991 ? 'flex' : 'none' ) : 'flex', 
                    flex: '1',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}
                >
                    <div
                    className = { classNames('bottomBarNameContainer','toCenter') }
                    style = {{
                        height: 0.05 * wHeight,
                        width: '90%',
                    }}
                    >
                        <div
                        className = { classNames('bottomBarNameName') }
                        style = {{
                            width: '100%',
                        }}
                        >
                        {selectedSong.songName} - {selectedSong.artistName}
                        </div>
                    </div>
                </div>
                <div
                className = { classNames('bottomBarRectangle', 'toCenter') }
                style = {{
                    height: 0.1 * wHeight, 
                    width: ( isPlayerActive ? ( wWidth > 991 ? 0.4 : 1 ) : ( wWidth > 991 ? 0.4  : 0.55 ) ) * wWidth,
                    display: 'flex', justifyContent: 'space-around'
                }}
                >
                    <div
                    className = { classNames('toCenter') }
                    style = {{
                        height: 0.1 * wHeight,
                    }}
                    >
                        <img
                        onClick = { () => shufflePlayerQueue() }
                        className = { classNames('clickable') }
                        style = {{
                            height: '50%',
                            width: '50%',
                            display: isPlayerActive ? 'flex' : 'none', 
                        }}
                        src = { shuffle }
                        alt = ''
                        />
                    </div>
                    <div
                    className = { classNames('toCenter') }
                    style = {{
                        height: 0.1 * wHeight,
                    }}
                    >
                        <img
                        onClick = { () => setIsRepeatActive( isRepeatActive ? false : true ) }
                        className = { classNames('clickable') }
                        style = {{
                            height: '50%',
                            width: '50%',
                            display: isPlayerActive ? 'flex' : 'none', 
                        }}
                        src = { isRepeatActive ? repeatColor : repeat }
                        alt = ''
                        />
                    </div>
                    <div
                    className = { classNames('toCenter') }
                    style = {{
                        height: 0.1 * wHeight,
                    }}
                    >
                        <FontAwesomeIcon
                        onClick = { () => previousSong() }
                        className = { classNames(( currentSongQueue.findIndex( item => item === selectedSong.songID ) === 0 ) ? '' : 'clickable') }
                        style = {{
                            height: '50%', width: '50%', 
                            color: ( currentSongQueue.findIndex( item => item === selectedSong.songID ) === 0 ) ? '#7f7f7f' : '#b92b27'
                        }}
                        icon = {faBackward}
                        />
                    </div>
                    <div
                    className = { classNames('toCenter') }
                    style = {{
                        height: 0.1 * wHeight,
                    }}
                    >
                        <FontAwesomeIcon
                        onClick = { () => playSongHandler() }
                        className = { classNames('clickable') }
                        style = {{
                            height: '50%', width: '50%', 
                            color: currentAudio ? '#b92b27' : '#7f7f7f'
                        }}
                        icon = { isAudioPlaying ? faPause : faPlay}
                        />
                    </div>
                    <div
                    className = { classNames('toCenter') }
                    style = {{
                        height: 0.1 * wHeight,
                    }}
                    >
                        <FontAwesomeIcon
                        onClick = { () => nextSong() }
                        className = { classNames(( currentSongQueue.findIndex( item => item === selectedSong.songID ) + 1 === currentSongQueue.length ) ? '' : 'clickable') }
                        style = {{
                            height: '50%', width: '50%', 
                            color: ( currentSongQueue.findIndex( item => item === selectedSong.songID ) + 1 === currentSongQueue.length ) ? '#7f7f7f' : '#b92b27'
                        }}
                        icon = {faForward}
                        />
                    </div>
                    <div
                    className = { classNames('toCenter') }
                    style = {{
                        height: 0.1 * wHeight,
                    }}
                    >
                        <FontAwesomeIcon
                        className = { classNames('clickable') }
                        onClick = { () => setISWavesActive( isWavesActive ? false : true ) }
                        style = {{
                            height: '50%', width: '50%',
                            display: isPlayerActive ? 'flex' : 'none', 
                            color: isWavesActive ? '#b92b27' : 'white',
                        }}
                        icon = {faWaveSquare}
                        />
                    </div>
                    <div
                    className = { classNames('toCenter') }
                    style = {{
                        height: 0.1 * wHeight,
                    }}
                    >
                        <img
                        className = { classNames('clickable') }
                        onClick = {() => alterPlayerPage()}
                        style = {{
                            height: '50%',
                            width: '50%',
                        }}
                        src = { isPlayerActive ? arrowDown : music}
                        alt = ''
                        />
                    </div>
                </div>
                <div
                className = { classNames('bottomBarName', 'toCenter') }
                style = {{
                    height: 0.1 * wHeight, 
                    display: wWidth > 991 ? 'flex' : 'none', 
                    flex: '1',
                }}
                >
                    <Range
                    value = {currentAudioTime}
                    onChange = {slideRangeListener}
                    min = {0}
                    max = {currentAudioDuration}
                    width = {'90%'}
                    thumbSize = {15}
                    fillColor = {{
                        r: 185,
                        g: 43,
                        b: 39,
                        a: 1,
                    }}
                    trackColor = {{
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 0.5,
                    }}
                    />
                </div>
            </div>
            </div>
        </div>

    )

}

export default BottomBar
