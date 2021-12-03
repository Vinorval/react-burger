import React from "react";
import Styles from './notFound.module.css';
import { NavLink } from "react-router-dom";

export default function NotFound () {
    return (
        <div className={Styles.page}>
            <h1 className={Styles.title}>404</h1>
            <NavLink to='/' className={Styles.link}>Попробуйте вернуться на главную страницу</NavLink>
        </div>
    )
}