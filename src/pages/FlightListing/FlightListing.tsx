import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	FormControl,
	FormControlLabel,
	FormGroup,
	Radio,
	RadioGroup,
	Switch,
} from '@mui/material';

import Header from '@App/layout/Header/Header';

import {
	FareCategory,
	Flight,
	Price,
	Subcategory,
} from '@App/constants/flights';

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

	const renderCabinOptions = (flight: Flight, index: number) => (
		<FormControl
			sx={{
				'& .MuiFormGroup-root': {
					flexDirection: 'row',
					gap: '10px',
				},
			}}
		>
			<RadioGroup
				value={cabinClasses[index] ?? ''}
				name={`cabin-${index}`}
				onChange={e => handleRadioChange(index, e)}
			>
				{['ECONOMY', 'BUSINESS'].map(cabin => (
					<div key={cabin} className={styles.flex}>
						<FormControlLabel
							value={cabin.toLowerCase()}
							control={<Radio />}
							label={cabin}
							sx={{
								'& .MuiFormControlLabel-label': {
									borderBottom: '1px solid grey',
									color: 'grey',
									fontSize: '10px',
								},
							}}
						/>
						<div className={styles.radio_price}>
							<span>Yolcu Başına</span>
							<span className={styles.amount}>
								TRY
								{flight.fareCategories[
									cabin as keyof typeof flight.fareCategories
								].subcategories[0].price.amount.toString()}
							</span>
						</div>
					</div>
				))}
			</RadioGroup>
		</FormControl>
	);

	const renderFlightItem = (flight: Flight, index: number) => {
		const selectedCabinClass = cabinClasses[index];
		const fareCategory: FareCategory = ((selectedCabinClass &&
			flight.fareCategories[
				selectedCabinClass.toUpperCase() as keyof typeof flight.fareCategories
			]) ??
			null) as FareCategory;

		return (
			<div
				key={`${flight.arrivalDateTimeDisplay}-${flight.departureDateTimeDisplay}-index`}
				className={styles.flight_item}
			>
				<div className={styles.flight_box}>
					<div className={styles.airport_infos}>
						<span>{flight.arrivalDateTimeDisplay}</span>
						<span>
							{flight.originAirport.city.code} -{' '}
							{flight.originAirport.city.name}
						</span>
					</div>
					<div className={styles.lineWrapper}>
						<hr className={styles.line} />
					</div>
					<div className={styles.airport_infos}>
						<span>{flight.departureDateTimeDisplay}</span>
						<span>
							{flight.destinationAirport.city.code} -{' '}
							{flight.destinationAirport.city.name}
						</span>
					</div>
					<div>
						<p>Uçuş Süresi</p>
						<span>{flight.flightDuration}</span>
					</div>
					<div>{renderCabinOptions(flight, index)}</div>
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
	};

	const renderFlightList = () =>
		flights.length > 0 ? (
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
				{sortedFlights.map((flight: Flight, index: number) =>
					renderFlightItem(flight, index),
				)}
			</div>
		) : (
			<div>
				<p>Uçuş bulunamadı</p>
			</div>
		);

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
					{renderFlightList()}
				</div>
			</div>
		</div>
	);
};

export default FlightListing;
