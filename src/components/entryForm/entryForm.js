import React from "react";
import PropTypes from 'prop-types';
import entryFormStyles from './entryForm.module.css';
import { Link } from "react-router-dom";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";

export default function EntryForm ({ title, inputs, button, enty, password, entry, toResetPassword }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setValue] = React.useState({ email: '', password: '', name: '', value: ''});

    //записываем значения поля в стейт
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    //регистрируем пользователя
    const onSubmit = React.useCallback(
        e => {
          e.preventDefault();
          dispatch(entry(form));
          Boolean(toResetPassword) ? toResetPassword() : navigate("/");
        },
        [form, dispatch, navigate, entry, toResetPassword]
      );

    const returnInputs = () => {
        return inputs.map((item, index) => {
            console.log(item)
            return <Input
                       key={index} 
                       type={item.type} 
                       placeholder={item.placeholder} 
                       name={item.name} 
                       error={false} 
                       errorText={'Ошибка'} 
                       size={'default'} 
                       icon={item.icon} 
                       value={item.type === 'email'? form.email : item.type === 'password' ? form.password : item.name === 'name' ? form.name : form.value }
                       onChange={e => onChange(e)} />
        })
    }

    return (
        <section className={entryFormStyles.section} >
            <form className={entryFormStyles.conteiner} onSubmit={onSubmit}>
                <h2 className={entryFormStyles.title}>{title}</h2>
                <ul>{returnInputs()}</ul>
                    <Button type="primary" size="medium">
                        {button}
                    </Button>
                <div className={entryFormStyles.textBlock}>
                    <p className={entryFormStyles.text} >{enty.title} <Link to={`${enty.link}`} className={entryFormStyles.link} >{enty.text}</Link></p>
                    { Boolean(password) && <p className={entryFormStyles.text} >{password.title} <Link to={`${password.link}`} className={entryFormStyles.link} >{password.text}</Link></p>}
                </div>
            </form>
        </section>
    )
}

EntryForm.propTypes = {
    title: PropTypes.string.isRequired,
    inputs: PropTypes.array.isRequired,
    button: PropTypes.string.isRequired,
    enty: PropTypes.object.isRequired,
    password: PropTypes.object,
    entry: PropTypes.func,
    toResetPassword: PropTypes.func
};