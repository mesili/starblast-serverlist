export const getServers = async () => {
    const simstatus = 'https://starblast.io/simstatus.json'
    return await fetch(simstatus).then(r => r.json())
}

export const groupByLocation = servers => {
    const locations = {} 
    servers.forEach(e => {
        const loc = e.location.toLowerCase()
        if (!locations[loc]) locations[loc] = []
        locations[loc] = locations[loc].concat(e.systems)
    })
    return locations
}


