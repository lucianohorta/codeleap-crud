import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    height: 100vh;
    padding: 5%;
    margin: 0;
`
const LogoImg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all .3s ease-out;
`
const FormContainer = styled.div`
    display: none;
    background: white;
    padding: 28px 50px;
    width: 500px;
    height: 250px;

    form {
        position: relative;
    }

    button {
        position: absolute;
        right: 0;
        background: black;
        border: 0;
        border-radius: 0;
        font-weight: bold;
        padding: 7px 30px;
    }
`

const Formgroup = styled.div`
    margin: 30px 0 22px 0;

    label {
        margin-bottom: 7px;
    }
`

export { Container, LogoImg, FormContainer, Formgroup };
