import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverFilter } from 'state/serversSlice'

export const Filter = ({field, name, label, value, action}) => {

    const dispatch = useDispatch()
    const filter = (field, name, value) => dispatch(serverFilter({field, name, value}))

    return (
        <div>
            <input 
                id={name}
                type={"checkbox"}
                name={"filters[]"}
                onChange={()=> filter(field, name, !value)} 
                checked={value}
            />
            <label htmlFor={name}>{label || name}</label>
        </div>
    )
}


export default Filter;
