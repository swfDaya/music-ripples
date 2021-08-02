import React, { useState, createContext, useEffect, useReducer } from 'react'
import firebase from '../Pages/firebase'

export const BannerComponentContext = createContext()

const BannerComponentContextProvider = ( props ) => {

    //forceUpdate
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const titleBannerContent = 'Chart Busters'

    const listBannerContent = [ 
        {
            name: 'duaLipa', bgColor: 'pink'
        },
        {
            name: 'eminem', bgColor: '#b92b27'
        },
        {
            name: 'taylorSwift', bgColor: 'lightsalmon'
        },
        {
            name: 'billieEilish', bgColor: '#c6b7cc'
        },
        {
            name: 'charliePuth', bgColor: 'teal'
        }
     ]

    const [ dataBannerContent, setDataBannerContent ] = useState([])

    const fecthDataListenAgain = ( content ) => {
        var tempImage = new Image()
        content.map(
            ( item, index ) => {
                firebase.storage().ref().child('Thumbnails').child(`${item.name}.png`).getDownloadURL().then(
                    response => {
                        tempImage.src = response
                        dataBannerContent.push(
                            {
                                name: item.name,
                                bgColor: item.bgColor,
                                source: tempImage.src,
                                id: index
                            }
                        )
                        forceUpdate()
                    }
                )
            }
        )
    }

    const fetchBgColor = ( name ) => {
        var array = listBannerContent.filter( item => item.name === name )
        return array[0].bgColor
    }

    useEffect(
        () => {
            fecthDataListenAgain(listBannerContent)
        },
        []
    )

    return (

        <BannerComponentContext.Provider
        value = {{
            dataBannerContent,  titleBannerContent, fetchBgColor
        }}
        >
            {props.children}
        </BannerComponentContext.Provider>

    )

}

export default BannerComponentContextProvider
