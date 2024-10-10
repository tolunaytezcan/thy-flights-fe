import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormControlLabel, FormGroup, Switch } from '@mui/material';

import Header from '@App/layout/Header/Header';

import FlightList from '@App/components/FlightList/FlightList';

import { Flight, Price } from '@App/constants/flights';

import styles from './FlightListing.module.scss';

const FlightListing: React.FC = () => {
	const navigate = useNavigate();
	const flights = JSON.parse(localStorage.getItem('flights') ?? '[]');
	const originCity = JSON.parse(
		localStorage.getItem('originCity') ?? '{}',
	).label;
	const destinationCity = JSON.parse(
		localStorage.getItem('destinationCity') ?? '{}',
	).label;
	const passengerCount = localStorage.getItem('passengerCount');

	const [promotionalCode, setPromotionalCode] = useState<boolean>(false);
	const [cabinClasses, setCabinClasses] = useState<(string | null)[]>(
		Array(flights.length).fill(null),
	);
	const [sortCriteria, setSortCriteria] = useState<string>('lowestPrice');

	const sortedFlights = flights.sort((a: Flight, b: Flight) => {
		if (sortCriteria === 'lowestPrice') {
			return (
				a.fareCategories.ECONOMY.subcategories[0].price.amount -
				b.fareCategories.ECONOMY.subcategories[0].price.amount
			);
		}
		if (sortCriteria === 'earliestDeparture') {
			return (
				new Date(a.departureDateTimeDisplay).getTime() -
				new Date(b.departureDateTimeDisplay).getTime()
			);
		}
		return 0;
	});

	const handlePromotionalCodeToggle = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setPromotionalCode(event.target.checked);
	};

	const handleRadioChange = (
		index: number,
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const updatedClasses = [...cabinClasses];
		updatedClasses[index] = event.target.value;
		setCabinClasses(updatedClasses);
	};

	const handleSelectFlight = (status: string, price: Price) => {
		if (status === 'AVAILABLE') {
			navigate('/result', {
				state: {
					status: 'available',
					price: price,
					passengerCount: passengerCount,
				},
			});
		}

		if (status === 'ERROR') {
			navigate('/result', { state: { status: 'error' } });
		}
	};

	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.list_area}>
				<div className={styles.list}>
					<Button
						onClick={() => {
							navigate('/');
						}}
						sx={{
							width: '120px',
							height: '20px',
							color: 'white',
							backgroundColor: 'red',
						}}
						variant='text'
					>
						{'<- UÇUŞ ARA'}
					</Button>
					{originCity && destinationCity && (
						<div className={styles.selected_cities}>
							<p>{`${originCity} - ${destinationCity}, ${passengerCount} Yolcu`}</p>
						</div>
					)}
					<div className={styles.campaign_code}>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										checked={promotionalCode}
										onChange={handlePromotionalCodeToggle}
									/>
								}
								label='Promosyon Kodu'
							/>
						</FormGroup>
					</div>
					{
						<FlightList
							flights={flights}
							sortedFlights={sortedFlights}
							setSortCriteria={setSortCriteria}
							cabinClasses={cabinClasses}
							handleRadioChange={handleRadioChange}
							handleSelectFlight={handleSelectFlight}
							promotionalCode={promotionalCode}
						/>
					}
				</div>
			</div>
		</div>
	);
};

export default FlightListing;
