import React, { useState, createContext } from 'react'

export const PlayerContext = createContext()

const PlayerContextProvider = ( props ) => {

    const [ isPlayerActive, setIsPlayerActive ] = useState(false)
    const [ tabSelected, setTabSelected ] = useState('/home')

    return (

        <PlayerContext.Provider
        value = {{
            isPlayerActive, setIsPlayerActive, tabSelected, setTabSelected 
        }}
        >
            {props.children}
        </PlayerContext.Provider>

    )

}

export default PlayerContextProvider
