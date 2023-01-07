import React, { useEffect } from 'react'
import LocationEntry from 'common/LocationEntry'
import HomeFilters from './HomeFilters'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServers, tickLocations } from 'state/serversSlice'
import './style.scss'


export const Home =  () => {

    const dispatch = useDispatch()

    /* Server retrieval */
    useEffect(() => { 
        dispatch(fetchServers())
        const retrieval = setInterval(() => dispatch(fetchServers()), 20000)
        return () => clearInterval(retrieval)
    }, [ dispatch ])

    /* Location tick */
    useEffect(() => {
        const tick = setInterval(() => dispatch(tickLocations()), 1000)
        return () => clearInterval(tick)
    }, [ dispatch ])

    const { locations, regions } = useSelector( state => state.servers )

    const filterRegion = e => undefined === regions[e] || true === regions[e]

    const mapLocations = (e,i) => (
        <LocationEntry 
            key={i} 
            name={e} 
            systems={{...locations[e]}} 
        />
    )

    return (
        <section id="Home">
            <HomeFilters />
            <h2>Locations</h2>
            {
                Object.keys(locations)
                    .sort()
                    .filter(filterRegion)
                    .map(mapLocations)
            }
        </section>
    )
}

export default Home
