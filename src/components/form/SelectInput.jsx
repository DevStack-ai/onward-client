import React from 'react'



function Select({ value, setValue, name, options, placeholder = "", ...args }) {



    return (
        <select
            {...args}
            value={value}
            onChange={(ev) => {
                setValue(name, ev.target.value)
            }}
            className='form-control form-control-solid'
            placeholder={placeholder}>
            <option value="">Seleccione una opcion</option>
            {options.map((option, key) => {
                return (
                    <option key={key} value={option}>{option}</option>
                )
            })}
        </select>
    )
}

export default Select