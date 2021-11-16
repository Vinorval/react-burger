import React from "react";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './profileForm.module.css';

export default function ProfileForm() {
    return(
        <form className={Styles.form} >
            <Input 
                type={'email'}
                placeholder={'placeholder'}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Input 
                type={'email'}
                placeholder={'placeholder'}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Input 
                type={'email'}
                placeholder={'placeholder'}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
        </form>
    )
}