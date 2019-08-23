import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://build-a-burger-52744.firebaseio.com/'
});

export default instance;