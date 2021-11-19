import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/appHeader/appHeader";
import { useDispatch } from 'react-redux';
import { register } from "../services/actions/auth";
import { useNavigate } from "react-router-dom";
import Styles from './register.module.css';

export default function RegisterPage() {
    const [form, setValue] = React.useState({ email: '', password: '', name: '' });
    const inputRef = React.useRef(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //узнаём: зарегистрирован ли пользователь
    const auth = localStorage.getItem('authorization');

    //если пользователь зарегестрирова, отправляем его на шаг назад
    React.useEffect(() => {if(auth) { return navigate(-1) }}, [auth, navigate])

    //записываем значения с полей в стейт
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    //регистрация нового пользователя
    const regist = React.useCallback(
        e => {
          e.preventDefault();
          console.log(form);
          dispatch(register(form));
          navigate("/");
        },
        [form, dispatch, navigate]
      );

    return ( 
        <div>
            <EntryForm title='Регистрация' entry='Уже зарегистрированы?' toEntry='Войти' linkEntry='/login' >
            <form className={Styles.form} >
                <Input 
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => onChange(e)}
                    value={form.name}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    />
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
            <Button type="primary" size="medium" onClick={regist}>
                Зарегистрироваться
            </Button>
            </EntryForm>
        </div>
    )
}