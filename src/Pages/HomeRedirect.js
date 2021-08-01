import React from 'react'
import { Redirect } from 'react-router-dom'

const HomeRedirect = () => {
    return (
        <Redirect 
        to = '/home'
        />
    )
}

export default HomeRedirect
