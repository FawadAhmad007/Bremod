/** @format */

const BASE_URL = 'http://54.255.224.45';
const END_POINT = {
	GET_LIST: '/api/tables/',
	SUBMIT_USERDATA: '/api/tables/place/order',
	SUBMIT_ORDERSPRODUCTS: '/api/tables/_orders_products/rows',
    GENERATE_PDF: '/api/tables/order-details',
	GET_CITIES: '_cities/rows',
	GET_DISCOUNT: '/discount/offers'
};
export { BASE_URL, END_POINT };
