import { useState } from "react";
import ModalPopUp from "../../components/KHJ/ModalPopBookInfo";

function Modal({ children, bookData }) {
    const [isModalOpen, setModalOpen] = useState(false);
    function modalToggleProps(boolean) {
        setModalOpen(boolean);
        window.scrollTo(0, 0);
    }
    
    return (
        <>
            <button onClick={() => modalToggleProps(!isModalOpen)}>{children}</button>
            <ModalPopUp bookData={bookData} onevent={modalToggleProps} open={isModalOpen}/>
        </>
    )
}

export default Modal;