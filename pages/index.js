import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logoImg from '../public/codeleap-logo.png';
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
const Logo = styled.div`
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

export default function Home() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementsByClassName("logo")[0].style.display="none";
      document.getElementsByClassName("form")[0].style.display="block";
      document.getElementsByClassName("container")[0].style.backgroundColor="#DDDDDD";
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
    <Container className="container">
      <Logo className="logo">
        <Image
          src={logoImg}
          alt="codeleap logo"
          width={300}
          height={80}
        />
      </Logo>

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

    </Container>
  )
}
