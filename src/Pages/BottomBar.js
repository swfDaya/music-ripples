import React, { useState, useContext } from 'react'
import { useWindowResize } from 'beautiful-react-hooks'
import classNames from 'classnames'
import { PlayerContext } from '../Context Providers/PlayerContextProvider'
import music from '../Images/music.svg'
import shuffle from '../Images/shuffle.svg'
import shuffleColor from '../Images/shuffleColor.svg'
import repeat from '../Images/repeat.svg'
import repeatColor from '../Images/repeatColor.svg'
import arrowDown from '../Images/arrowDown.svg'
import '../Styles/BottomBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faBackward, faForward, faPause, faWaveSquare } from '@fortawesome/free-solid-svg-icons'
import { useHistory, useLocation } from 'react-router-dom'
import Range from 'react-range-progress'

const BottomBar = () => {

    const history = useHistory()

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    const { isPlayerActive, setIsPlayerActive } = useContext(PlayerContext)

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
                backgroundColor: 'pink'
            }}
            >

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
                        Walk in the night in the rain - You know who it is
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
                        className = { classNames('clickable') }
                        style = {{
                            height: '50%',
                            width: '50%',
                            display: isPlayerActive ? 'flex' : 'none', 
                        }}
                        src = { repeat }
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
                        className = { classNames('clickable') }
                        style = {{
                            height: '50%', width: '50%', color: '#b92b27'
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
                        className = { classNames('clickable') }
                        style = {{
                            height: '50%', width: '50%', color: '#b92b27'
                        }}
                        icon = {faPlay}
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
                        style = {{
                            height: '50%', width: '50%', color: '#b92b27'
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
                        style = {{
                            height: '50%', width: '50%', color: 'white',
                            display: isPlayerActive ? 'flex' : 'none', 
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
                    value = '' //{currentAudioTime}
                    onChange = '' //{slideRangeListener}
                    min = {0}
                    max = '' //{currentAudioDuration}
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
