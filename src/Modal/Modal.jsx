import React, { useEffect, useState } from 'react';
import './Modal.css';
import { IoCloseCircleOutline } from "react-icons/io5";


function Modal({children, isOpen,onClose}) {
    useEffect(()=>{
        if(isOpen){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;
  return (
    <div className="modal-overlay">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            <IoCloseCircleOutline className='icon-close' />
          </button>
          {children}
        </div>
      </div>
  )
}

export default Modal;