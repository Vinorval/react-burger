import React from "react";
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal({title, closePopup, children}) {
    return (
        <div className={modalStyles.popup} onClick={ e => e.stopPropagation()}>
            <div className={modalStyles.popup__header}>
                <h2 className={modalStyles.title}>{title}</h2>
                <CloseIcon type="primary" onClick={closePopup} />
            </div>
            {children}
        </div>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    closePopup: PropTypes.func.isRequired,
};

export default Modal