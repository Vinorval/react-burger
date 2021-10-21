import ReactDOM from "react-dom";
import React from "react";
import PropTypes from 'prop-types';
import modalOverlayStyles from './modalOverlay.module.css';
const modalRoot = document.getElementById("react-modals");

function ModalOverlay({isOpen, children, closePopup}) {
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

ModalOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closePopup: PropTypes.func.isRequired,
};

export default ModalOverlay