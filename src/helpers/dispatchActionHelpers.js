import { toast } from 'react-toastify';

export const implementSuccessDispatch = (dispatch, type, payload, toastText = 'Действие успешно выполнено') => {

  const action = {
    type,
    payload
  }

  dispatch(action)

  toast.success(toastText, {
    autoClose: 700
  })
}


export const implementErrorDispatch = (dispatch, type, payload, toastText = 'Не предвиденная ошибка! Попробуйте еще раз') => {

  const action = {
    type,
    payload
  }

  dispatch(action)

  toast.error(toastText, {
    autoClose: 1500
  })
}