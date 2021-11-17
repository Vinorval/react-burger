import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/appHeader/appHeader";

export default function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const inputRef = React.useRef(null)
    const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
    }

    return ( 
        <div>
            <AppHeader />
            <EntryForm title='Вход' button='Войти' entry='Вы — новый пользователь?' password='Забыли пароль?' toEntry='Зарегистрироваться' toPassword='Восстановить пароль' linkEntry='/register' linkPassword='/forgot-password' >
                <Input 
                    type={'email'}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={'E-mail'}
                    value={email}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    />
                <Input 
                    type={'password'}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={'Пароль'}
                    value={password}
                    name={'password'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    icon='ShowIcon'
                    />
            </EntryForm>
        </div>
    )
}