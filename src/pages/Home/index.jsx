import React, { useEffect } from 'react'
import LocationEntry from 'common/LocationEntry'
import HomeFilters from './HomeFilters'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'state/servers'
import { getServers, groupByLocation } from 'helpers/servers'
import './style.scss'


export const Home =  () => {

    const dispatch = useDispatch()

    /* Server retrieval */
    useEffect(() => { 
        const loadServers = () => getServers()
            .then(groupByLocation)
            .then(result => dispatch(actions.set(result)))
        loadServers()
        const retrieval = setInterval(() => loadServers(), 20000)
        return () => clearInterval(retrieval)
    }, [ dispatch ])

    /* Location tick */
    useEffect(() => {
        const tick = setInterval(() => dispatch(actions.tick()), 1000)
        return () => clearInterval(tick)
    }, [ dispatch ])

    const { locations, regions } = useSelector( state => state.servers )

    return (
        <section id="Home">
            <HomeFilters />
            <h2>Locations</h2>
            {
                Object.keys(locations)
                    .sort()
                    .filter(e => undefined === regions[e] || true === regions[e])
                    .map((e,i) => (<LocationEntry key={i} name={e} systems={{...locations[e]}} />))
            }
        </section>
    )
}

export default Home
