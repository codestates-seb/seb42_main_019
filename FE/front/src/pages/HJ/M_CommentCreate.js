import { useState } from "react";
import ModalPopUp from "../../components/KHJ/ModalPopCreate";

function Modal({ children }) {
    const [isModalOpen, setModalOpen] = useState(false);
    function modalToggleHandler() {
        setModalOpen(!isModalOpen);
    }
    function modalToggleProps(boolean) {
        setModalOpen(boolean);
    }
    
    return (
        <>
            <button onClick={modalToggleHandler}>{children}</button>
            <ModalPopUp onevent={modalToggleProps} open={isModalOpen}/>
        </>
    )
}

export default Modal;