import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import App from './App';

import TodosStoreProvider from "./context/todosStore/TodosStoreProvider";
import ThemeProvider from "./context/theme/ThemeProvider";
import AppProvider from "./context/app/AppProvider";

import './index.css';
import AuthProvider from "./context/auth/AuthProvider";
import UserImportantListProvider from "./context/userImportantList/UserImportantListProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <UserImportantListProvider>
            <TodosStoreProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </TodosStoreProvider>
          </UserImportantListProvider>
        </AuthProvider>
      </AppProvider>
      <ToastContainer />
    </BrowserRouter>
);

