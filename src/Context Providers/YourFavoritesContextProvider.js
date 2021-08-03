import React, { useState, createContext, useEffect, useReducer } from 'react'
import firebase from '../Pages/firebase'

export const YourFavoritesContext = createContext()

const YourFavoritesContextProvider = ( props ) => {

    //forceUpdate
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const titleYourFavorites = 'Your Favorites'
    const idYourFavorites = 'yourFavorites'

    const [ listYourFavorites, setListYourFavorites ] = useState( [ 'deepColdOcean', 'flightOfTheMind', 'walkInTheRain', 'trueSelf', 'straightOuttaCompton' ] )

    const [ dataYourFavorites, setDataYourFavorites ] = useState([])

    const fecthDataYourFavorites = ( content ) => {
        var tempImage = new Image()
        content.map(
            ( item, index ) => {
                firebase.storage().ref().child('Thumbnails').child(`${item}.jpg`).getDownloadURL().then(
                    response => {
                        tempImage.src = response
                        dataYourFavorites.push(
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

    const alterYourFavorites = ( content ) => {
        var indexListFav = listYourFavorites.indexOf(content)
        var tempImage = new Image()
        if ( indexListFav > -1 ) {
            listYourFavorites.splice( indexListFav, 1 )
            forceUpdate()
            var indexDataFav = dataYourFavorites.findIndex( item => item.id === content )
            dataYourFavorites.splice( indexDataFav, 1 )
            forceUpdate()
        }
        else {
            listYourFavorites.unshift( content )
            forceUpdate()
            firebase.storage().ref().child('Thumbnails').child(`${content}.jpg`).getDownloadURL().then(
                response => {
                    tempImage.src = response
                    dataYourFavorites.unshift(
                        {
                            id: content,
                            source: tempImage.src,
                        }
                    )
                    forceUpdate()
                }
            )
            forceUpdate()
        }
    }

    useEffect(
        () => {
            fecthDataYourFavorites(listYourFavorites)
        },
        []
    )

    return (

        <YourFavoritesContext.Provider
        value = {{
            dataYourFavorites,  titleYourFavorites, listYourFavorites, alterYourFavorites, idYourFavorites
        }}
        >
            {props.children}
        </YourFavoritesContext.Provider>

    )

}

export default YourFavoritesContextProvider
