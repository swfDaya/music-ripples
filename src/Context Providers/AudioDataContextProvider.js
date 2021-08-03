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

    const [ hasPicLoaded, setHasPicLoaded ] = useState(false)

    useEffect(
        () => {
            fetchSelectedSongImage(selectedSong.songID)
        }, []
    )

    const addToSongQueue = ( item ) =>{
        if ( currentSongQueue.includes(item) ) {
            var index = currentSongQueue.findIndex(items => items === item)
            currentSongQueue.splice(index, 1)
            forceUpdate()
        }
        currentSongQueue.unshift(item)
        forceUpdate()
    }

    const addSongsToSongQueue = ( queue ) =>{
        queue.forEach(
            item => {
                if ( currentSongQueue.includes(item) ) {
                    var index = currentSongQueue.findIndex(items => items === item)
                    currentSongQueue.splice(index, 1)
                    forceUpdate()
                }
            }
        )
        currentSongQueue.unshift(...queue)
        forceUpdate()
    }

    const shufflePlayerArray = () =>  {
        for (let i = currentSongQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentSongQueue[i], currentSongQueue[j]] = [currentSongQueue[j], currentSongQueue[i]];
            forceUpdate()
        }
        forceUpdate()
        return currentSongQueue[0]
    }

    return (

        <AudioDataContext.Provider
        value = {{
            currentSongQueue, setCurrentSongQueue, selectedSongImage, setSelectedImage, selectedSong, setSelectedSong, fetchSelectedSongImage,
            hasPicLoaded, setHasPicLoaded, addToSongQueue, addSongsToSongQueue, shufflePlayerArray
        }}
        >
            {props.children}
        </AudioDataContext.Provider>

    )

}

export default AudioDataContextProvider
