import React from "react";
import ProfileForm from "../profileForm/profileForm";
import Styles from './profile.module.css';
import { useDispatch } from "../../services/hooks";
import { exit, getUser } from "../../services/actions/auth";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import Orders from "../orders/orders";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/actions/wsActionTypes";
import { getCookie } from "../../utils/utils";

type TProps = { openPopup?: Function }

export default function Profile(props: TProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const accessToken = getCookie('accessToken');

    React.useEffect(() => { dispatch(getUser()) }, [dispatch])

    //если пользователь решил уйти, отправлять запрос на удаление токена и перенаправлять на страницу входа
    const exited = React.useCallback(
        e => {
          e.preventDefault();
          navigate("/login");
          dispatch(exit());
        },
        [dispatch, navigate]
    );

    React.useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: `wss://norma.nomoreparties.space/orders/all?token=${accessToken?.replace('Bearer ','')}` });
        return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
        };
      }, [accessToken, dispatch]);

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
                {location.pathname === '/profile/orders' && <Orders openPopup={props.openPopup!} />}
            </div>
        </section>
    )
}