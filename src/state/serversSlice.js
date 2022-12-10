import { createSlice } from '@reduxjs/toolkit'
import { getServers } from 'helpers/servers'

const initialState = {
    loading:false,
    error:null,
    locations:{},
    regions:{},
    modes:{},
    mods: {},
}

const servers = createSlice({
    name: 'servers',
    initialState,
    reducers: {
        getServersStart(state) {
            state.loading = true
            state.error = null
        },
        getServersSuccess(state, action) {
            const { locations } = action.payload
            const locKeys = Object.keys(locations)
            const newLocations = {}
            locKeys.forEach(e => {
                state.regions[e] = state.regions[e] === false ? false : true;
                newLocations[e] = (locations[e] || [])
                    .sort((a,b) => b.players - a.players)
                    .map(b => {
                        const actual_mode = b.mod_id || b.mode
                        if (b.mod_id && !state.mods[b.mod_id]) {
                            state.mods[b.mod_id] = true;
                        }
                        if (state.modes[actual_mode] === undefined) {
                            state.modes[actual_mode] = true
                        }
                        return b
                    })
            })
            state.locations = newLocations
            state.loading = false
            state.error = null
        },
        getServersFailure(state, action) {
            state.loading = false
            state.error = action.payload
        },
        tick(state) {
            const locKeys = Object.keys(state.locations)
            locKeys.forEach(e => {
                state.locations[e] = state.locations[e].map(s => ({...s, time: s.time+1}))
            })
        },
        filterField(state, action) {
            const { field, name, value } = action.payload
            state[field][name] = value
        }
    }
})

const {
    getServersStart,
    getServersSuccess,
    getServersFailure,
    filterField,
    tick,
} = servers.actions

export default servers.reducer

export const fetchServers = () => async dispatch => {
    try {
        dispatch(getServersStart())
        const locations = await getServers()
        dispatch(getServersSuccess({ locations }))
    } catch (err) {
        dispatch(getServersFailure(err.message))
        console.error(err)
    }
}

export const tickLocations = () => dispatch => dispatch(tick())

export const serverFilter = (field, key, value) => dispatch => dispatch(filterField(field, key, value))
