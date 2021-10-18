import React, { useState } from 'react';
import { FormContainer, Formgroup } from '../Form/styles';

export default function Form() {
    
    const [value, setValue] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        window.location.href = "/posts";
    };

    const onChange = event => {
        localStorage.setItem('name', event.target.value);
        setValue(event.target.value);
    };

    return (
        <FormContainer className="form">

                <h5>Welcome to CodeLeap network!</h5>

                <form onSubmit={onSubmit}>
                    <Formgroup className="form-group">
                        <label>Please enter your username</label>
                        <input 
                            type="text" 
                            className="form-control" required 
                            value={value}
                            onChange={onChange}
                            placeholder="John doe"
                        />
                    </Formgroup>

                <button type="submit" className="btn btn-primary btn-block">ENTER</button>

                </form>
            </FormContainer>

    )
}
