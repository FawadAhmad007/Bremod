/** @format */

import { getConfig, responseHandler } from './networkConfig';

import { BASE_URL, END_POINT } from '../../constants';

export const getProductList = async (name, page, size, search) => {
	let url = search
		? `${
				BASE_URL + END_POINT.GET_LIST
		  }${name}/rows?_page=${page}&_limit=${size}&_search=${search}`
		: `${
				BASE_URL + END_POINT.GET_LIST
		  }${name}/rows?_page=${page}&_limit=${size}`;
	const config = getConfig(url);

	return await responseHandler(config);
};
export const getList = async (name) => {
	let url = `${BASE_URL + END_POINT.GET_LIST}${name}/rows`;
	const config = getConfig(url);

	return await responseHandler(config);
};
export const searchProducts = async (name, page, size, search) => {
	let url = BASE_URL + END_POINT.GET_LIST;

	const config = getConfig(
		`${url}${name}/rows?_page=${page}&_limit=${size}&_search${search}`,
	);

	return await responseHandler(config);
};
