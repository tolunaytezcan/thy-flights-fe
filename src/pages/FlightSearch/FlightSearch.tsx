import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchFlights } from '@App/api/useFetchFlights';

import Header from '@App/layout/Header/Header';

import SearchBox from '@App/components/SearchBox/SearchBox';
import { ErrorModal } from '@App/components/ErrorModal/ErrorModal';

import { ICity } from '@App/constants/cities';

import styles from './FlightSearch.module.scss';

const FlightSearch: React.FC = () => {
	const navigate = useNavigate();
	const { flights, loading, error } = useFetchFlights();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [modalMessage, setModalMessage] = useState<string | null>(null);

	const [selectedOriginCity, setSelectedOriginCity] = useState<ICity>({
		id: 0,
		value: '',
		label: '',
	});
	const [selectedDestinationCity, setSelectedDestinationCity] =
		useState<ICity>({
			id: 0,
			value: '',
			label: '',
		});

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!selectedOriginCity.value || !selectedDestinationCity.value) {
			setModalMessage('Lütfen uçuş yapılacak olan şehirleri seçiniz');
			setModalOpen(true);
			return;
		}
 
		if (selectedOriginCity.value === selectedDestinationCity.value) {
			setModalMessage('Aynı şehirler arası uçuş yapılamaz');
			setModalOpen(true);
			return;
		}

		const filteredFlights = flights.filter(
			flight =>
				flight?.originAirport?.city?.name?.toLowerCase() ===
					selectedOriginCity.value &&
				flight?.destinationAirport?.city?.name?.toLowerCase() ===
					selectedDestinationCity.value,
		);

		if (
			!selectedOriginCity.value ||
			!selectedDestinationCity.value ||
			filteredFlights.length === 0
		) {
			setModalMessage(
				'Lütfen uçuş yapılacak olan şehirleri yeniden seçiniz',
			);
			setModalOpen(true);
			return;
		}

		navigate('/flights');
		localStorage.setItem('originCity', JSON.stringify(selectedOriginCity));
		localStorage.setItem(
			'destinationCity',
			JSON.stringify(selectedDestinationCity),
		);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setModalMessage(null);
	};

	return (
		<div className={styles.wrapper}>
			<Header isSearchPage />
			<div className={styles.search_area}>
				<span className={styles.hello}>Merhaba</span>
				<span className={styles.explore}>
					Nereyi keşfetmek istersiniz?
				</span>

				{loading && <p>Loading flights...</p>}
				{error && <p className={styles.error}>Error: {error}</p>}

				<div className={styles.search_comp}>
					<form className={styles.searchBar} onSubmit={handleSearch}>
						<SearchBox
							setSelectedOriginCity={setSelectedOriginCity}
							setSelectedDestinationCity={
								setSelectedDestinationCity
							}
						/>
					</form>
				</div>

				<ErrorModal
					open={modalOpen}
					onClose={handleCloseModal}
					message={modalMessage}
				/>
			</div>
		</div>
	);
};

export default FlightSearch;
