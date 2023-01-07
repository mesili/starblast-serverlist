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

    const filterRegion = ([region]) => undefined === regions[region] || true === regions[region]

    const filteredLocations = Object.entries(locations)
        .sort((a,b) => a.region - b.region)
        .filter(filterRegion)


    return (
        <section id="Home">
            <HomeFilters filteredLocations={filteredLocations} />
            <h2>Locations</h2>
            <Locations items={filteredLocations} />
        </section>
    )
}

const Locations = ({items}) => items.map(([region, systems], i) => (
    <LocationEntry 
        key={i} 
        name={region} 
        systems={systems}
    />
))

export default Home
