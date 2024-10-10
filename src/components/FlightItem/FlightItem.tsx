import React from 'react';
import { Button } from '@mui/material';

import styles from './FlightItem.module.scss';
import {
	FareCategory,
	Flight,
	Price,
	Subcategory,
} from '@App/constants/flights';
import CabinOptions from '../CabinOptions/CabinOptions';

interface FlightItemProps {
	flight: Flight;
	index: number;
	cabinClasses: (string | null)[];
	handleRadioChange: (
		index: number,
		event: React.ChangeEvent<HTMLInputElement>,
	) => void;
	handleSelectFlight: (status: string, price: Price) => void;
	promotionalCode: boolean;
}

const FlightItem = ({
	flight,
	index,
	cabinClasses,
	handleRadioChange,
	handleSelectFlight,
	promotionalCode,
}: FlightItemProps) => {
	{
		const selectedCabinClass = cabinClasses[index];
		const fareCategory: FareCategory = ((selectedCabinClass &&
			flight.fareCategories[
				selectedCabinClass.toUpperCase() as keyof typeof flight.fareCategories
			]) ??
			null) as FareCategory;

		return (
			<div
				key={`${flight.arrivalDateTimeDisplay}-${flight.departureDateTimeDisplay}-index`}
			>
				<div className={styles.flight_box}>
					<div className={styles.airport_infos}>
						<span>{flight.arrivalDateTimeDisplay}</span>
						<span>{flight.originAirport.city.code}</span>
						<span>{flight.originAirport.city.name}</span>
					</div>
					<div className={styles.lineWrapper}>
						<hr className={styles.line} />
					</div>
					<div className={styles.airport_infos}>
						<span>{flight.departureDateTimeDisplay}</span>
						<span>{flight.destinationAirport.city.code}</span>
						<span>{flight.destinationAirport.city.name}</span>
					</div>
					<div>
						<p>Uçuş Süresi</p>
						<span>{flight.flightDuration}</span>
					</div>
					<div>
						<CabinOptions
							cabinClasses={cabinClasses}
							flight={flight}
							index={index}
							handleRadioChange={handleRadioChange}
						/>
					</div>
				</div>
				<div className={styles.subcategory_card_wrapper}>
					{fareCategory?.subcategories.map((subcat: Subcategory) => {
						const isEcoFly = subcat.brandCode === 'ecoFly';
						const discountedPrice =
							promotionalCode && isEcoFly
								? subcat.price.amount * 0.5
								: subcat.price.amount;
						return (
							<div
								key={subcat.brandCode}
								className={styles.subcategory_card}
							>
								<div className={styles.title_and_price}>
									<b>{subcat.brandCode}</b>
									<span>{`${subcat.price.currency} ${discountedPrice}`}</span>
								</div>
								<div className={styles.subcat_rights}>
									{subcat?.rights?.map(right => (
										<p key={right}>{right}</p>
									))}
								</div>
								<Button
									onClick={() =>
										handleSelectFlight(subcat.status, {
											amount: discountedPrice,
											currency: subcat.price.currency,
										})
									}
									disabled={promotionalCode && !isEcoFly}
									sx={{
										backgroundColor: 'red',
										color: 'white',
										'&:hover': {
											backgroundColor: 'red',
										},
									}}
									variant='contained'
								>
									Uçuşu seç
								</Button>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
};

export default FlightItem;
