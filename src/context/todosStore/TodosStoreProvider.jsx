import React, { useReducer } from 'react';
import axios from "axios";

import { TodosStoreContext } from "./TodosStoreContext";
import {implementErrorDispatch, implementSuccessDispatch} from "../../helpers/dispatchActionHelpers";

const API_URL = 'http://localhost:8000'
const TODOS_API = 'todos'
const USERS_API = 'users'

const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS'
const REQUEST_ERROR = 'REQUEST_ERROR'

const GET_TODOS = 'GET_TODOS'
const GET_TODO_BY_ID = 'GET_TODO_BY_ID'
const DELETE_TODO = 'DELETE_TODO'
const EDIT_TODO = 'EDIT_TODO'
const COMPLETE_TODO = 'COMPLETE_TODO'
const IMPORTANT_TODO = 'IMPORTANT_TODO'

const initialState = {
    todos: [],
    editedToDo: {},
    error: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TODO_SUCCESS: {
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        }
        case GET_TODOS: {
            return {
                ...state,
                todos: action.payload
            }
        }
        case GET_TODO_BY_ID: {
            return {
                ...state,
                editedToDo: action.payload
            }
        }
        case DELETE_TODO: {
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id != action.payload)
            }
        }
        case EDIT_TODO: {
            return {
                ...state,
                todos: state.todos.map(todo => todo.id == action.payload.id ? action.payload.id : todo)
            }
        }
        case COMPLETE_TODO: {
            return {
                ...state,
                todos: state.todos.map(todo => todo.id == action.payload ? { ...todo, isCompleted: !todo.isCompleted } : todo)
            }
        }
        case IMPORTANT_TODO: {
            return {
                ...state,
                todos: state.todos.map(todo => todo.id == action.payload ? { ...todo, isImportant: !todo.isImportant } : todo)
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

const TodosStoreProvider = ({ children }) => {
    const [todosState, todosDispatch] = useReducer(reducer, initialState)

    const createTodoRequest = async (todo, onSuccess) => {
        try {
            const { data } = await axios.post(`${API_URL}/${TODOS_API}`, todo)
            implementSuccessDispatch(todosDispatch, CREATE_TODO_SUCCESS, data)

            onSuccess()
        } catch (error) {
            implementErrorDispatch(todosDispatch, REQUEST_ERROR, error)
        }

    }

    const getTodosRequest = async () => {
        try {
            const { data } = await axios(`${API_URL}/${TODOS_API}`)
            implementSuccessDispatch(todosDispatch, GET_TODOS, data)
        } catch (error) {
            implementErrorDispatch(todosDispatch, REQUEST_ERROR, error)
        }

    }

    const getTodoRequestById = async (id) => {
        try {
            const { data } = await axios(`${API_URL}/${TODOS_API}/${id}`)
            implementSuccessDispatch(todosDispatch, GET_TODO_BY_ID, data)
        } catch (error) {
            implementErrorDispatch(todosDispatch, REQUEST_ERROR, error)
        }

    }

    const deleteTodoRequest = async (id) => {
        try {
            await axios.delete(`${API_URL}/${TODOS_API}/${id}`)
            implementSuccessDispatch(todosDispatch, DELETE_TODO, id)
        } catch (error) {
            implementErrorDispatch(todosDispatch, REQUEST_ERROR, error)
        }
    }

    const editTodoRequest = async (editedTodo, id, onSuccess) => {
        try {
            const { data } = await axios.patch(`${API_URL}/${TODOS_API}/${id}`, editedTodo)
            implementSuccessDispatch(todosDispatch, EDIT_TODO, data)

            onSuccess()
        } catch (error) {
            implementErrorDispatch(todosDispatch, REQUEST_ERROR, error)
        }
    }

    const completeTodoRequest = async (id, isCompleted) => {
        try {
            await axios.patch(`${API_URL}/${TODOS_API}/${id}`, { isCompleted })
            implementSuccessDispatch(todosDispatch, COMPLETE_TODO, id)
        } catch (error) {
            implementErrorDispatch(todosDispatch, REQUEST_ERROR, error)
        }
    }

    const toggleImportantTodoRequest = async (id, isImportant) => {
        try {
            await axios.patch(`${API_URL}/${TODOS_API}/${id}`, isImportant)
            implementSuccessDispatch(todosDispatch, IMPORTANT_TODO, id)
        } catch (error) {
            implementErrorDispatch(todosDispatch, REQUEST_ERROR, error)
        }
    }

    const defaultValue = {
        todoList: todosState.todos,
        editedToDo: todosState.editedToDo,
        createTodoRequest,
        getTodosRequest,
        getTodoRequestById,
        deleteTodoRequest,
        editTodoRequest,
        completeTodoRequest,
        toggleImportantTodoRequest
    }

    return (
        <TodosStoreContext.Provider value={defaultValue}>
            {children}
        </TodosStoreContext.Provider>
    );
};

export default TodosStoreProvider;