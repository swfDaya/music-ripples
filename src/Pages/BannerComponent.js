import React, { useState, useRef, useContext, useEffect } from 'react'
import classNames from 'classnames'
import '../Styles/BannerComponent.css'
import { useWindowResize } from 'beautiful-react-hooks'
import Swipe from 'react-easy-swipe';
import { BannerComponentContext } from '../Context Providers/BannerComponentContextProvider'
import { useHistory, useLocation } from 'react-router-dom'

const BannerComponent = () => {

    const history = useHistory()

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    const bannerScroll = useRef(null)
    const bannerScrollLargeScreen = useRef(null)
    const [ visibleIndex, setVisibleIndex ] = useState(0)
    const [ visibleIndexLargeScreen, setVisibleIndexLargeScreen ] = useState(0)
    const [ currentScrollPosition, setCurrentScrollPosition ] = useState(0)
    const [ currentLargeScrollPosition, setCurrentLargeScrollPosition ] = useState(0)
    
    const { dataBannerContent,  titleBannerContent, fetchBgColor } = useContext(BannerComponentContext)

    useEffect(() => {
        const interval = setInterval(() =>
        {
            if ( wWidth > 991 ) {
                if ( visibleIndexLargeScreen === 4 ) {
                    bannerScrollLargeScreen.current.scrollLeft = 0
                    setCurrentLargeScrollPosition( 0 )
                    setVisibleIndexLargeScreen( 0 )
                }
                else {
                    bannerScrollLargeScreen.current.scrollLeft = currentLargeScrollPosition + ((( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight)) * 0.75)
                    setCurrentLargeScrollPosition( currentLargeScrollPosition + (((( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight)) * 0.75)) )
                    setVisibleIndexLargeScreen( visibleIndexLargeScreen + 1 )
                }
            }
            else {
                if ( visibleIndex === 4 ) {
                    bannerScroll.current.scrollLeft = 0
                    setCurrentScrollPosition( 0 )
                    setVisibleIndex( 0 )
                }
                else {
                    scrollLeft()
                }
            }
        }
        , 5000);
        return () => clearInterval(interval)
    }, [visibleIndex, visibleIndexLargeScreen])

    const scrollToBannerLargeScreen = ( index ) => {
        bannerScrollLargeScreen.current.scrollLeft = index * ((( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight)) * 0.75)
        setCurrentLargeScrollPosition( index * (((( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight)) * 0.75)) )
        setVisibleIndexLargeScreen( index )
    }

    const scrollLeft = () => {
        if ( currentScrollPosition/Number(wWidth - (0.065 * wHeight)) < 4 ) {
            bannerScroll.current.scrollLeft = currentScrollPosition + Math.floor(Number(wWidth - (0.065 * wHeight)))
            setCurrentScrollPosition( currentScrollPosition + Math.floor(Number(wWidth - (0.065 * wHeight))) )
            setVisibleIndex( visibleIndex + 1 )
        }
    }

    const scrollRight = () => {
        if ( currentScrollPosition/Number(wWidth - (0.065 * wHeight)) > 0 ) {
            bannerScroll.current.scrollLeft = currentScrollPosition - Math.floor(Number(wWidth - (0.065 * wHeight)))
            setCurrentScrollPosition( currentScrollPosition - Math.floor(Number(wWidth - (0.065 * wHeight))) )
            setVisibleIndex( visibleIndex - 1 )
        }
    }

    return (

        <div
        className = { classNames('bannerContainer') }
        >
            <div
            className = { classNames('bannerContainerTop', 'toCenter') }
            >
                <div
                className = { classNames('bannerNamecontainer') }
                style = {{
                    height: '100%',
                    width: ( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight),
                    scrollBehavior: 'smooth',
                    paddingLeft: wWidth > 991 ? (( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight)) * 0.3 : 0
                }}
                >
                    {titleBannerContent}
                </div>
            </div>
            <div
            className = { classNames('bannerContainerMiddle', 'toCenter') }
            >
                {/* {
                    wWidth > 991 ?  */}
                    <div
                    className = { classNames('bannerLargeScreenContainer') }
                    ref = {bannerScrollLargeScreen}
                    style = {{
                        height: '100%',
                        width: ( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight),
                        scrollBehavior: 'smooth',
                        display: wWidth > 991 ? 'flex' : 'none'
                    }}
                    >
                        <div
                        style = {{
                            height: '100%',
                            minWidth: (( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight)) * 0.1,
                        }}
                        >
                        </div>
                        {
                            dataBannerContent.map(
                                ( item, index ) => {
                                    return(
                                        <div
                                        className = { classNames('toCenter') }
                                        style = {{
                                            height: '100%',
                                            minWidth: (( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight)) * 0.75,
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                        >
                                            <div
                                            style = {{
                                                height: '100%',
                                                minWidth: (( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight)) * 0.05,
                                            }}
                                            >

                                            </div>
                                            <div
                                            onClick = { () => history.push(`/theme/${item.name}`) }
                                            className = { classNames('toCenter', 'clickable') }
                                            style = {{
                                                height: visibleIndexLargeScreen === index ? '100%' : '70%' ,
                                                minWidth: (( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight)) * 0.7,
                                                backgroundColor: fetchBgColor( item.name ),
                                                borderRadius: 10,
                                                transition: 'all 0.75s ease-in-out'
                                            }}
                                            >
                                                <img
                                                style = {{
                                                    height: '100%',
                                                }}
                                                src = { item.source }
                                                alt = ''
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                            )
                        }
                        <div
                        style = {{
                            height: '100%',
                            minWidth: (( wWidth > 1599 ? 1600 : wWidth ) - (0.065 * wHeight)) * 0.15,
                        }}
                        >
                        </div>
                    </div>
                    {/* : */}
                    <div
                    className = { classNames('bannerScrollContainer') }
                    ref = {bannerScroll}
                    style = {{
                        height: '100%',
                        width: Math.floor(wWidth - (0.065 * wHeight)),
                        scrollBehavior: 'smooth',
                        display: wWidth > 991 ? 'none' : 'flex'
                    }}
                    >
                        {
                            dataBannerContent.map(
                                ( item, index ) => {
                                    return(
                                        <Swipe
                                        onSwipeLeft = {() => scrollLeft()}
                                        onSwipeRight = {() => scrollRight()}
                                        tolerance = {20}
                                        >
                                            <div
                                            onClick = { () => history.push(`/theme/${item.name}`) }
                                            className = { classNames('toCenter') }
                                            style = {{
                                                height: '100%',
                                                minWidth: Math.floor(wWidth - (0.065 * wHeight)),
                                                backgroundColor: fetchBgColor( item.name ),
                                                borderRadius: 10
                                            }}
                                            >
                                                <img
                                                style = {{
                                                    height: '100%',
                                                }}
                                                src = { item.source }
                                                alt = ''
                                                />
                                            </div>
                                        </Swipe>
                                    )
                                }
                            )
                        }
                    </div>
                {/* } */}
            </div>
            <div
            className = { classNames('bannerContainerBottom') }
            >
                <div
                className = { classNames('bannerDots') }
                style = {{
                    width: wWidth > 991 ? '30%' : '60%'
                }}
                >
                    {
                        wWidth > 991 ?
                        [0, 1, 2 ,3, 4].map(
                            ( item ) => {
                                return(
                                    <div
                                    className = { classNames('clickable') }
                                    onClick = { () => scrollToBannerLargeScreen(item) }
                                    style = {{
                                        height: visibleIndexLargeScreen === item ? 0.02 * wHeight : 0.012 * wHeight,
                                        width: visibleIndexLargeScreen === item ? 0.02 * wHeight : 0.012 * wHeight,
                                        backgroundColor: visibleIndexLargeScreen === item ? 'white' : '#7f7f7f',
                                        borderRadius: '100%'
                                    }}
                                    >
                                    </div>
                                )
                            }
                        )
                        :
                        [0, 1, 2 ,3, 4].map(
                            ( item ) => {
                                return(
                                    <div
                                    style = {{
                                        height: visibleIndex === item ? 0.02 * wHeight : 0.01 * wHeight,
                                        width: visibleIndex === item ? 0.02 * wHeight : 0.01 * wHeight,
                                        backgroundColor: visibleIndex === item ? 'white' : '#7f7f7f',
                                        borderRadius: '100%'
                                    }}
                                    >
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
        </div>

    )

}

export default BannerComponent
