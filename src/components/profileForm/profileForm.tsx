import React from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './profileForm.module.css';
import { updateUser } from "../../services/actions/auth";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { TProfile } from '../../utils/types';

export default function ProfileForm() {
    const dispatch = useDispatch();
    //начальное состояние импутов в профиле
    const { name, email } = useSelector( ( store ) => ({ name: store.auth.name, email: store.auth.email }) );
    const [form, setValue] = React.useState<TProfile>({ name: name, email: email, password: ''});
    const [isChange, setChenge] = React.useState<boolean>(false)

    //запись в стейт значения полей из хранилища
    React.useEffect(() => {
        setValue({ password: '', email: email, name: name});
        setChenge(false)
    }, [name, email])

    //запись в стейт новые значания полей
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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