import React from "react";
import './burgerIngredients.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredients extends React.Component {
    
    state = {
        current: 'Булки',
        data: this.props.data
    };

    clickOnBun = () => this.setState({ current: 'Булки' });

    clickOnSauces = () => this.setState({ current: 'Соусы' });

    clickOnMain = () => this.setState({ current: 'Начинки' });

    showIngredient = (name) => {
        return (
            this.state.data.map((item) => {
                if (item.type === name) {
                    return (
                        <li className="item" key={item._id}>
                            {item.__v > 0 && <p className="item-number">{item.__v}</p>}
                            <img className="item__image" alt={item.name} src={item.image} />
                            <p className="item__price">{item.price} <CurrencyIcon type="primary" /></p>
                            <p className="item__text">{item.name}</p>
                        </li>
                    )
                }
            })
        )
    }

    render() {
        return (
            <section>
                <div style={{ display: 'flex' }}>
                    <Tab value="Булки" active={this.state.current === 'Булки'} onClick={this.clickOnBun}>
                        Булки
                    </Tab>
                    <Tab value="Соусы" active={this.state.current === 'Соусы'} onClick={this.clickOnSauces}>
                        Соусы
                    </Tab>
                    <Tab value="Начинки" active={this.state.current === 'Начинки'} onClick={this.clickOnMain}>
                        Начинки
                    </Tab>
                </div>
                <menu className="menu">
                    <div className="menu__item">
                        <h3 className="menu__title">Булки</h3>
                        <ul className="menu__list">{this.showIngredient("bun")}</ul>
                    </div>
                    <div className="menu__item">
                        <h3 className="menu__title">Соусы</h3>
                        <ul className="menu__list">{this.showIngredient("sauce")}</ul>
                    </div>
                    <div className="menu__item">
                        <h3 className="menu__title">Начинки</h3>
                        <ul className="menu__list">{this.showIngredient("main")}</ul>
                    </div>
                </menu>
            </section>
        )
    }
}

export default BurgerIngredients