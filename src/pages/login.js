import React from "react";
import EntryForm from "../components/entryForm/entryForm";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/appHeader/appHeader";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { login } from "../services/actions/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [form, setValue] = React.useState({ email: '', password: ''});
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let auth = localStorage.getItem('authorization');
    const inputRef = React.useRef(null)
    const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
    }

    

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const StylesForm = {
        'display': 'grid',
        'rowGap': '24px',
        'justifyItems': 'center',
    }

    let log = React.useCallback(
        e => {
          e.preventDefault();
          console.log(form);
          dispatch(login(form));
          navigate("/");
        },
        [form, dispatch, navigate]
      );

      React.useEffect(() => {if(auth) { return navigate(-1) }}, [auth, navigate])

    return ( 
        <div>
            <AppHeader />
            <EntryForm title='Вход' entry='Вы — новый пользователь?' password='Забыли пароль?' toEntry='Зарегистрироваться' toPassword='Восстановить пароль' linkEntry='/register' linkPassword='/forgot-password' >
            <form style={StylesForm} >
                <Input 
                    type={'email'}
                    onChange={e => onChange(e)}
                    placeholder={'E-mail'}
                    value={form.email}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
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
                    onIconClick={onIconClick}
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