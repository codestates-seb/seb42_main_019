import { atom, selector, useRecoilState } from 'recoil';
import axios from 'axios';

const authState = atom({
	key: 'authState',
	default: {
		name: '',
		region: '',
		likeCount: '',
		disLikeCount: '',
		receivedMessageCount: '',
		createdAt: '',
		userId: localStorage.getItem('userId') || '',
		accessToken: localStorage.getItem('accessToken') || '',
		loginStatus: localStorage.getItem('loginStatus') || false,
	},
});

axios.defaults.withCredentials = true;


export const authStateSelector = selector({
	key: 'authStateSelector',
	get: ({ get }) => {
		const auth = get(authState);
		return auth;
	},
	set: ({ set }, newAuth) => {
		set(authState, { ...newAuth });
	},
});

export const useAuthState = () => {
	const [auth, setAuth] = useRecoilState(authStateSelector);
	return [auth, setAuth];
};
