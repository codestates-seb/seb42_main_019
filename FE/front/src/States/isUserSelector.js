import { selector } from 'recoil';
import axios from '../api/api';
import { isUserAtom  } from './atom';

const userIsUser = selector({
    key : 'userIsUser',
    get : async ({ get }) => {
        const userId = get(isUserAtom);
        const response = await axios.get(`/user/${localStorage.getItem('userId')}`)
        const Key = response.data.userId;
        return Key === userId;
    }
});

export default userIsUser;