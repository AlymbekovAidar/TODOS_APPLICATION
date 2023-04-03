import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

import Button from "../UI/Button/Button";
import { AuthContext } from "../../context/auth/AuthContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import {ThemeContext} from "../../context/theme/ThemeContext";

const navList = [
  {
    title: 'Список задач',
    href: 'list'
  },
  {
    title: 'Добавить задачу',
    href: 'create'
  }
]

const btnText = {
  login: 'Войти',
  logOut: 'Выйти'
}

const Header = () => {
  const navigate = useNavigate()
  const { logOut, isAuth } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)

  const handleClick = () => {
    if(isAuth) {
      logOut()
    } else {
      navigate('/auth')
    }
  }

  const goToImportantTodos = () => {
    navigate('/important-list')
  }

  const handleThemeMode = () => {
    toggleTheme()
  }

  return (
    <div className={`header ${theme === 'dark' ? 'bg_dark' : 'bg_light'}`}>
      {
        isAuth && (
          <ul className='nav_list'>
            {
              navList.map(navItem => {
                const { title, href } = navItem

                return (
                  <li
                    key={title + href}
                  >
                    <Link
                      to={href}
                    >
                      {title}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        )
      }
      <div>
        <h1>
          <span>
            ToDo Application
          </span>
          <span onClick={handleThemeMode}>
            {
              theme === 'dark' ? <MdLightMode /> : <MdDarkMode />
            }
          </span>
        </h1>
      </div>
      <div>
        {
          isAuth && (
            <div onClick={goToImportantTodos}>
              <AiFillHeart />
              <span>Важное</span>
            </div>
          )
        }
        <span>
          <Button onClick={handleClick} title={isAuth ? btnText.logOut : btnText.login} to='auth' />
        </span>
      </div>
    </div>
  );
};

export default Header;