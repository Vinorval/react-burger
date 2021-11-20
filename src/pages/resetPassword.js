import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from "react-router-dom";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/actions/auth";

export default function ResetPasswordPage() {
    const dispatch = useDispatch();
    const [form, setValue] = React.useState({ value: '', password: ''});
    const inputRef = React.useRef(null)
    const navigate = useNavigate();
    //узнаём: авторизирован ли пользователь
    const auth = localStorage.getItem('authorization');
    console.log(navigate(-1))

    //если пользователь авторизирован, то отправлять его на шаг назад
    React.useEffect(() => {if(auth) { return navigate(-1) }}, [auth, navigate])

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = React.useCallback(
        e => {
            e.preventDefault();
            dispatch(resetPassword( {password: form.password, value: form.value} ))
            navigate('/login')
        }, [form, navigate, dispatch])

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