import React, { useContext, useEffect } from 'react';
import { TodosStoreContext } from "../../context/todosStore/TodosStoreContext";
import Todo from "../Todo";
import {UserImportantListContext} from "../../context/userImportantList/UserImportantListContext";
import {AppContext} from "../../context/app/AppContext";
import {ThemeContext} from "../../context/theme/ThemeContext";

const TodoList = () => {
  const { todoList, getTodosRequest } = useContext(TodosStoreContext)
  const { getUserImportantList } = useContext(UserImportantListContext)
  const { localStorageGetItemByKey } = useContext(AppContext)
  const { theme } = useContext(ThemeContext)


  useEffect(() => {
    const userId = localStorageGetItemByKey('userId')

    getTodosRequest()
    getUserImportantList(userId)
  }, [])

  return (
    <div className='todo_list_wrapper'>
      <h1 className={`todo_list_title ${theme === 'dark' ? 'bg_dark' : 'bg_light'}`}>Список задач</h1>
      <ul className='todo_list'>
        {
          todoList?.length ? todoList.map(todo => {
            const { title, id, isCompleted, isImportant } = todo

            return (
              <Todo key={id} id={id} title={title} isCompleted={isCompleted} isImportant={isImportant} />
            )
          }) : <div>Задач нету!</div>
        }
      </ul>
    </div>
  );
};

export default TodoList;