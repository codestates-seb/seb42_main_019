import { useState } from "react";
import ModalPopUp from "../../components/KHJ/ModalPopBookInfo";

function Modal({ children }) {
    const [isModalOpen, setModalOpen] = useState(false);
    function modalToggleProps(boolean) {
        setModalOpen(boolean);
        window.scrollTo(0, 0);
    }
    
    return (
        <>
            <button onClick={() => modalToggleProps(!isModalOpen)}>{children}</button>
            <ModalPopUp onevent={modalToggleProps} open={isModalOpen}/>
        </>
    )
}

export default Modal;