import React from 'react'
import { useSelector } from 'react-redux'


export const SystemEntry = ({
    region,
    idx,
}) => {

    const system = useSelector(state => state.servers.locations[region][idx])
    const { id,
        name,
        time,
        mode,
        mod_id,
        players,
        criminal_activity,
    } = system

    const minutes = Math.floor(time / 60)
    const seconds = time - (minutes * 60)

    /* Coloring the criminality level */
    const rgb = [
        255, 
        255 - criminal_activity * 42,
        255 - criminal_activity * 42,
    ]
    const criminalStyle = {
        color: `rgb(${rgb[0]}, ${rgb[1] < 0 ? 0 : rgb[1]}, ${rgb[2] < 0 ? 0 : rgb[2]})`
    }

    return (
        <tr>
            <td>
                <a href={`https://starblast.io/#${id}`} target="_blank" rel="noopener noreferrer">{id}</a>
            </td>
            <td>
                <a href={`https://starblast.io/#${id}`} target="_blank" rel="noopener noreferrer">{name}</a>
            </td>
            <td>{mod_id ? `mod: ${mod_id}` : mode}</td>
            <td>{players}</td>
            <td>
                {minutes.toString().padStart(2, '0')}
                :
                {seconds.toString().padStart(2, '0')}
            </td>
            <td style={criminalStyle}>{criminal_activity}</td>
        </tr>
    )
}

export default SystemEntry
