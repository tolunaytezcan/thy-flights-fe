import React from 'react';
import { Button } from '@mui/material';

import styles from './FlightList.module.scss';
import { Flight, Price } from '@App/constants/flights';
import FlightItem from '../FlightItem/FlightItem';

interface FlightListProps {
	flights: Flight[];
	setSortCriteria: (criteria: string) => void;
	sortedFlights: Flight[];
	cabinClasses: (string | null)[];
	handleRadioChange: (
		index: number,
		event: React.ChangeEvent<HTMLInputElement>,
	) => void;
	handleSelectFlight: (status: string, price: Price) => void;
	promotionalCode: boolean;
}

const FlightList = ({
	flights,
	sortedFlights,
	setSortCriteria,
	cabinClasses,
	handleRadioChange,
	handleSelectFlight,
	promotionalCode,
}: FlightListProps) => {
	return (
		<div>
			{flights.length > 0 ? (
				<div>
					<div className={styles.list_topbar}>
						<span className={styles.search_criteria}>
							Sıralama kriteri
						</span>
						{['lowestPrice', 'earliestDeparture'].map(criteria => (
							<Button
								key={criteria}
								onClick={() => setSortCriteria(criteria)}
								sx={{
									height: 30,
									color: 'white',
									borderColor: 'white',
									textTransform: 'none',
									fontSize: '12px',
									'&:hover': { backgroundColor: 'grey.500' },
								}}
								variant='outlined'
							>
								{criteria === 'lowestPrice'
									? 'Ekonomi Kabin Ücreti'
									: 'Kalkış Saati'}
							</Button>
						))}
					</div>
					{sortedFlights.map((flight: Flight, index: number) => (
						<FlightItem
							flight={flight}
							index={index}
							cabinClasses={cabinClasses}
							handleRadioChange={handleRadioChange}
							handleSelectFlight={handleSelectFlight}
							promotionalCode={promotionalCode}
						/>
					))}
				</div>
			) : (
				<div>
					<p>Uçuş bulunamadı</p>
				</div>
			)}
		</div>
	);
};

export default FlightList;
