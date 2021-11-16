import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/appHeader/appHeader";

export default function LoginPage() {
    const [value, setValue] = React.useState('value')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      console.log('Icon Click Callback')
    }

    return ( 
        <div>
            <AppHeader />
            <EntryForm title='Вход' button='Войти' entry='Вы — новый пользователь?' password='Забыли пароль?' toEntry='Зарегистрироваться' toPassword='Восстановить пароль' >
                <Input 
                    type={'email'}
                    placeholder={'placeholder'}
                    onChange={e => setValue(e.target.value)}
                    value={value}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    />
                <Input />
            </EntryForm>
        </div>
    )
}