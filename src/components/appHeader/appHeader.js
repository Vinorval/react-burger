import React from "react";
import './appHeader.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {
    render() {
        return(
            <header className="header">
                <nav className="navigation">
                    <div className="navigation__conteiner">
                        <p className="text text_type_first"><BurgerIcon type="primary" /> Конструктор</p>
                        <p className="text"><ListIcon type="secondary" /> Лента заказов</p>
                    </div>
                    <Logo/>
                    <p className="text"><ProfileIcon type="secondary" /> Личный кабинет</p>
                </nav>
            </header>
        );
    }
}

export default AppHeader