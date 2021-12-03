import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/actions/auth";
import { useSelector, RootStateOrAny } from "react-redux";

export default function ForgotPasswordPage() {
    const toForgotPassword = useSelector((store: RootStateOrAny) => ({ toForgotPassword: store.auth.toForgotPassword }) )
    const navigate = useNavigate();
    //узнаем авторизован ли пользователь
    const auth = localStorage.getItem('authorization');

    //если пользователь авторизован отправляем его на шаг назад
    React.useEffect(() => {if(auth) { return navigate(-1) }}, [auth, navigate])

    return ( 
        <div>
            <EntryForm
                title='Восстановление пароля' 
                inputs={[{ type: 'email', placeholder: 'Укажите e-mail', name: 'email' }]}
                enty={{ link: '/login', text: 'Войти', title: 'Вспомнили пароль?' }}
                entry={forgotPassword}
                toResetPassword={() => { if(toForgotPassword) return navigate('/reset-password') }}
                button='Восстановить' >
            </EntryForm>
        </div>
    )
}