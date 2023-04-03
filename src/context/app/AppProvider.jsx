import React from 'react';
import { AppContext } from "./AppContext";


const AppProvider = ({ children }) => {

  const localStorageSetItem = (key, value) => {
    localStorage.setItem(key, value)
  }

  const localStorageGetItemByKey = (key) => {
    return localStorage.getItem(key)
  }

  const localStorageRemoveItemByKey = (key) => {
    localStorage.removeItem(key)
  }

  const localStorageRemoveAll = () => {
    localStorage.clear()
  }

  const defaultValue = {
    localStorageSetItem,
    localStorageGetItemByKey,
    localStorageRemoveItemByKey,
    localStorageRemoveAll
  }

  return (
    <AppContext.Provider value={defaultValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;