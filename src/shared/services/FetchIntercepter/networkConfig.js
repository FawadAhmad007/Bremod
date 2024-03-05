/** @format */
import Axios from 'axios';
export const post = (data, url) => {
	return {
		method: 'POST',
		url,
		data,
		timeout: 10000,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};
};
export const postConfig = (data, url) => {
	return {
		method: 'POST',
		url,
		data,
		timeout: 1000,
		headers: {
			'Content-Type': 'application/json',
		},
	};
};
export const putConfig = (data, url) => {
	return {
		method: 'PUT',
		url,
		data,
		timeout: 10000,
		headers: {
			'Content-Type': 'application/json',
		},
	};
};
export const getConfig = (url) => {
	return {
		method: 'GET',
		url,
		timeout: 10000,
		headers: {
			'Content-Type': 'application/json',
		},
	};
};

export const responseHandler = async (config) => {
	try {
		const response = await Axios(config);
		return response;
	} catch (err) {
		if (Axios.isCancel(err)) {
			return { code: 'ECONNABORTED' };
		} else if (err.code == 'ERR_NETWORK') {
			return err;
		} else return err?.response?.data;
	}
};
