import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/appHeader/appHeader";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/utils";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ForgotPasswordPage() {
    const [email, setEmail] = React.useState('');
    const inputRef = React.useRef(null)
    let navigate = useNavigate();
    //узнаем авторизован ли пользователь
    let auth = localStorage.getItem('authorization');

    //если пользователь авторизован отправляем его на шаг назад
    React.useEffect(() => {if(auth) { return navigate(-1) }}, [auth, navigate])

    const onSubmit = React.useCallback(
        e => {
            e.preventDefault();
            fetch(`${URL}/password-reset`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    "email": email, 
                }),
            }).then(res => {
                if (res.ok) {
                  return res.json();
                }
                return Promise.reject(res.status);
            }).then(res => {
                if (res.success) {
                    console.log(res)
                    return navigate('/reset-password')
                }
              }).catch(err => console.log(err))
        }, [email, navigate])

    return ( 
        <div>
            <AppHeader />
            <EntryForm title='Восстановление пароля' entry='Вспомнили пароль?' toEntry='Войти' linkEntry='/login' >
                <Input 
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    />
                <Button type="primary" size="medium" onClick={onSubmit}>
                    Восстановить
                </Button>
            </EntryForm>
        </div>
    )
}