export const isDiscountValid = (endDateString) => {
  console.log("endDateString",endDateString);
    const discountEndDate = new Date(endDateString);
    const today = new Date();
    return discountEndDate > today;
  };
  