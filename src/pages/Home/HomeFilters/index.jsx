import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'state/servers'


const FilterEntry = ({name, value, action}) => {
    const dispatch = useDispatch()
    const filter = (name, value) => dispatch(actions[action]({name, value}))
   return (
        <>
            <input 
                id={name}
                type={"checkbox"}
                name={"filters[]"}
                onChange={()=> filter(name, !value)} 
                checked={value}
            />
            <label htmlFor={name}>
                {name} 
            </label>
        </>
    )
}

const LocationFilters = ({action, items}) => {
    const { regions } = useSelector(state => state.servers)

    return (
        <div className="box">
            <div id="locations-filters">
                <h3>Locations Filters</h3>
                {Object.keys(items).sort().map((e,i) => (
                    <FilterEntry key={i} name={e} value={items[e]} action={action} />
                ))}
            </div>
        </div>
    )
}

const ModeFilters = ({action, items}) => {

    return (
        <div className="box">
            <div id="modes-filters">
                <h3>Modes Filters</h3>
                {Object.keys(items).sort().map((e,i) => (
                    <FilterEntry key={i} name={e} value={items[e]} action={action} />
                ))}
            </div>
        </div>
    )
}


const HomeFilters = () => {
    const { regions, modes } = useSelector(state => state.servers)
    
    return (
        <div id="home-filters">
            <LocationFilters action="region" items={regions} />
            <ModeFilters action="mode" items={modes} />
        </div>
    )
}

export default HomeFilters
