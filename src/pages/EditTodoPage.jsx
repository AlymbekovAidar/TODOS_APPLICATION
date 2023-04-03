import React, { useContext, useEffect } from 'react';
import TodoForm from "../components/TodoForm";
import { TodosStoreContext } from "../context/todosStore/TodosStoreContext";
import {useParams} from "react-router-dom";

const EditTodoPage = () => {
  const { getTodoRequestById, editedToDo } = useContext(TodosStoreContext)

  const { id } = useParams()

  useEffect(() => {
    getTodoRequestById(id)
  }, [])

  return (
    <div>
      <TodoForm isEdit editedToDo={editedToDo}/>
    </div>
  );
};

export default EditTodoPage;