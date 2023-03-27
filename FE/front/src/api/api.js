import axios from 'axios';

const api = axios.create({
	baseURL: 'ec2-43-200-172-178.ap-northeast-2.compute.amazonaws.com:8080',
});

export default api;
