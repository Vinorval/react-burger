import React from "react";
import appHeaderStyles from './appHeader.module.css'
import { NavLink } from "react-router-dom";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {
    const [ isProfile, setProfile ] = React.useState(false);
    const [ isConstructor, setConstructor ] = React.useState(false);
    const [ isOrders, setOrders ] = React.useState(false);

    return(
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.navigation}>
                <div className={appHeaderStyles.navigation__conteiner}>
                    <NavLink to='/' className={({ isActive }) =>
                    [
                        isActive ? setConstructor(true) : null,
                        appHeaderStyles.text,
                        isActive ? appHeaderStyles.text_active : null
                    ]
                    .filter(Boolean)
                    .join(" ")
                    }><BurgerIcon type={isConstructor ? "primary" : "secondary"} /> Конструктор</NavLink>

                    <NavLink to='/orders' className={({ isActive }) =>
                    [
                        isActive ? setOrders(true) : null,
                        appHeaderStyles.text,
                        isActive ? appHeaderStyles.text_active : null
                    ]
                    .filter(Boolean)
                    .join(" ")
                    }><ListIcon type={isOrders ? "primary" : "secondary"} /> Лента заказов</NavLink>
                </div>
                <Logo/>
                <NavLink to='/profile' className={({ isActive }) =>
                    [
                        isActive ? setProfile(true) : null,
                        appHeaderStyles.text,
                        isActive ? appHeaderStyles.text_active : null
                    ]
                    .filter(Boolean)
                    .join(" ")
                }><ProfileIcon type={isProfile ? "primary" : "secondary"} /> Личный кабинет</NavLink>
            </nav>
        </header>
    );
}
