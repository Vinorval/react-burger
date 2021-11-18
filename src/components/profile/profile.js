import React from "react";
import ProfileForm from "../profileForm/profileForm";
import Styles from './profile.module.css';
import { useDispatch } from 'react-redux';
import { exit } from "../../services/actions/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    //если пользователь решил уйти, отправлять запрос на удаление токена и перенаправлять на страницу входа
    let exited = React.useCallback(
        e => {
            console.log(localStorage)
          e.preventDefault();
          dispatch(exit());
          navigate("/login");
        },
        [dispatch, navigate]
    );

    return (
        <section className={Styles.section} >
            <div>
                <nav className={Styles.menu} >
                    <button className={`${Styles.name} ${Styles.name_active}`} >Профиль</button>
                    <button className={Styles.name} >История заказов</button>
                    <button onClick={exited} className={Styles.name} >Выход</button>
                </nav>
                <p className={Styles.text}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <div>
                <ProfileForm />
            </div>
        </section>
    )
}