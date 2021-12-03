import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { register } from "../services/actions/auth";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    //узнаём: зарегистрирован ли пользователь
    const auth = localStorage.getItem('authorization');

    //если пользователь зарегестрирова, отправляем его на шаг назад
    React.useEffect(() => {if(auth) { return navigate(-1) }}, [auth, navigate])

    return ( 
        <div>
            <EntryForm
                title='Регистрация'
                inputs={[
                    { type: 'text', placeholder: 'Имя', name: 'name' },
                    { type: 'email', placeholder: 'E-mail', name: 'email' },
                    { type: 'password', placeholder: 'Пароль', icon: 'ShowIcon', name: 'password' }
                ]}
                enty={{ link: '/login', text: 'Войти', title: 'Уже зарегистрированы?' }}
                entry={register}
                button='Зарегистрироваться'
                >
            </EntryForm>
        </div>
    )
}