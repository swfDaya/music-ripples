import React, { useState, createContext, useEffect, useReducer } from 'react'
import firebase from '../Pages/firebase'

export const FeaturedThisWeekContext = createContext()

const FeaturedThisWeekContextProvider = ( props ) => {

    //forceUpdate
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const titleFeaturedThisWeek = 'Featured'
    const idFeaturedThisWeek = 'featuredThisWeek'

    const [ listFeaturedThisWeek, setListFeaturedThisWeek ] = useState( [ 'invasion', 'jump', 'letsDance', 'starDust', 'slenderComesAtNight', 'robbingPlan', 'risingSea', 'flightOfTheMind', 'captive' ] )

    const [ dataFeaturedThisWeek, setDataFeaturedThisWeek ] = useState([])

    const fecthDataFeaturedThisWeek = ( content ) => {
        var tempImage = new Image()
        content.map(
            ( item, index ) => {
                firebase.storage().ref().child('Thumbnails').child(`${item}.jpg`).getDownloadURL().then(
                    response => {
                        tempImage.src = response
                        dataFeaturedThisWeek.push(
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
            fecthDataFeaturedThisWeek(listFeaturedThisWeek)
        },
        []
    )

    return (

        <FeaturedThisWeekContext.Provider
        value = {{
            dataFeaturedThisWeek,  titleFeaturedThisWeek, idFeaturedThisWeek, listFeaturedThisWeek
        }}
        >
            {props.children}
        </FeaturedThisWeekContext.Provider>

    )

}

export default FeaturedThisWeekContextProvider
