import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";

import NotFoundPage from "./pages/NotFoundPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import EditTodoPage from "./pages/EditTodoPage";
import TodoListPage from "./pages/TodoListPage";
import TodoInfoPage from "./pages/TodoInfoPage";
import AuthPage from "./pages/AuthPage";
import ImportantTodosPage from "./pages/ImportantTodosPage";

import MainLayouts from "./layouts/MainLayouts";
import {AuthContext} from "./context/auth/AuthContext";
import {ThemeContext} from "./context/theme/ThemeContext";


const App = () => {
    const navigate = useNavigate()

    const { isAuth } = useContext(AuthContext)
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
      if(!isAuth) {
        navigate('/auth')
      }
    }, [isAuth])

    return (
      <div className={`app ${theme}`}>
        <Routes>
          <Route element={<MainLayouts />}>
            <Route path='/create' element={<CreateTodoPage />}/>
            <Route index path='/list' element={<TodoListPage />}/>
            <Route path='/todo/:id' element={<TodoInfoPage />}/>
            <Route path='/edit/:id' element={<EditTodoPage />}/>
            <Route path='/auth' element={<AuthPage />}/>
            <Route path='/important-list' element={<ImportantTodosPage />}/>
            <Route path='/*' element={<NotFoundPage />}/>
          </Route>
        </Routes>
      </div>
    );
};

export default App;