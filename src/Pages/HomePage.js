import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { useWindowResize } from 'beautiful-react-hooks'
import BannerComponent from './BannerComponent'

const HomePage = () => {

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    return (

        <div
        className = { classNames('homePage') }
            style = {{
                height: 0.8 * wHeight, 
                width: wWidth > 1599 ? 1600 : '100%',
            }}
        >
            <BannerComponent />
        </div>

    )

}

export default HomePage
