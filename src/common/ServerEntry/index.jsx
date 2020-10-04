import React from 'react'
import SystemEntry from 'common/SystemEntry'


export const ServerEntry = ({
    location,
    address,
    current_players,
    modding,
    usage,
    systems,
}) => (
    <>
        <div>{location}</div>
        <div>{systems.map((e,i) => <SystemEntry key={i} {...e} address={address} />)}</div>
    </>
)

export default ServerEntry
