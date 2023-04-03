import React, {useContext, useReducer} from 'react';
import { AuthContext } from "./AuthContext";
import axios from "axios";
import {implementErrorDispatch, implementSuccessDispatch} from "../../helpers/dispatchActionHelpers";
import {AppContext} from "../app/AppContext";

const API_URL = 'http://localhost:8000'
const API = 'users'

const LOGIN = 'login'
const REGISTER = 'register'
const IS_AUTH = 'IS_AUTH'
const REQUEST_ERROR = 'REQUEST_ERROR'


const TOKEN_FIELD = 'token'
const USER_ID_FIELD = 'userId'


const initialState = {
  user: {},
  error: {},
  isAuth: !!localStorage.getItem('token')
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        user: action.payload
      }
    }
    case REQUEST_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case IS_AUTH: {
      return {
        ...state,
        isAuth: action.payload
      }
    }
    default: {
      return state
    }
  }
}

const AuthProvider = ({ children }) => {
  const { localStorageSetItem, localStorageRemoveAll } = useContext(AppContext)
  const [userState, dispatch] = useReducer(reducer, initialState)

  const registerRequest = async (newUser, onSuccess) => {
    try {
      const { data } = await axios.post(`${API_URL}/${REGISTER}`, newUser)
      implementSuccessDispatch(dispatch, REGISTER, data.user)

      localStorageSetItem(TOKEN_FIELD, data.accessToken)
      localStorageSetItem(USER_ID_FIELD, data.user.id)

      implementSuccessDispatch(dispatch, IS_AUTH, true)
      onSuccess()
    } catch (error) {
      implementErrorDispatch(dispatch, REQUEST_ERROR, error)
    }
  }

  const loginRequest = async (userCredentials, onSuccess) => {
    try {
      const { data } = await axios.post(`${API_URL}/${LOGIN}`, userCredentials)
      implementSuccessDispatch(dispatch, LOGIN, data.user)

      localStorageSetItem(TOKEN_FIELD, data.accessToken)
      localStorageSetItem(USER_ID_FIELD, data.user.id)

      implementSuccessDispatch(dispatch, IS_AUTH, true)

      onSuccess()
    } catch (error) {
      implementErrorDispatch(dispatch, REQUEST_ERROR, error)
    }
  }

  const logOut = () => {
    localStorageRemoveAll()
    implementSuccessDispatch(dispatch, IS_AUTH, false)
  }

  const defaultValue = {
    registerRequest,
    loginRequest,
    logOut,
    user: userState.user,
    isAuth: userState.isAuth
  }

  return (
    <AuthContext.Provider value={defaultValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;