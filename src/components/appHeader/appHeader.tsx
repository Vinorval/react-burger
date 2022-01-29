import React from "react";
import appHeaderStyles from './appHeader.module.css'
import { NavLink, useLocation } from "react-router-dom";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {
    const location = useLocation();

    return(
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.navigation}>
                <div className={appHeaderStyles.navigation__conteiner}>
                    <NavLink to='/' className={({ isActive }) =>
                    [
                        appHeaderStyles.text,
                        isActive ? appHeaderStyles.text_active : null
                    ]
                    .filter(Boolean)
                    .join(" ")
                    }><BurgerIcon type={location.pathname === '/' ? "primary" : "secondary"} /> Конструктор</NavLink>

                    <NavLink to='/feed' className={({ isActive }) =>
                    [
                        appHeaderStyles.text,
                        isActive ? appHeaderStyles.text_active : null
                    ]
                    .filter(Boolean)
                    .join(" ")
                    }><ListIcon type={location.pathname === '/orders' ? "primary" : "secondary"} /> Лента заказов</NavLink>
                </div>
                <NavLink to={'/'} ><Logo/></NavLink>
                <NavLink id='toProfile' to='/profile' className={({ isActive }) =>
                    [
                        appHeaderStyles.text,
                        isActive ? appHeaderStyles.text_active : null
                    ]
                    .filter(Boolean)
                    .join(" ")
                }><ProfileIcon type={location.pathname === '/profile' ? "primary" : "secondary"} /> Личный кабинет</NavLink>
            </nav>
        </header>
    );
}
