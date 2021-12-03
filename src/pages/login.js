import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { login } from "../services/actions/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    //узнаем: авторизирован ли пользователь
    const auth = localStorage.getItem('authorization');

      //если пользователь зарегистрирован, 
      React.useEffect(() => {if(auth) { return navigate(-1) }}, [auth, navigate])

    return ( 
            <EntryForm 
                title='Вход' 
                inputs={[{ type: 'email', placeholder: 'E-mail', name: 'email' }, { type: 'password', placeholder: 'Пароль', icon: 'ShowIcon', name: 'password' }]}
                enty={{ link: '/register', text: 'Зарегистрироваться', title: 'Вы — новый пользователь?' }}
                password={{ link: '/forgot-password', text: 'Восстановить пароль', title: 'Забыли пароль?' }}
                entry={login}
                button='Войти'
            >
            </EntryForm>
    )
}