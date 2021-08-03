import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import '../Styles/SquareSong.css'
import { useWindowResize } from 'beautiful-react-hooks'
import { CentralDataContext } from "../Context Providers/CentralDataContextProvider";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SquareSong = ( props ) => {

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    const { fetchSongData } = useContext(CentralDataContext)
    const [ squareSongContent, setSquareSongContent ] = useState(...fetchSongData(props.id))

    const [ hasPicLoaded, setHasPicLoaded ] = useState(false)

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
                style = {{
                    minWidth: wWidth > 559 ? 0.19 * wHeight : '150px',
                    maxWidth: wWidth > 559 ? 0.19 * wHeight : '150px'
                }}
                >
                    <img
                    className = { classNames('squareSongContentImage') }
                    style = {{
                        display: hasPicLoaded ? 'flex' : 'none'
                    }}
                    // onClick = {() => showPlayer()}
                    src = {props.source}
                    alt =''
                    onLoad = {() => setHasPicLoaded(true)}
                    />
                    <div
                    style = {{
                        display: hasPicLoaded ? 'none' : 'flex'
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
