import React, { useState, useContext } from 'react'
import '../Styles/TopBar.css'
import { useWindowResize } from 'beautiful-react-hooks'
import classNames from 'classnames'
import ripplesLogo from '../Images/ripplesLogo.svg'
import home from '../Images/home.svg'
import homeColor from '../Images/homeColor.svg'
import coffee from '../Images/coffee.svg'
import coffeeColor from '../Images/coffeeColor.svg'
import { PlayerContext } from '../Context Providers/PlayerContextProvider'
import { useHistory, useLocation } from 'react-router-dom'

const TopBar = () => {

    const history = useHistory()

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    const { tabSelected, setTabSelected } = useContext(PlayerContext)

    const selectTab = ( tab ) => {
        history.push(tab)
        setTabSelected(tab)
    }

    return (

        <div
        className = { classNames('topBar') }
        style = {{
            height: 0.1 * wHeight, 
            width: wWidth > 1599 ? 1600 : '100%',
        }}
        >
            <div
            className = { classNames('topBarSquare', 'toCenter') }
            style = {{
                height: 0.1 * wHeight, 
                width: 0.1 * wHeight,
            }}
            >
                <img
                onClick = {() => selectTab('/home')}
                className = { classNames('clickable') }
                style = {{
                    height: '35%',
                    width: '35%'
                }}
                src = {ripplesLogo}
                alt = ''
                />
            </div>
            <div
            className = { classNames('topBarName', 'toCenter', 'dancingScript') }
            style = {{
                height: 0.1 * wHeight, 
                width: wWidth - ( 0.3 * wHeight ),
            }}
            >
                Ripples
            </div>
            <div
            className = { classNames('topBarSquare', 'toCenter') }
            style = {{
                height: 0.1 * wHeight, 
                width: 0.1 * wHeight,
            }}
            >
                <img
                onClick = {() => selectTab('/home')}
                className = { classNames('clickable') }
                style = {{
                    height: '35%',
                    width: '35%',
                    position: 'relative',
                    zIndex: 2,
                }}
                src = { tabSelected === '/home' ? homeColor : home }
                alt = ''
                />
                <div
                style = {{
                    height: 0.1 * wHeight, 
                    width: 0.1 * wHeight,
                    position: 'absolute',
                    display: tabSelected === '/home' ? 'flex' : 'none', 
                    alignItems: 'flex-end',
                    zIndex: 1,
                }}
                >
                    <div
                    style = {{
                        height: 0.005 * wHeight, 
                        width: 0.1 * wHeight,
                        backgroundColor: '#b92b27',
                        borderRadius: '10px'
                    }}
                    >
                    </div>
                </div>
            </div>
            <div
            className = { classNames('topBarSquare', 'toCenter') }
            style = {{
                height: 0.1 * wHeight, 
                width: 0.1 * wHeight,
            }}
            >
                <img
                onClick = {() => selectTab('/explore')}
                className = { classNames('clickable') }
                style = {{
                    height: '35%',
                    width: '35%',
                    zIndex: 2,
                }}
                src = { tabSelected === '/explore' ? coffeeColor : coffee }
                alt = ''
                />
                <div
                style = {{
                    height: 0.1 * wHeight, 
                    width: 0.1 * wHeight,
                    position: 'absolute',
                    display: tabSelected === '/explore' ? 'flex' : 'none', 
                    alignItems: 'flex-end',
                    zIndex: 1,
                }}
                >
                    <div
                    style = {{
                        height: 0.005 * wHeight, 
                        width: 0.1 * wHeight,
                        backgroundColor: '#b92b27',
                        borderRadius: '10px'
                    }}
                    >
                    </div>
                </div>
            </div>
        </div>

    )

}

export default TopBar
