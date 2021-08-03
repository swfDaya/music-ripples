import React, { useState, createContext, useEffect, useReducer } from 'react'
import firebase from '../Pages/firebase'

export const ListenAgainContext = createContext()

const ListenAgainContextProvider = ( props ) => {

    //forceUpdate
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const titleListenAgain = 'Listen Again'
    const idListenAgain = 'listenAgain'

    const [ listListenAgain, setListListenAgain ] = useState( [ 'aboveTheClouds', 'captive', 'wayToTheTop' ] )

    const [ dataListenAgain, setDataListenAgain ] = useState([])

    const fecthDataListenAgain = ( content ) => {
        var tempImage = new Image()
        content.map(
            ( item, index ) => {
                firebase.storage().ref().child('Thumbnails').child(`${item}.jpg`).getDownloadURL().then(
                    response => {
                        tempImage.src = response
                        dataListenAgain.push(
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
            fecthDataListenAgain(listListenAgain)
        },
        []
    )

    return (

        <ListenAgainContext.Provider
        value = {{
            idListenAgain, dataListenAgain,  titleListenAgain, listListenAgain
        }}
        >
            {props.children}
        </ListenAgainContext.Provider>

    )

}

export default ListenAgainContextProvider