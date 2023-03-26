import axios from 'axios';

export default axios.create({
	baseURL: 'http://ec2-3-35-22-107.ap-northeast-2.compute.amazonaws.com:8080',
});
