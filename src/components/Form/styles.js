import styled from 'styled-components';

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

export { FormContainer, Formgroup }