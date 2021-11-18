import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/appHeader/appHeader";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
    let navigate = useNavigate();
    let auth = localStorage.getItem('authorization');

    React.useEffect(() => {if(auth) { return navigate(-1) }}, [auth, navigate])
    const [email, setEmail] = React.useState('');
    const inputRef = React.useRef(null)
    const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      console.log('Icon Click Callback')
    }

    return ( 
        <div>
            <AppHeader />
            <EntryForm title='Восстановление пароля' button='Восстановить' entry='Вспомнили пароль?' toEntry='Войти' linkEntry='/login' >
                <Input 
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    />
            </EntryForm>
        </div>
    )
}