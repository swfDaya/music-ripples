import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { useWindowResize } from 'beautiful-react-hooks'
import SongComponent from './SongComponent'
import { FeaturedThisWeekContext } from "../Context Providers/FeaturedThisWeekContextProvider";
import { NewReleasesContext } from "../Context Providers/NewReleasesContextProvider";
import { EditorialPicksContext } from "../Context Providers/EditorialPicksContextProvider";
import { PlayerContext } from '../Context Providers/PlayerContextProvider'
import { JukeBoxContext } from '../Context Providers/JukeBoxContextProvider'
import '../Styles/ExplorePage.css'

const ExplorePage = () => {

    const [ wWidth, setWidth ] = useState(window.innerWidth)
    const [ wHeight, setHeight ] = useState(window.innerHeight)

    useWindowResize((event: React.SyntheticEvent) => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })

    const { isPlayerActive, setIsPlayerActive, tabSelected, setTabSelected } = useContext(PlayerContext)
    const { dataFeaturedThisWeek,  titleFeaturedThisWeek, idFeaturedThisWeek, listFeaturedThisWeek } = useContext(FeaturedThisWeekContext)
    const { dataNewReleases,  titleNewReleases, idNewReleases, listNewReleases } = useContext(NewReleasesContext)
    const { dataJukeBox, titleJukeBox, idJukeBox, listJukeBox } = useContext(JukeBoxContext)
    const { dataEditorialPicks,  titleEditorialPicks, idEditorialPicks, listEditorialPicks } = useContext(EditorialPicksContext)

    setTabSelected('/explore')
    setIsPlayerActive(false)

    return (

        <div
        className = { classNames('explorePage') }
            style = {{
                height: 0.8 * wHeight, 
                width: wWidth > 1599 ? 1600 : '100%',
            }}
        >
            <div
            className = { classNames('spacer') }
            >
            </div>
            <SongComponent
            content = {dataNewReleases}
            title = {titleNewReleases}
            id = {idNewReleases}
            list = {listNewReleases}
            type = {'song'}
            />
            <div
            className = { classNames('spacer') }
            >
            </div>
            <SongComponent
            content = {dataFeaturedThisWeek}
            title = {titleFeaturedThisWeek}
            id = {idFeaturedThisWeek}
            list = {listFeaturedThisWeek}
            type = {'song'}
            />
            <div
            className = { classNames('spacer') }
            >
            </div>
            <SongComponent
            content = {dataJukeBox}
            title = {titleJukeBox}
            id = {idJukeBox}
            list = {listJukeBox}
            type = {'theme'}
            />
            <div
            className = { classNames('spacer') }
            >
            </div>
            <SongComponent
            content = {dataEditorialPicks}
            title = {titleEditorialPicks}
            id = {idEditorialPicks}
            list = {listEditorialPicks}
            type = {'song'}
            />
            <div
            className = { classNames('spacer') }
            >
            </div>
        </div>

    )

}

export default ExplorePage
