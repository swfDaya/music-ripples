import React, { useState, createContext, useEffect, useReducer } from 'react'
import firebase from '../Pages/firebase'

export const AudioDataContext = createContext()

const AudioDataContextProvider = ( props ) => {

    //forceUpdate
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const [ selectedSong, setSelectedSong ] = useState(
        {
            songID: 'straightOuttaCompton',
            songName: 'Straight Outta Compton',
            artistName: 'N.W.A.',
            songURL: '',
            runTime: 258,
            songType: 'hipHop'
        })
    const [ selectedSongImage, setSelectedImage ] = useState()
    const [ currentSongQueue, setCurrentSongQueue ] = useState(['straightOuttaCompton', 'daughterOfSwords', 'uddGaye', 'alwaysOnMind', 'moonRiver', 'thottuThottu', 'sandhoshaKanneere', 'eiSuzhali'])

    const fetchSelectedSongImage = ( item ) => {
        var tempImage = new Image()
        firebase.storage().ref().child('Thumbnails').child(`${item}.jpg`).getDownloadURL().then(
            response => {
                tempImage.src = response
                setSelectedImage(tempImage.src)
            }
        )
    }

    useEffect(
        () => {
            fetchSelectedSongImage(selectedSong.songID)
        }, []
    )

    return (

        <AudioDataContext.Provider
        value = {{
            currentSongQueue, setCurrentSongQueue, selectedSongImage, setSelectedImage, selectedSong, setSelectedSong
        }}
        >
            {props.children}
        </AudioDataContext.Provider>

    )

}

export default AudioDataContextProvider
