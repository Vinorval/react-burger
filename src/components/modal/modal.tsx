import React, { FC } from "react";
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modalOverlay/modalOvarlay";

interface IModalProps {
    title?: string;
    isOpen: boolean;
    closePopup: Function;
}

export const Modal: FC<IModalProps> = ({ isOpen, title, closePopup, children }) => {

    //закрытие модала
    const closeModal = () => {
        closePopup();
    }

    //закрытие модала на esc
    React.useEffect(() => {
        const close = ( e: KeyboardEvent) => { if(e.key === 'Escape') closeModal()}
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