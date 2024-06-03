/** @format */

import { getConfig, postConfig, responseHandler } from "./networkConfig";

import { BASE_URL, END_POINT } from "../../constants";

export const getProductList = async (name, page, size, search) => {
  let url = search
    ? `${
        BASE_URL + END_POINT.GET_LIST
      }${name}?page=${page}&limit=${size}&search=${search}`
    : `${BASE_URL + END_POINT.GET_LIST}${name}?page=${page}&limit=${size}`;
  const config = getConfig(url);
  console.log("url of the product", url);
  return await responseHandler(config);
};
export const getList = async (name) => {
  let url = `${BASE_URL + END_POINT.GET_LIST}${name}`;
  const config = getConfig(url);

  return await responseHandler(config);
};

export const getListForCategoryAndCover = async (name) => {
  let url = `${BASE_URL + END_POINT.GET_LIST}${name}/rows`;
  const config = getConfig(url);

  return await responseHandler(config);
};

export const searchProducts = async (name, page, size, search) => {
  let url = BASE_URL + END_POINT.GET_LIST;

  const config = getConfig(
    `${url}${name}/rows?_page=${page}&_limit=${size}&_search${search}`
  );

  return await responseHandler(config);
};

export const submitUserData = async (data) => {
  let url = BASE_URL + END_POINT.SUBMIT_USERDATA;
  const config = postConfig(data, `${url}`);

  return await responseHandler(config);
};

export const submitOrdersProduct = async (data) => {
  let url = BASE_URL + END_POINT.SUBMIT_ORDERSPRODUCTS;

  const config = postConfig(data, `${url}`);

  return await responseHandler(config);
};

export const generatePdfFile = async (data) => {
  let url = BASE_URL + END_POINT.GENERATE_PDF;
  const config = postConfig(data, `${url}`);
  return await responseHandler(config);
};
