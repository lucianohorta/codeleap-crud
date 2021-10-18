import React, { useEffect } from 'react';
import { Container } from '../styles/globals';
import Logo from '../src/components/Logo';
import Form from '../src/components/Form';

export default function Login() {
    useEffect(() => {      // Splash screen:
        const timer = setTimeout(() => {
            document.getElementsByClassName("logo")[0].style.display="none";
            document.getElementsByClassName("form")[0].style.display="block";
            document.getElementsByClassName("container")[0].style.backgroundColor="#DDDDDD";
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Container className="container">
            <Logo />
            <Form />
        </Container>
    )
}
