import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { useWindowResize } from 'beautiful-react-hooks'

const ExplorePage = () => {

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    return (

        <div
        className = { classNames('explorePage') }
            style = {{
                height: 0.8 * wHeight, 
                width: wWidth > 1599 ? 1600 : '100%',
            }}
        >
            this is from explore
        </div>

    )

}

export default ExplorePage
