import { useState } from "react";
import ModalPopUp from "../../components/KHJ/ModalPopView";

function Modal({ children }) {
    const [isModalOpen, setModalOpen] = useState(false);
    function modalToggleHandler() {
        setModalOpen(!isModalOpen);
    }
    function modalToggleProps(boolean) {
        setModalOpen(boolean);
    }
    console.log(isModalOpen);
    return (
        <>
            <button onClick={modalToggleHandler}>{children}</button>
            <ModalPopUp onevent={modalToggleProps} open={isModalOpen}/>
        </>
    )
}

export default Modal;