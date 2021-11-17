import React from "react";
import { useSelector } from "react-redux";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './profileForm.module.css';
import { useDispatch } from "react-redux";
import { getUser, updateUser } from "../../services/actions/auth";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export default function ProfileForm() {
    const dispatch = useDispatch();
    const { name, email } = useSelector( store => ({ name: store.auth.name, email: store.auth.email }) );
    const [form, setValue] = React.useState({ name: name, email: email, password: ''});
    const [isChange, setChenge] = React.useState(false)
  
    React.useEffect(() => { return dispatch(getUser()) }, [dispatch])
    React.useEffect(() => {
        setValue({ password: '', email: email, name: name});
        setChenge(false)
    }, [name, email])

    const onChange = e => {
      setValue({ ...form, [e.target.name]: e.target.value });
      console.log(name)
      setChenge(true);
    };

    const reset = () => {
        setValue({ password: '', email: email, name: name});
        setChenge(false)
    }

    let onSubmit = React.useCallback(
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