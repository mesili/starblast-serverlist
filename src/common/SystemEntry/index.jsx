import React, { useEffect, useState } from 'react'


export const SystemEntry = ({
    id,
    name,
    time,
    mode,
    mod_id,
    address,
    players,
    criminal_activity,
}) => {

    const [elaspedTime, updateTime] = useState(time)


    /* Time is fixed, let's make it more alive */
    useEffect(() => {
        const timer = setInterval(()=> updateTime(elaspedTime + 1),1000)
        return () => clearInterval(timer)
    }, [elaspedTime])

    const minutes = Math.floor(elaspedTime / 60)
    const seconds = elaspedTime - (minutes * 60)

    /* Coloring the criminality level */
    const rgb = [
        255, 
        255 - criminal_activity * 20,
        255 - criminal_activity * 20,
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
