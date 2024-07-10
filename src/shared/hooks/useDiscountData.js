/** @format */

// src/hooks/useDiscountData.js
import { useState, useEffect } from 'react';
import { fetchDiscountData } from '../../shared/services/FetchIntercepter/request';

const useDiscountData = () => {
	const [discountData, setDiscountData] = useState(null);
	const [showBar, setShowBar] = useState(false);
	const [loading, setLoading] = useState(true);

	const getDiscounts = async () => {
		try {
			const data = await fetchDiscountData();
			if (data && data.length > 0) {
				const showDiscountBar = isDiscountValid(data[0]?.end_at);
				setShowBar(showDiscountBar);
				setDiscountData(data);
				setLoading(false);
			} else {
				setShowBar(false);
				setDiscountData(null);
			}
		} catch (error) {
			console.error('Failed to fetch discount data', error);
			setShowBar(false);
			setDiscountData(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getDiscounts();
	}, []);

	return { discountData, showBar, getDiscounts };
};

export default useDiscountData;
