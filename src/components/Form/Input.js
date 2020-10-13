import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Input({ name, ...rest }) {
    const inputRef = useRef(null);
    const  { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField ({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
        
    }, [fieldName, registerField]);
    
    return (
        <div>

            { error && <span style={{ color: '#72DF00', fontSize: '18px'}}>{error} <br></br></span> }
            <input ref={inputRef} defaultValue={defaultValue} {...rest}/>

        </div>
    );
}