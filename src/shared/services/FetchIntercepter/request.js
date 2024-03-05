/** @format */

import { getConfig, responseHandler } from './networkConfig';

import { BASE_URL, END_POINT } from '../../constants';

export const getList = async (name, page, size) => {
	let url = BASE_URL + END_POINT.GET_LIST;

	const config = getConfig(`${url}${name}/rows?_page=${page}&_limit=${size}`);

	return await responseHandler(config);
};
