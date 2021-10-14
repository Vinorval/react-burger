import React from "react";
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal(props) {
    return (
        <div className={modalStyles.popup} onClick={ e => e.stopPropagation()}>
            <div className={modalStyles.popup__header}>
                <h2 className={modalStyles.title}>{props.title}</h2>
                <CloseIcon type="primary" onClick={props.closePopup} />
            </div>
            {props.children}
        </div>
    )
}

export default Modal