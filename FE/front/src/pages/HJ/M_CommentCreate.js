import { useState } from "react";
import ModalPopUp from "../../components/KHJ/ModalPopCreate";

function Modal({ children, getRate }) {
    const [isModalOpen, setModalOpen] = useState(false);
    function modalToggleProps(boolean) {
        setModalOpen(boolean);
        window.scrollTo(0, 0);
    }
    
    return (
        <>
            <button
                onClick={() => {
                    modalToggleProps(!isModalOpen);
                }
            }>{children}</button>
            <ModalPopUp
                onevent={modalToggleProps}
                open={isModalOpen}
                getRate={getRate}
            />
        </>
    )
}

export default Modal;