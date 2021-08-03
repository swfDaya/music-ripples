import React, { useState, createContext, useEffect, useReducer } from 'react'
import firebase from '../Pages/firebase'

export const ChooseByMoodContext = createContext()

const ChooseByMoodContextProvider = ( props ) => {

    //forceUpdate
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const titleChooseByMood = 'Choose By Mood'
    const idChooseByMood = 'chooseByMood'

    const [ listChooseByMood, setListChooseByMood ] = useState( [ 'romantic', 'sad', 'relax', 'upbeat', 'motivational', 'dramatic', 'happy' ] )

    const [ dataChooseByMood, setDataChooseByMood ] = useState([])

    const fecthDataListenAgain = ( content ) => {
        var tempImage = new Image()
        content.map(
            ( item, index ) => {
                firebase.storage().ref().child('Thumbnails').child(`${item}.jpg`).getDownloadURL().then(
                    response => {
                        tempImage.src = response
                        dataChooseByMood.push(
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
            fecthDataListenAgain(listChooseByMood)
        },
        []
    )

    return (

        <ChooseByMoodContext.Provider
        value = {{
            dataChooseByMood,  titleChooseByMood, listChooseByMood, idChooseByMood
        }}
        >
            {props.children}
        </ChooseByMoodContext.Provider>

    )

}

export default ChooseByMoodContextProvider
