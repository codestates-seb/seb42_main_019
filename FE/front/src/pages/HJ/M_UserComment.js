import { useState } from "react";
import ModalPopUp from "../../components/KHJ/ModalPopView";

function Modal({ children }) {
    const [isModalOpen, setModalOpen] = useState(false);
    function modalToggleProps(boolean) {
        setModalOpen(boolean);
    }
    
    return (
        <>
            <button onClick={() => modalToggleProps(!isModalOpen)}>{children}</button>
            <ModalPopUp onevent={modalToggleProps} open={isModalOpen}/>
        </>
    )
}

export default Modal;