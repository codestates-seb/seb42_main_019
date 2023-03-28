import axios from 'axios';

const api = axios.create({
	baseURL: 'http://ec2-15-165-131-229.ap-northeast-2.compute.amazonaws.com:8080',
	headers : {
		withCredentials : true,
	}
});

export default api;
