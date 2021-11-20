import React from "react";
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modalOverlay/modalOverlay";
import { useNavigate } from "react-router-dom";

export default function Modal({isOpen, title, closePopup, children}) {
    const navigate = useNavigate();
    //console.log(isOpen)

    //закрытие модала
    const closeModal = () => {
        closePopup();
        navigate('/');
    }

    //закрытие модала на esc
    React.useEffect(() => {
        const close = e => { if(e.key === 'Escape') closeModal()}
        document.addEventListener('keydown', close);

        return () => document.removeEventListener('keydown', close);
    })

    //возвращаем верстку модала
    return (
        <ModalOverlay isOpen={isOpen} closePopup={closeModal}>
            <div className={modalStyles.popup} onClick={ e => e.stopPropagation()}>
                <div className={modalStyles.popup__header}>
                    <h2 className={modalStyles.title}>{title}</h2>
                    <CloseIcon type="primary" onClick={closeModal} />
                </div>
                {children}
            </div>
        </ModalOverlay>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    //closePopup: PropTypes.func.isRequired,
};
