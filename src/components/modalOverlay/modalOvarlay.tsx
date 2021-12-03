import React, { FC, MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import modalOverlayStyles from './modalOverlay.module.css';
const modalRoot = document.getElementById("react-modals")!;

interface IModalProps {
    isOpen: boolean;
    closePopup: MouseEventHandler<HTMLElement> | undefined;
  }

const ModalOverlay: FC<IModalProps> = ({isOpen, children, closePopup}) => {
    return ReactDOM.createPortal(
        (
            <>
                <section className={isOpen? modalOverlayStyles.popup__overlay : modalOverlayStyles.popup__close} onClick={closePopup} >
                  {children}
                </section>
            </>
        ), 
        modalRoot
    );
}

export default ModalOverlay