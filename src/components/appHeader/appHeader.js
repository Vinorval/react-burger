import React from "react";
import appHeaderStyles from './appHeader.module.css'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return(
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.navigation}>
                <div className={appHeaderStyles.navigation__conteiner}>
                    <p className={`${appHeaderStyles.text} ${appHeaderStyles.text_type_first}`}><BurgerIcon type="primary" /> Конструктор</p>
                    <p className={appHeaderStyles.text}><ListIcon type="secondary" /> Лента заказов</p>
                </div>
                <Logo/>
                <p className={appHeaderStyles.text}><ProfileIcon type="secondary" /> Личный кабинет</p>
            </nav>
        </header>
    );
}

export default AppHeader