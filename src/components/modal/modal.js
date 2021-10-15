import React from "react";
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modalOverlay/modalOverlay";

function Modal({isOpen, title, closePopup, children}) {

    React.useEffect(() => {
        const close = e => { if(e.key === 'Escape') closePopup()}
        document.addEventListener('keydown', close);

        return () => document.removeEventListener('keydown', close);
    })

    return (
        <ModalOverlay isOpen={isOpen} closePopup={closePopup}>
            <div className={modalStyles.popup} onClick={ e => e.stopPropagation()}>
                <div className={modalStyles.popup__header}>
                    <h2 className={modalStyles.title}>{title}</h2>
                    <CloseIcon type="primary" onClick={closePopup} />
                </div>
                {children}
            </div>
        </ModalOverlay>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    closePopup: PropTypes.func.isRequired,
};

export default Modal