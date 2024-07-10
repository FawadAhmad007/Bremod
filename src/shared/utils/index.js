/** @format */

export const isDiscountValid = (endDateString) => {
	const discountEndDate = new Date(endDateString);
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return discountEndDate > today;
};
