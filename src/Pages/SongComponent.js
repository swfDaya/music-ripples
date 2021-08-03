import React, { useState, useContext, useRef } from 'react'
import classNames from 'classnames'
import '../Styles/SongComponent.css'
import { useWindowResize } from 'beautiful-react-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import maximizeColor from '../Images/maximizeColor.svg'
import SquareSong from './SquareSong'
import leftColor from '../Images/leftColor.svg'
import rightColor from '../Images/rightColor.svg'
import right from '../Images/right.svg'
import left from '../Images/left.svg'

const SongComponent = ( props ) => {

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    const containerTopWidth = ( width ) => {
        if ( width < 600 ) {
            return wWidth - (0.065 * wHeight)
        }
        else if ( (( props.list.length * (0.19 * wHeight)  ) + ( (props.list.length - 1) * 30 )) > (wWidth - (0.065 * wHeight)) ) {
            return wWidth - (0.065 * wHeight)
        }
        else {
            return ( props.list.length * (0.19 * wHeight)  ) + ( (props.list.length - 1) * 30 )
        }
    }

    const fetchShouldScrollIconsavailable = () => {
        if ( (( props.list.length * (0.19 * wHeight)  ) + ( (props.list.length - 1) * 30 )) > (wWidth - (0.065 * wHeight)) ) {
            return true
        }
        else {
            return false
        }
    }

    const [ shouldScrollIconsavailable, setScrollIconsavailable ] = useState(fetchShouldScrollIconsavailable())
    const [ isScrollRightAvailable, setScrollRightAvailable ] = useState(true)
    const [ isScrollLeftAvailable, setScrollLeftAvailable ] = useState(false)
    const [ availableWidth, setAvailableWidth ] = useState(containerTopWidth(wWidth))
    const [ totalWidth, setTotalWidth ] = useState( ((wWidth > 559 ? ((0.19 * wHeight) + 30) : 180) * props.list.length) - 30 )
    const [ availablecontent, setAvailablecontent ] = useState(Math.floor(availableWidth/(wWidth > 559 ? 180 : (0.19 * wHeight) + 30)) * (wWidth > 559 ? 180 : (0.19 * wHeight) + 30))

    const scrollComponent = useRef(null)
    const [ currentScrollPosition, setCurrentScrollPosition ] = useState(0)

    const clickScrollRight = () => {
        if ( !isScrollLeftAvailable ) { setScrollLeftAvailable(true) }
        if ( isScrollRightAvailable ) {
            if ( availableWidth + availablecontent < totalWidth ) {
                scrollComponent.current.scrollLeft = currentScrollPosition + availablecontent
                setCurrentScrollPosition(currentScrollPosition + availablecontent)
            }
            else {
                scrollComponent.current.scrollLeft = totalWidth
                setCurrentScrollPosition(totalWidth)
                setScrollRightAvailable(false)
            }
        }
    }

    const clickScrollLeft = () => {
        if ( !isScrollRightAvailable ) { setScrollRightAvailable(true) }
        if ( isScrollLeftAvailable ) {
            if ( currentScrollPosition - availablecontent > 0 ) {
                scrollComponent.current.scrollLeft = currentScrollPosition - availablecontent
                setCurrentScrollPosition(currentScrollPosition - availablecontent)
            }
            else {
                scrollComponent.current.scrollLeft = 0
                setCurrentScrollPosition(0)
                setScrollLeftAvailable(false)
            }
        }
    }

    return (

        <div
        className = { classNames('songComponentContainer', 'toCenter') }
        >
            <div
            className = { classNames('songComponentContainerTop') }
            style = {{
                width: ( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight),
            }}
            >
                <div
                className = { classNames('songComponentContentTop') }
                style = {{
                    width: containerTopWidth(wWidth)
                }}
                >
                    <div
                    className = { classNames('songComponentContainerTopLeft') }
                    >
                    {props.title}
                    </div>
                    <div
                    className = { classNames('songComponentContainerTopRight') }
                    >
                        <div
                        className = { classNames('songComponentContainerTopRightSquare') }
                        style = {{
                            height: wWidth < 600 ? 40 : 0.08 * wHeight,
                            width: wWidth < 600 ? 40 : 0.08 * wHeight,
                            display: shouldScrollIconsavailable ? 'flex' : 'none'
                        }}
                        >
                            <img
                            onClick = {() => clickScrollLeft()}
                            className = { classNames(isScrollLeftAvailable ? 'clickable' : '') }
                            style = {{
                                height: wWidth < 600 ? 25 : 0.03 * wHeight,
                                width: wWidth < 600 ? 25 : 0.03 * wHeight,
                            }}
                            src = {isScrollLeftAvailable ? leftColor : left}
                            alt = ''
                            />
                        </div>
                        <div
                        className = { classNames('songComponentContainerTopRightSquare') }
                        style = {{
                            height: wWidth < 600 ? 40 : 0.08 * wHeight,
                            width: wWidth < 600 ? 40 : 0.08 * wHeight,
                            display: shouldScrollIconsavailable ? 'flex' : 'none'
                        }}
                        >
                            <img
                            className = { classNames(isScrollRightAvailable ? 'clickable' : '') }
                            onClick = {() => clickScrollRight()}
                            style = {{
                                height: wWidth < 600 ? 25 : 0.03 * wHeight,
                                width: wWidth < 600 ? 25 : 0.03 * wHeight,
                            }}
                            src = {isScrollRightAvailable ? rightColor : right}
                            alt = ''
                            />
                        </div>
                        <div
                        className = { classNames('songComponentContainerTopRightSquare') }
                        style = {{
                            height: wWidth < 600 ? 40 : 0.08 * wHeight,
                            width: wWidth < 600 ? 40 : 0.08 * wHeight,
                            display: props.type === 'song' ? 'flex' : 'none'
                        }}
                        >
                            <div
                            className = { classNames('playBackground', 'toCenter', 'clickable') }
                            style = {{
                                height: wWidth < 600 ? 25 : 0.03 * wHeight,
                                width: wWidth < 600 ? 25 : 0.03 * wHeight,
                            }}
                            >
                                <FontAwesomeIcon
                                style = {{
                                    height: '45%', width: '45%', color: 'white', paddingLeft: '10%'
                                }}
                                icon = {faPlay}
                                />
                            </div>
                        </div>
                        <div
                        className = { classNames('songComponentContainerTopRightSquare') }
                        style = {{
                            height: wWidth < 600 ? 40 : 0.08 * wHeight,
                            width: wWidth < 600 ? 40 : 0.08 * wHeight,
                            display: props.type === 'song' ? 'flex' : 'none'
                        }}
                        >
                            <img
                            className = { classNames('clickable') }
                            style = {{
                                height: wWidth < 600 ? 25 : 0.03 * wHeight,
                                width: wWidth < 600 ? 25 : 0.03 * wHeight,
                            }}
                            src = {maximizeColor}
                            alt = ''
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
            className = { classNames('songComponentContainerBottom') }
            ref = {scrollComponent}
            style = {{
                width: ( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight),
            }}
            >
                {
                    props.content.map(
                        ( item, index ) => {
                            return(
                                <SquareSong 
                                index = { index }
                                id = { item.id }
                                source = { item.source }
                                type = { props.type }
                                />
                            )
                        }
                    )
                }
            </div>
        </div>

    )

}

export default SongComponent
