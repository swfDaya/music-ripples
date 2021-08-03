import React, { useState, createContext, useEffect, useReducer } from 'react'
import firebase from '../Pages/firebase'

export const JukeBoxContext = createContext()

const JukeBoxContextProvider = ( props ) => {

    //forceUpdate
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const titleJukeBox = 'JukeBox'
    const idJukeBox = 'jukeBox'

    const [ listJukeBox, setListJukeBox ] = useState( [ 'aRR', 'yuvan', 'saNa', 'ilayaraja', 'harris', 'gV', 'anirudh', 'imman', 'hHThamizha' ] )

    const [ dataJukeBox, setDataJukeBox ] = useState([])

    const fecthDataListenAgain = ( content ) => {
        var tempImage = new Image()
        content.map(
            ( item, index ) => {
                firebase.storage().ref().child('Thumbnails').child(`${item}.jpg`).getDownloadURL().then(
                    response => {
                        tempImage.src = response
                        dataJukeBox.push(
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
            fecthDataListenAgain(listJukeBox)
        },
        []
    )

    return (

        <JukeBoxContext.Provider
        value = {{
            dataJukeBox, titleJukeBox, idJukeBox, listJukeBox
        }}
        >
            {props.children}
        </JukeBoxContext.Provider>

    )

}

export default JukeBoxContextProvider
