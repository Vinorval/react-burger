import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './profileForm.module.css';
import { useDispatch } from "react-redux";
import { getUser, updateUser } from "../../services/actions/auth";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

interface Iprofile {
    name: string;
    email: string;
    password: string;
}

export default function ProfileForm() {
    const dispatch = useDispatch();
    //начальное состояние импутов в профиле
    const { name, email } = useSelector( (store: RootStateOrAny) => ({ name: store.auth.name, email: store.auth.email }) );
    const [form, setValue] = React.useState<Iprofile>({ name: name, email: email, password: ''});
    const [isChange, setChenge] = React.useState<boolean>(false)
  
    //запрос на сервер для получения информации о пользователе
    React.useEffect(() => { return dispatch(getUser()) }, [dispatch])

    //запись в стейт значения полей из хранилища
    React.useEffect(() => {
        setValue({ password: '', email: email, name: name});
        setChenge(false)
    }, [name, email])

    //запись в стейт новые значания полей
    const onChange = (e: any) => {
      setValue({ ...form, [e.target.name]: e.target.value });
      setChenge(true);
    };

    //отмена изменений
    const reset = () => {
        setValue({ password: '', email: email, name: name});
        setChenge(false)
    }

    //сохранение новых данных на сервере
    const onSubmit = React.useCallback(
        e => {
          e.preventDefault();
          setChenge(false)
          dispatch(updateUser(form))
        },
        [form, dispatch]
      );

    return(
        <>
        <form className={Styles.form} >
            <Input 
                type={'text'}
                placeholder={'Имя'}
                value={form.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                icon={'EditIcon'}
                onChange={e => onChange(e)}
            />
            <Input 
                type={'email'}
                placeholder={'Логин'}
                value={form.email}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                icon={'EditIcon'}
                onChange={e => onChange(e)}
            />
            <Input 
                type={'password'}
                placeholder={'Пароль'}
                value={form.password}
                name={'password'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                icon={'EditIcon'}
                onChange={e => onChange(e)}
            />
        </form>
        {isChange && <div className={Styles.buttons}>
            <Button type='primary' size='small' onClick={onSubmit} >Сохранить</Button>
            <Button type='secondary' size='medium' onClick={reset} >Отмена</Button>
        </div>}
        </>
    )
}