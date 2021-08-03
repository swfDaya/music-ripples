import React, { useState, createContext, useEffect, useReducer } from 'react'
import firebase from '../Pages/firebase'

export const EditorialPicksContext = createContext()

const EditorialPicksContextProvider = ( props ) => {

    //forceUpdate
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const titleEditorialPicks = 'Picks for You'
    const idEditorialPicks = 'editorialPicks'

    const [ listEditorialPicks, setListEditorialPicks ] = useState( [ 'whenYouWakeUp', 'drumsOnFire', 'dynamite', 'dirtyPower', 'clearView', 'ceremony', 'hushLittleBaby', 'goingMad', 'rage', 'echoesOfMine','aboveTheClouds' ] )

    const [ dataEditorialPicks, setDataEditorialPicks ] = useState([])

    const fecthDataEditorialPicks = ( content ) => {
        var tempImage = new Image()
        content.map(
            ( item, index ) => {
                firebase.storage().ref().child('Thumbnails').child(`${item}.jpg`).getDownloadURL().then(
                    response => {
                        tempImage.src = response
                        dataEditorialPicks.push(
                            {
                                id: item,
                                source: tempImage.src,
                            }
                        )
                        forceUpdate()
                    }
                )
            }
        )
    }

    useEffect(
        () => {
            fecthDataEditorialPicks(listEditorialPicks)
        },
        []
    )

    return (

        <EditorialPicksContext.Provider
        value = {{
            dataEditorialPicks,  titleEditorialPicks, idEditorialPicks, listEditorialPicks
        }}
        >
            {props.children}
        </EditorialPicksContext.Provider>

    )

}

export default EditorialPicksContextProvider
