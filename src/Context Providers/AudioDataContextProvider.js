import React, { useState, createContext, useEffect, useReducer, useRef } from 'react'
import firebase from '../Pages/firebase'

export const AudioDataContext = createContext()

const AudioDataContextProvider = ( props ) => {

    //forceUpdate
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const audioRef = useRef(null)
    var audio = document.getElementById('audio')
    let context = null
    let source = null

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

    const [ currentAudio, setCurrentAudio ] = useState()
    const [ isWavesActive, setISWavesActive ] = useState(false)
    const [ isRepeatActive, setIsRepeatActive ] = useState(false)
    const [ currentAudioTime, setcurrentAudioTime ] = useState(0)
    const [ currentAudioDuration, setcurrentAudioDuration ] = useState(0)
    const [ isAudioPlaying, setIsAudioPlaying ] = useState(false)
    const [ isFirstTime, setIsFirstTime ] = useState(true)

    const timeUpdateHandler = ( event ) => {
        setcurrentAudioTime(Math.floor(event.target.currentTime))
        setcurrentAudioDuration(Math.floor(event.target.duration))
    }

    const fetchSong = ( song ) => {
        var tempAudio = new Audio()
        firebase.storage().ref().child('Songs').child(`${song}.mp3`).getDownloadURL().then(
            response => {
                tempAudio.src = response
                setCurrentAudio(tempAudio.src)
            }
        )
    }

    const getSources = () => {
        context = context || new AudioContext()
        source = source || context.createMediaElementSource(audio)
        var analyser = context.createAnalyser();

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
    
        source.connect(analyser);
        analyser.connect(context.destination);
    
        analyser.fftSize = 256;
    
        var bufferLength = analyser.frequencyBinCount;
    
        var dataArray = new Uint8Array(bufferLength);
    
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;
    
        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;
    
        function renderFrame() {
        requestAnimationFrame(renderFrame);
    
        x = 0;
    
        analyser.getByteFrequencyData(dataArray);
    
        ctx.fillStyle = '#060606'
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 0.5;
            
            var r = (barHeight * 2.5 ) + (25 * (i/bufferLength));
            var g = 250 *(i/bufferLength);
            var b = 50;
            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    
            x += barWidth + 1;
        }
        }
        renderFrame();
    }

    useEffect(
        () => {
            fetchSelectedSongImage(selectedSong.songID)
            fetchSong(selectedSong.songID)
        }, []
    )

    const playSongHandler = () => {
        if ( currentAudio ) {
            if ( isAudioPlaying ) {
                audioRef.current.pause()
                setIsAudioPlaying(false)
            }
            else {
                if (isFirstTime) {
                    getSources()
                    setIsFirstTime(false)
                }
                audioRef.current.play()
                setIsAudioPlaying(true)
            }
        }
    }

    useEffect(
        () => {
            if( !isFirstTime ) {
                playSongHandler()
            }
        },
        [currentAudio]
    )

    useEffect(
        () => {
        }, [selectedSong]
    )

    const slideRangeListener = ( event ) => {
        audioRef.current.currentTime = event
    }

    return (

        <AudioDataContext.Provider
        value = {{
            currentSongQueue, setCurrentSongQueue, selectedSongImage, setSelectedImage, selectedSong, setSelectedSong, fetchSelectedSongImage,
            hasPicLoaded, setHasPicLoaded, addToSongQueue, addSongsToSongQueue, shufflePlayerArray, timeUpdateHandler, isWavesActive, setISWavesActive,
            playSongHandler, isAudioPlaying, setIsAudioPlaying, currentAudio, fetchSong, currentAudioTime, currentAudioDuration, slideRangeListener,
            audioRef, isFirstTime, setIsFirstTime, getSources, isRepeatActive, setIsRepeatActive
        }}
        >
            {props.children}
            <audio
            crossOrigin = 'anonymous'
            id = 'audio'
            onTimeUpdate = {timeUpdateHandler}
            src = {currentAudio}
            ref = {audioRef}
            >
            </audio>
        </AudioDataContext.Provider>

    )

}

export default AudioDataContextProvider
