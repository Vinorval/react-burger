import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/actions/auth";

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    //узнаём: авторизирован ли пользователь
    const auth = localStorage.getItem('authorization');
    //console.log(navigate(-1))

    //если пользователь авторизирован, то отправлять его на шаг назад
    React.useEffect(() => {if(auth) { return navigate(-1) }}, [auth, navigate])

    return ( 
        <div>
            <EntryForm
                title='Восстановление пароля' 
                inputs={[
                    { type: 'password', placeholder: 'Пароль', icon: 'ShowIcon', name: 'password' },
                    { type: 'text', placeholder: 'Введите код из письма', name: 'value' }
                ]}
                enty={{ link: '/login', text: 'Войти', title: 'Вспомнили пароль?' }}
                entry={resetPassword}
                button='Сохранить'
                toResetPassword={() => { return navigate('/login') }}
                >
            </EntryForm>
        </div>
    )
}