import { FC, MouseEventHandler, useEffect } from 'react'
import ReactPortal from '../Portal'
import './style.scss'

interface IProps {
    children: JSX.Element | JSX.Element[];
    isOpen: boolean;
    handleClose: MouseEventHandler<HTMLButtonElement>;
}

const Modal: FC<IProps> = ({ children, isOpen, handleClose }) => {
    useEffect(() => {
        const closeOnEscapeKey = (e: any) => e.key === "Escape" ? handleClose(e) : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
          document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    if (!isOpen) return null;
  
    return (
        <ReactPortal wrapperId="portal-modal-container">    
            <div className='modal'>
                <button className='modal-close' onClick={handleClose}>X</button>
                <div className='modal-content'>{children}</div>
            </div>
        </ReactPortal>
    );
  }
  export default Modal;