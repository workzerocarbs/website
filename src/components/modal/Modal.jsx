/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import '../modal/style.scss'
import { MdClose } from "react-icons/md";

const Modal = ({ isVisible, onClose, children, className }) => {
    if (!isVisible) return null;

    return (
        <div className={`modal-overlay ${className}`}>
            <div className={`modal-content ${className}`}>
                <button className="close-button" onClick={onClose}><MdClose size={30}/></button>
                {children}
            </div>
        </div>
    );
}

export default Modal