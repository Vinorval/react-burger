import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/appHeader/appHeader";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
    let navigate = useNavigate();
    //узнаём: авторизирован ли пользователь
    let auth = localStorage.getItem('authorization');

    //если пользователь авторизирован, то отправлять его на шаг назад
    React.useEffect(() => {if(auth) { return navigate(-1) }}, [auth, navigate])

    const [password, setPassword] = React.useState('');
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef(null)

    return ( 
        <div>
            <AppHeader />
            <EntryForm title='Восстановление пароля' button='Сохранить' entry='Вспомнили пароль?' toEntry='Войти' linkEntry='/login' >
                <Input 
                    type={'password'}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={'Введите новый пароль'}
                    value={password}
                    name={'password'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    icon='ShowIcon'
                    />
                <Input 
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setValue(e.target.value)}
                    value={value}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    />
            </EntryForm>
        </div>
    )
}