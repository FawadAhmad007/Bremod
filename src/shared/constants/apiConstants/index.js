/** @format */

const BASE_URL = 'https://app-admin.bremod.net';
const END_POINT = {
	GET_LIST: '/api/tables/',
	SUBMIT_USERDATA: '/api/tables/place/order',
	SUBMIT_ORDERSPRODUCTS: '/api/tables/_orders_products/rows',
	GENERATE_PDF: '/api/tables/order-details',
	GET_CITIES: '_cities/rows',
	GET_DISCOUNT: 'discount/offers',
};
export { BASE_URL, END_POINT };
