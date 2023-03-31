import axios from "../../api/api";

const userIsCheck = (id) => {
    const getUser = async () => {
        try {
                const response = await axios ({
                    method: 'get',
                    url: `/user/${localStorage.getItem('userId')}`,
                    header: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}` ,
                        'Content-Type': 'application/json',
                        withCredentials : true
                    }
                })
                const { userId } = response;
                return userId;
            } catch (err) {
                console.log(err);
            };
    };
    if(getUser() === id) return true;
    return false;
};

export default userIsCheck;