/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flight } from '@App/constants/flights';
import { useEffect, useState } from 'react';

export const useFetchFlights = () => {
	const [flights, setFlights] = useState<Flight[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchFlights = async () => {
		try {
			const response = await fetch(
				'https://thy-flights-api-tolunaytezcans-projects.vercel.app/flights',
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data: Flight[] = await response.json();
			localStorage.setItem('flights', JSON.stringify(data));
			setFlights(data);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFlights();
	}, []);

	return { flights, loading, error };
};
