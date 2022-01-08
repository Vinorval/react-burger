import React from "react";
import ProfileForm from "../profileForm/profileForm";
import Styles from './profile.module.css';
import { useDispatch } from "../../services/hooks";
import { exit } from "../../services/actions/auth";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import Orders from "../orders/orders";

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    //если пользователь решил уйти, отправлять запрос на удаление токена и перенаправлять на страницу входа
    const exited = React.useCallback(
        e => {
          e.preventDefault();
          navigate("/login");
          dispatch(exit());
        },
        [dispatch, navigate]
    );

    return (
        <section className={`${Styles.section} ${location.pathname === '/profile/orders' && Styles.section_path_order}`} >
            <div>
                <nav className={Styles.menu} >
                    <NavLink end={true} to='/profile' className={({ isActive }) =>
                    [
                        Styles.name,
                        isActive ? Styles.name_active : null
                    ]
                    .filter(Boolean)
                    .join(" ")
                    } >Профиль</NavLink>
                    <NavLink to='/profile/orders' className={({ isActive }) =>
                    [
                        Styles.name,
                        isActive ? Styles.name_active : null
                    ]
                    .filter(Boolean)
                    .join(" ")
                    } >История заказов</NavLink>
                    <button onClick={exited} className={Styles.name} >Выход</button>
                </nav>
                <p className={Styles.text}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <div>
                {location.pathname === '/profile' && <ProfileForm />}
                {location.pathname === '/profile/orders' && <Orders />}
            </div>
        </section>
    )
}