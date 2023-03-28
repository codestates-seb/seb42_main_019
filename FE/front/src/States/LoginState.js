import { atom, selector, useRecoilState } from 'recoil';
import axios from 'axios';

const authState = atom({
	key: 'authState',
	default: {
		password: '',
		email: '',
		name: '',
		region: '',
		commentCount: '',
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

export const signUpUser = async (userInfo) => {
	const res = await axios.post(
		'http://ec2-3-35-22-107.ap-northeast-2.compute.amazonaws.com:8080/user',
		userInfo,
	);
	return res.data;
};

export const loginUser = async (userInfo) => {
	const res = await axios.post(
		'http://ec2-3-35-22-107.ap-northeast-2.compute.amazonaws.com:8080/login',
		userInfo,
	);
	const userId = res.headers.userid;
	const accessToken = res.headers.authorization;
	const loginStatus = true;
	localStorage.setItem('userId', userId);
	localStorage.setItem('accessToken', accessToken);
	localStorage.setItem('loginStatus', loginStatus);
	axios.defaults.headers.common['Authorization'] = `${accessToken}`;
	return res;
};

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
