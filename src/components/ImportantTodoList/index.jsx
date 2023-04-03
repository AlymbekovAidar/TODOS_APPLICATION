import React, {useContext, useEffect} from 'react';

import Todo from "../Todo";

import { UserImportantListContext } from "../../context/userImportantList/UserImportantListContext";
import { AppContext } from "../../context/app/AppContext";


const ImportantTodoList = () => {
  const { localStorageGetItemByKey } = useContext(AppContext)
  const { getUserImportantList, userImportantList } = useContext(UserImportantListContext)

  useEffect(() => {
    const userId = localStorageGetItemByKey('userId')

    if (!!userId) {
      getUserImportantList(userId)
    }
  }, [])

console.log(userImportantList)

  return (
    <div className='todo_list_wrapper'>
      <h1 className='todo_list_title'>Важные задачи</h1>
      <ul className='todo_list'>
        {
          userImportantList?.length ? userImportantList.map(todo => {
            const { title, id, isCompleted, isImportant } = todo

            return (
              <Todo key={id} id={id} title={title} isCompleted={isCompleted} isImportant={isImportant}/>
            )
          }) : <div style={{ color: 'black' }}>Важных задач нету!</div>
        }
      </ul>
    </div>
  )
};

export default ImportantTodoList;