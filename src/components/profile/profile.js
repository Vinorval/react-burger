import React from "react";
import ProfileForm from "../profileForm/profileForm";
import Styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { exit } from "../../services/actions/auth";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

export default function Profile() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();
    const notAuth = useSelector( store =>  ({ notAuth: store.auth.notAuth }))

    let exited = React.useCallback(
        e => {
          e.preventDefault();
          dispatch(exit());
          navigate("/login");
        },
        [dispatch, navigate]
    );

    //React.useEffect(() => {
    //    console.log(notAuth)
    //  if(notAuth) {return <Navigate to="/login" replace state={{from: location,}} />};
    //}, [notAuth, location])

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