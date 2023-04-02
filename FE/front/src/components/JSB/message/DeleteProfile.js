import axios from "axios";
import { useNavigate } from "react-router-dom";


const DeleteProfile = async () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('userId');
    
    try {
        await axios.delete(`/user/${user}`);
        localStorage.removeItem('userId');
        navigate('/');
    } catch (error) {
        console.error(error);
    }
};

export default DeleteProfile;