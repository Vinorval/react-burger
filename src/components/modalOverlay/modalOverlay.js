import React from "react";
import modalOverlayStyles from './modalOverlay.module.css';

function ModalOverlay({isOpen, children, closePopup}) {

    const close = e => { if(e.key === 'Escape') closePopup()}

    React.useEffect(() => {
        document.addEventListener('keydown', close);

        return () => document.removeEventListener('keydown', close);
    }, [])

    return (
        <section className={isOpen? modalOverlayStyles.popup__overlay : modalOverlayStyles.popup__close} onClick={closePopup} >
            {children}
        </section>
    )
}

export default ModalOverlay