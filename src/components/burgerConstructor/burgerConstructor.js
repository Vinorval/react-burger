import React from "react";
import PropTypes from 'prop-types';
import './burgerConstructor.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructor extends React.Component {
    state = {
        data: this.props.data,
        bun: this.props.data.find((item) => item.type === "bun")
    };

    showIngredient = () => {
        return (
            this.state.data.map((item) => {
                if (item.type !== "bun")
                    return (
                        <li className="burger-item" key={item._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
                    )
                })
        )
    }

    render () {
        return (
            <section>
                <menu className="burger-menu">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${this.state.bun.name} (верх)`}
                        price={this.state.bun.price}
                        thumbnail={this.state.bun.image}
                    />
                    <ul className="burger-list">{this.showIngredient()}</ul>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${this.state.bun.name} (низ)`}
                        price={this.state.bun.price}
                        thumbnail={this.state.bun.image}
                    />
                </menu>
                <div className="burger-price">
                    <p className="sum">610 <CurrencyIcon type="primary" /></p>
                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </section>
        )
    }
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
};

export default BurgerConstructor