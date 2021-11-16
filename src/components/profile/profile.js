import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ProfileForm from "../profileForm/profileForm";
import Styles from './profile.module.css';

export default function Profile() {
    return (
        <section className={Styles.section} >
            <div>
                <nav className={Styles.menu} >
                    <button className={`${Styles.name} ${Styles.name_active}`} >Профиль</button>
                    <button className={Styles.name} >История заказов</button>
                    <button className={Styles.name} >Выход</button>
                </nav>
                <p className={Styles.text}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <div>
                <ProfileForm />
            </div>
        </section>
    )
}