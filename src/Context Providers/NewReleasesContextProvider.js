import React, { useState, createContext, useEffect, useReducer } from 'react'
import firebase from '../Pages/firebase'

export const NewReleasesContext = createContext()

const NewReleasesContextProvider = ( props ) => {

    //forceUpdate
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const titleNewReleases = 'New Releases'
    const idNewReleases = 'newReleases'

    const [ listNewReleases, setListNewReleases ] = useState( [ 'hero', 'trueSelf', 'infinitePossibility', 'deepColdOcean', 'texasRanger', 'walkInTheRain', 'sunsets', 'wayToTheTop' ] )

    const [ dataNewReleases, setDataNewReleases ] = useState([])

    const fecthDataNewReleases = ( content ) => {
        var tempImage = new Image()
        content.map(
            ( item, index ) => {
                firebase.storage().ref().child('Thumbnails').child(`${item}.jpg`).getDownloadURL().then(
                    response => {
                        tempImage.src = response
                        dataNewReleases.push(
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
            fecthDataNewReleases(listNewReleases)
        },
        []
    )

    return (

        <NewReleasesContext.Provider
        value = {{
            dataNewReleases,  titleNewReleases, idNewReleases, listNewReleases
        }}
        >
            {props.children}
        </NewReleasesContext.Provider>

    )

}

export default NewReleasesContextProvider
