import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { Switch } from "@mui/material";


import { TodosStoreContext } from "../../context/todosStore/TodosStoreContext";
import { UserImportantListContext } from "../../context/userImportantList/UserImportantListContext";
import { AppContext } from "../../context/app/AppContext";
import { ThemeContext } from "../../context/theme/ThemeContext";

import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";


const deleteBtnText = {
  isImportant: 'Удалить из важных',
  classic: 'Удалить'
}

const Todo = (props) => {
  const navigate = useNavigate()

  const { completeTodoRequest, deleteTodoRequest, toggleImportantTodoRequest } = useContext(TodosStoreContext)
  const { addToUserImportantList, deleteToUserImportantList } = useContext(UserImportantListContext)
  const { localStorageGetItemByKey } = useContext(AppContext)
  const { theme } = useContext(ThemeContext)

  const {
    id,
    isCompleted,
    title,
    isImportant
  } = props

  const handleIsCompleted = (event) => {
    const { checked } = event.target
    completeTodoRequest(id, checked)
  }

  const handleDeleteClick = () => {
    if(isImportant) {
      const userId = localStorageGetItemByKey('userId')

      const importantTodo = {
        id,
        isCompleted,
        title,
        isImportant: false
      }

      toggleImportantTodoRequest(id, { isImportant: false })
      deleteToUserImportantList(userId, importantTodo)

    } else {
      deleteTodoRequest(id)
    }
  }

  const handleIsImportantClick = () => {
    const userId = localStorageGetItemByKey('userId')

    const importantTodo = {
      id,
      isCompleted,
      title,
      isImportant: true
    }

    toggleImportantTodoRequest(id, { isImportant: true })
    addToUserImportantList(userId, importantTodo)
  }

  const handleEditClick = () => {
    navigate(`/edit/${id}`)
  }

  const handleMoreClick = () => {
    navigate(`/todo/${id}`)
  }

  return (
    <li className={`todo_item ${isImportant ? 'is_important_todo_item' : ''} ${theme === 'dark' && !isImportant ? 'bg_dark' : isImportant ? '' : 'bg_light'}`}>
      <div className='todo_item__header'>
        <span onClick={handleMoreClick}>{title}</span>
        <Switch
          checked={isCompleted}
          onChange={handleIsCompleted}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
      <div className='todo_item__actions'>
        <Button onClick={handleEditClick} title='Изменить' className='edit_btn'/>
        {
          !isImportant && <Button onClick={handleIsImportantClick} title='Добавить в важное' className='more_btn'/>
        }
        <Button onClick={handleDeleteClick} title={isImportant ? deleteBtnText.isImportant : deleteBtnText.classic} className='delete_btn'/>
      </div>
    </li>
  );
};

export default Todo;