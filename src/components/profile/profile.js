import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ProfileForm from "../profileForm/profileForm";
import Styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { exit } from "../../services/actions/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { refreshToken } = useSelector( store => ({ refreshToken: store.auth.refreshToken }) );

    let exited = React.useCallback(
        e => {
          e.preventDefault();
          console.log(refreshToken);
          dispatch(exit(refreshToken));
          navigate("/");
        },
        [refreshToken, dispatch, navigate]
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