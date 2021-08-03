import React, { useState, createContext, useEffect, useReducer } from 'react'
import firebase from '../Pages/firebase'

export const ChooseByGenreContext = createContext()

const ChooseByGenreContextProvider = ( props ) => {

    //forceUpdate
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const titleChooseByGenre = 'Choose By Genre'
    const idChooseByGenre = 'chooseByGenre'

    const [ listChooseByGenre, setListChooseByGenre ] = useState( [ 'jazz', 'folk', 'hipHop', 'rock', 'country', 'electronic', 'indie', 'k-POP', 'orchestra' ] )

    const [ dataChooseByGenre, setDataChooseByGenre ] = useState([])

    const fecthDataListenAgain = ( content ) => {
        var tempImage = new Image()
        content.map(
            ( item, index ) => {
                firebase.storage().ref().child('Thumbnails').child(`${item}.jpg`).getDownloadURL().then(
                    response => {
                        tempImage.src = response
                        dataChooseByGenre.push(
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
            fecthDataListenAgain(listChooseByGenre)
        },
        []
    )

    return (

        <ChooseByGenreContext.Provider
        value = {{
            dataChooseByGenre,  titleChooseByGenre, listChooseByGenre, idChooseByGenre
        }}
        >
            {props.children}
        </ChooseByGenreContext.Provider>

    )

}

export default ChooseByGenreContextProvider
