import React from 'react'
import { useSelector } from 'react-redux'
import SystemEntry from 'common/SystemEntry'
import './style.scss'


export const LocationEntry = ({name, systems={}}) => {

    const { modes } = useSelector(state => state.servers)
    const filterMode = e => {
        const current_mode = systems[e].mod_id || systems[e].mode
        return undefined === modes[current_mode] || true === modes[current_mode]
    }

    return (
        <section className="location">
            <h3>{name}</h3>
            <table className="box">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>Name</td>
                        <td>Mode</td>
                        <td>Players</td>
                        <td>Elasped time</td>
                        <td>Criminality</td>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(systems)
                            .filter(filterMode)
                            .sort((a,b) => parseInt(systems[b].players) - parseInt(systems[a].players))
                                .map((e,i) => <SystemEntry key={i} region={name} idx={i} />)}
                            </tbody>
                        </table>
                    </section>
                            )
}

export default LocationEntry
