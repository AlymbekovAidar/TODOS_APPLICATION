import React, { useReducer } from 'react';
import { UserImportantListContext } from "./UserImportantListContext";
import axios from "axios";
import { implementErrorDispatch, implementSuccessDispatch } from "../../helpers/dispatchActionHelpers";

const API_URL = 'http://localhost:8000'

const USERS = 'users'

const GET_USER_IMPORTANT_LIST = 'GET_USER_IMPORTANT_LIST'
const ADD_TO_IMPORTANT_LIST = 'ADD_TO_IMPORTANT_LIST'
const REQUEST_ERROR = 'REQUEST_ERROR'

const initialState = {
  userImportantList: [],
  error: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_IMPORTANT_LIST: {
      return {
        ...state,
        userImportantList: action.payload
      }
    }
    case ADD_TO_IMPORTANT_LIST: {
      return {
        ...state,
        userImportantList: action.payload
      }
    }
    case REQUEST_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    default: {
      return state
    }
  }
}

const UserImportantListProvider = ({ children }) => {
  const [userImportantState, dispatch] = useReducer(reducer, initialState)

  const getUserImportantList = async (userId) => {
    try {
      const { data } = await axios(`${API_URL}/${USERS}/${userId}`)

      implementSuccessDispatch(dispatch, GET_USER_IMPORTANT_LIST, data.userImportantList)
    } catch (error) {
      implementErrorDispatch(dispatch, REQUEST_ERROR, error)
    }
  }

  const addToUserImportantList = async (userId, todo) => {
    try {
      const { data } = await axios.patch(`${API_URL}/${USERS}/${userId}`, { userImportantList: [...userImportantState.userImportantList, todo] });
      implementSuccessDispatch(dispatch, ADD_TO_IMPORTANT_LIST, data.userImportantList)
    } catch (error) {
      implementErrorDispatch(dispatch, REQUEST_ERROR, error)
    }
  };

  const deleteToUserImportantList = async (userId, todo) => {
    try {
      const { data } = await axios.patch(`${API_URL}/${USERS}/${userId}`, { userImportantList: userImportantState.userImportantList.filter(impTodo => impTodo.id != todo.id) });
      implementSuccessDispatch(dispatch, ADD_TO_IMPORTANT_LIST, data.userImportantList)
    } catch (error) {
      implementErrorDispatch(dispatch, REQUEST_ERROR, error)
    }
  };


  const defaultValue = {
    getUserImportantList,
    addToUserImportantList,
    deleteToUserImportantList,
    userImportantList: userImportantState.userImportantList
  }

  return (
    <UserImportantListContext.Provider value={defaultValue}>
      {children}
    </UserImportantListContext.Provider>
  );
};

export default UserImportantListProvider;