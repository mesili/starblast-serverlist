import actionCreator from "helpers/actionCreator"

export const constants = {
    SET:"servers/set",
    FILTER_REGIONS:"servers/filterRegions",
    FILTER_MODES:"servers/filterModes",
    TICK:"servers/tick",
}

export const actions = {
    set: payload => actionCreator(constants.SET, payload),
    region: payload => actionCreator(constants.FILTER_REGIONS, payload),
    mode: payload => actionCreator(constants.FILTER_MODES, payload),
    tick: payload => actionCreator(constants.TICK, null),
}

const defaultState = {
    locations:[],
    regions:{
        'america':true,
        'europe':true,
        'brazil':true,
        'asia':true,
    },
    modes:{
        'team':true, 
        'survival':true,
        'deathmatch':true,
        'invasion':true,
    },
}

export const servers = (state = defaultState, {type, payload}) => {

    const reducers = {

        [constants.SET]: () => {
            const modes = { ...state.modes }
            const regions = Object.keys(payload)
            /* Populating modes with available ones */
            regions.forEach(e => {
                const systems = payload[e] || []
                systems.forEach(b => {
                    const actual_mode = b.mod_id || b.mode
                    if (modes[actual_mode] === undefined) 
                        modes[actual_mode] = true
                })
            })

            return {
                ...state,
                locations: payload,
                modes
            }
        },
        [constants.FILTER_REGIONS]: () => {
            const regions = { ...state.regions }
            regions[payload.name] = payload.value
            return { ...state, regions }
        },

        [constants.FILTER_MODES]: () => {
            const modes = { ...state.modes }
            modes[payload.name] = payload.value
            return { ...state, modes }
        },

        [constants.TICK]: () => {
            const locations = { ...state.locations }
            const locKeys = Object.keys(locations)
            const newLocations = locKeys.forEach(e => {
                locations[e] = locations[e].map(s => ({...s, time: s.time+1})
                )
            })
            return { ...state, locations: locations }
        },

    }

    if (reducers[type]) {
        return reducers[type]()
    }

    return state
}

