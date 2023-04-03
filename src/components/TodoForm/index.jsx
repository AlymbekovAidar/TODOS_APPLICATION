import React, {useContext, useEffect, useState} from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {TodosStoreContext} from "../../context/todosStore/TodosStoreContext";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../../context/theme/ThemeContext";

const titleText = {
  create: 'Создание задачи',
  edit: 'Изменение задачи'
}

const btnText = {
  create: 'Создать',
  edit: 'Изменить'
}

const TodoForm = ({ isEdit = false, editedToDo }) => {
  const navigate = useNavigate()

  const { createTodoRequest, editTodoRequest } = useContext(TodosStoreContext)
  const { theme } = useContext(ThemeContext)

  const [todoText, setTodoText] = useState('')
  const [todoDescription, setTodoDescription] = useState('')
  const [minError, setMinError] = useState(false)

  useEffect(() => {
    if(isEdit) {
      setTodoText(editedToDo.title)
      setTodoDescription(editedToDo.description)
    }
  }, [editedToDo])

  const handleTitleChange = (event) => {
    setTodoText(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setTodoDescription(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if(todoText.length <= 3) {
      setMinError(true)
      return
    }

    setMinError(false)

    if(isEdit) {
      const editedTodoInfo = {
        title: todoText,
        description: todoDescription
      }

      editTodoRequest(editedTodoInfo, editedToDo.id, () => {
        navigate('/list')
      })
    } else {
      const newTodo = {
        isCompleted: false,
        title: todoText,
        description: todoDescription,
        isImportant: false
      }

      createTodoRequest(newTodo, () => {
        setTodoText('')
      })
    }
  }

  return (
      <form onSubmit={handleSubmit} className={`todo_form ${theme === 'dark' ? 'bg_dark' : 'bg_light'}`}>
        <h1>{isEdit ? titleText.edit : titleText.create}</h1>

        <Input
          placeholder='Напишите задание'
          type='text'
          onChange={handleTitleChange}
          className='todo_add_input'
          value={todoText}
        />
        <Input
          placeholder='Напишите описание'
          type='text'
          onChange={handleDescriptionChange}
          className='todo_add_input'
          value={todoDescription}
        />
        {
          minError && <span style={{ color: 'red' }}>Минимально 4 символа</span>
        }
        <Button
          title={isEdit ? btnText.edit : btnText.create}
          className='todo_add_btn'
          type='submit'
        />
      </form>
  );
};

export default TodoForm;