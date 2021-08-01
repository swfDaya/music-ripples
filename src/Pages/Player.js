import React, { useState, useContext, useEffect } from 'react'
import classNames from 'classnames'
import { useWindowResize } from 'beautiful-react-hooks'
import { PlayerContext } from '../Context Providers/PlayerContextProvider'

const Player = () => {

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    const { isPlayerActive, setIsPlayerActive } = useContext(PlayerContext)

    useEffect(
        () => {
            if ( !isPlayerActive ) {
                setIsPlayerActive(true)
            }
        }, []
    )

    return (

        <div
        className = { classNames('player') }
            style = {{
                height: ( wWidth > 991 ? 0.5 : 0.45 ) * wHeight, 
                width: wWidth > 1599 ? 1600 : '100%',
            }}
        >
            this is from player
        </div>

    )

}

export default Player
