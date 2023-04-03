import React, {useContext, useState} from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { AuthContext } from "../../context/auth/AuthContext";
import {useNavigate} from "react-router-dom";

const titleText = {
  login: 'Авторизация',
  register: 'Регистрация'
}

const btnText = {
  login: 'Войти',
  register: 'Зарегистрироваться'
}

const AuthForm = () => {
  const navigate = useNavigate()
  const { registerRequest, loginRequest } = useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleEmail = (event) => {
    const { value } = event.target
    setEmail(value)
  }

  const handlePassword = (event) => {
    const { value } = event.target
    setPassword(value)
  }

  const toggleIsLogin = () => setIsLogin(prev => !prev)

  const handleSubmit = (event) => {
    event.preventDefault()

    const userInfo = {
      email,
      password,
      userImportantList: [],
      todos: []
    }

    if(isLogin) {
      loginRequest(userInfo, () => {
        navigate('/list')
      })
    } else {
      registerRequest(userInfo, () => {
        navigate('/list')
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className='auth_form'>
      <h1>{isLogin ? titleText.login : titleText.register}</h1>
      <Input value={email} placeholder='Email' onChange={handleEmail}/>
      <Input value={password} type='password' placeholder='Password' onChange={handlePassword}/>
      <Button type='submit' title={isLogin ? btnText.login : btnText.register}/>
      <Button title='Авторизация / Регистрация' onClick={toggleIsLogin} />
    </form>
  );
};

export default AuthForm;