import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import '../Styles/SquareSong.css'
import { useWindowResize } from 'beautiful-react-hooks'
import { CentralDataContext } from "../Context Providers/CentralDataContextProvider";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useHistory, useLocation } from 'react-router-dom'
import { AudioDataContext } from '../Context Providers/AudioDataContextProvider'

const SquareSong = ( props ) => {

    const history = useHistory()

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    const { fetchSongData } = useContext(CentralDataContext)
    const [ squareSongContent, setSquareSongContent ] = useState(...fetchSongData(props.id))
    const { currentSongQueue, setCurrentSongQueue, selectedSongImage, setSelectedImage, selectedSong, setSelectedSong, fetchSelectedSongImage,
        hasPicLoaded, setHasPicLoaded, addToSongQueue, audioRef, setIsAudioPlaying, fetchSong, isFirstTime, setIsFirstTime, getSources } = useContext(AudioDataContext)

    const [ hasSquarePicLoaded, setHasSquarePicLoaded ] = useState(false)

    const onSquareClick = ( id ) => {
        if ( props.type === 'song' ) {
            if ( isFirstTime ) {
                getSources()
                setIsFirstTime(false)
            }
        setIsAudioPlaying(false)
        fetchSong(id)
        setHasPicLoaded(false)
        setSelectedSong(...fetchSongData(id))
        fetchSelectedSongImage(id)
        addToSongQueue(id)
        history.push('/player')
        }
        else {
            history.push(`/theme/${id}`)
        }
    }

    return (

        <div
        className = { classNames( 'squareSongContainer' ) }
        style = {{
            minWidth: props.index === 0 ? ( wWidth > 559 ? ( 0.19 * wHeight )  : '150px' ) : ( wWidth > 559 ? ( 0.19 * wHeight ) + 30  : '180px' ),
            maxWidth: props.index === 0 ? ( wWidth > 559 ? ( 0.19 * wHeight )  : '150px' ) : ( wWidth > 559 ? ( 0.19 * wHeight ) + 30  : '180px' ),
        }}
        >
            <div
            className = { classNames( 'squareSongSpacer' ) }
            style = {{
                display: props.index === 0 ? 'none' : 'flex'
            }}
            >

            </div>
            <div
            className = { classNames( 'squareSongContent' ) }
            style = {{
                minWidth: wWidth > 559 ? 0.19 * wHeight : '150px',
                maxWidth: wWidth > 559 ? 0.19 * wHeight : '150px'
            }}
            >
                <div
                className = { classNames( 'squareImageContent', 'clickable' ) }
                onClick = { () => onSquareClick( props.id ) }
                style = {{
                    minWidth: wWidth > 559 ? 0.19 * wHeight : '150px',
                    maxWidth: wWidth > 559 ? 0.19 * wHeight : '150px'
                }}
                >
                    <img
                    className = { classNames('squareSongContentImage') }
                    style = {{
                        display: hasSquarePicLoaded ? 'flex' : 'none'
                    }}
                    src = {props.source}
                    alt =''
                    onLoad = {() => setHasSquarePicLoaded(true)}
                    />
                    <div
                    style = {{
                        display: hasSquarePicLoaded ? 'none' : 'flex'
                    }}
                    >
                    <SkeletonTheme 
                    color="#202020" highlightColor="#444">
                        <section>
                        <Skeleton 
                        height = {wWidth > 559 ? 0.19 * wHeight : 150} 
                        width = {wWidth > 559 ? 0.19 * wHeight : 150}  
                        />
                        </section>
                    </SkeletonTheme>
                    </div>
                </div>
                {
                    props.type === 'song' ?
                    <div
                    className = { classNames( 'squareNameContent' ) }
                    style = {{
                        minWidth: wWidth > 559 ? 0.19 * wHeight : '150px',
                        maxWidth: wWidth > 559 ? 0.19 * wHeight : '150px'
                    }}
                    >
                        <div
                        className = { classNames( 'squareSongNameContainer' ) }
                        >
                            <div
                            className = { classNames( 'squareSongNameContent' ) }
                            >
                                {squareSongContent.songName}
                            </div>
                        </div>
                        <div
                        className = { classNames( 'squareArtistNameContainer' ) }
                        >
                            <div
                            className = { classNames( 'squareArtistNameContent' ) }
                            >
                                {squareSongContent.artistName}
                            </div>
                        </div>
                    </div>
                    :
                    <div
                    className = { classNames( 'squareNameContent', 'toCenter' ) }
                    style = {{
                        minWidth: wWidth > 559 ? 0.19 * wHeight : '150px',
                        maxWidth: wWidth > 559 ? 0.19 * wHeight : '150px',
                    }}
                    >
                        <div
                        className = { classNames( 'squareSongNameContent' ) }
                        >
                            {props.id[0].toUpperCase() + props.id.substring(1)}
                        </div>
                    </div>
                }
            </div>
        </div>

    )

}

export default SquareSong
