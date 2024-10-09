import Header from '@App/layout/Header/Header';
import React from 'react';

import styles from './FlightListing.module.scss';

const FlightListing: React.FC = () => {
	return (
		<div className={styles.wrapper}>
			<Header isSearchPage />
			<div className={styles.search_area}>
				<span className={styles.hello}>Merhaba</span>
				<span className={styles.explore}>
					Nereyi keşfetmek istersiniz?
				</span>

				<div className={styles.search_comp}>SearchComponent</div>
			</div>
		</div>
	);
};

export default FlightListing;
