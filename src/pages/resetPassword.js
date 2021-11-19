import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/appHeader/appHeader";
import { useNavigate } from "react-router-dom";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { URL } from "../utils/utils";

export default function ResetPasswordPage() {
    const [form, setValue] = React.useState({ value: 'hh', password: ''});
    const inputRef = React.useRef(null)
    const navigate = useNavigate();
    //узнаём: авторизирован ли пользователь
    const auth = localStorage.getItem('authorization');

    //если пользователь авторизирован, то отправлять его на шаг назад
    React.useEffect(() => {if(auth) { return navigate(-1) }}, [auth, navigate])

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = React.useCallback(
        e => {
            e.preventDefault();
            fetch(`${URL}/password-reset/reset`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    "password": form.password,
                    "token": form.value
                }),
            }).then(res => {
                if (res.ok) {
                  return res.json();
                }
                return Promise.reject(res.status);
            }).then(res => {
                if (res.success) {
                    console.log(res)
                    return navigate('/login')
                }
              }).catch(err => console.log(err))
        }, [form, navigate])

    return ( 
        <div>
            <EntryForm title='Восстановление пароля' entry='Вспомнили пароль?' toEntry='Войти' linkEntry='/login' >
                <Input 
                    type={'password'}
                    onChange={e => onChange(e)}
                    placeholder={'Введите новый пароль'}
                    value={form.password}
                    name={'password'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    icon='ShowIcon'
                    />
                <Input 
                    type={'email'}
                    placeholder={'Введите код из письма'}
                    onChange={e => onChange(e)}
                    value={form.value}
                    name={'value'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    />
                <Button type="primary" size="medium" onClick={onSubmit}>
                    Сохранить
                </Button>
            </EntryForm>
        </div>
    )
}