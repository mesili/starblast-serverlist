import actionCreator from "helpers/actionCreator"

export const constants = {
    SET:"servers/set",
    FILTER_REGIONS:"servers/filterRegions",
    FILTER_MODES:"servers/filterModes",
}

export const actions = {
    set: payload => actionCreator(constants.SET, payload),
    region: payload => actionCreator(constants.FILTER_REGIONS, payload),
    mode: payload => actionCreator(constants.FILTER_MODES, payload),
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
            const { modes } = state
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
                modes,
            }
        },
        [constants.FILTER_REGIONS]: () => {
            const { regions } = state
            regions[payload.name] = payload.value
            return { ...state, regions }
        },

        [constants.FILTER_MODES]: () => {
            const { modes } = state
            modes[payload.name] = payload.value
            return { ...state, modes }
        },

    }

    if (reducers[type]) {
        return reducers[type]()
    }

    return state
}

