import React from 'react'
import { useSelector } from 'react-redux'
import Filter from 'common/Filter'

const LocationFilters = ({action, items}) => (
    <div className="box">
        <div id="locations-filters">
            <h3>Locations Filters</h3>
            {Object.keys(items).sort().map((e,i) => (
                <Filter
                    key={i}
                    name={e}
                    value={items[e]}
                    action={action}
                    field={'regions'}
                />
            ))}
        </div>
    </div>
)

const ModeFilters = ({action, items, mods}) => (
    <div className="box">
        <div id="modes-filters">
            <h3>Modes Filters</h3>
            {Object.keys(items).sort().map((e,i) => (
                <Filter
                    key={i}
                    name={e}
                    label={`${mods[e] ? "mod: " : ""} ${e}`}
                    value={items[e]}
                    action={action}
                    field={'modes'}
                />
            ))}
        </div>
    </div>
)

const HomeFilters = () => {
    const { regions, modes, mods } = useSelector(state => state.servers)

    return (
        <div id="home-filters">
            {!Object.keys(regions).length ? null : (<LocationFilters action="region" items={regions} />)}
            {!Object.keys(modes).length ? null : (<ModeFilters action="mode" items={modes} mods={mods} />)}
        </div>
    )
}

export default HomeFilters
