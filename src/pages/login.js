import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/appHeader/appHeader";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { login } from "../services/actions/auth";
import { useNavigate } from "react-router-dom";
import Styles from './login.module.css';

export default function LoginPage() {
    const [form, setValue] = React.useState({ email: '', password: ''});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //узнаем: авторизирован ли пользователь
    const auth = localStorage.getItem('authorization');
    const inputRef = React.useRef(null)

    //записываем значения поля в стейт
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    //регистрируем пользователя
    const log = React.useCallback(
        e => {
          e.preventDefault();
          dispatch(login(form));
          navigate("/");
        },
        [form, dispatch, navigate]
      );

      //если пользователь зарегистрирован, 
      React.useEffect(() => {if(auth) { return navigate(-1) }}, [auth, navigate])

    return ( 
        <div>
            <EntryForm title='Вход' entry='Вы — новый пользователь?' password='Забыли пароль?' toEntry='Зарегистрироваться' toPassword='Восстановить пароль' linkEntry='/register' linkPassword='/forgot-password' >
            <form className={Styles.form} >
                <Input 
                    type={'email'}
                    onChange={e => onChange(e)}
                    placeholder={'E-mail'}
                    value={form.email}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    />
                <Input 
                    type={'password'}
                    onChange={e => onChange(e)}
                    placeholder={'Пароль'}
                    value={form.password}
                    name={'password'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    icon='ShowIcon'
                    />
            </form>
            <Button type="primary" size="medium" onClick={log}>
                Войти
            </Button>
            </EntryForm>
        </div>
    )
}