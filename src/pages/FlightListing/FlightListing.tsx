import React from 'react';

import Header from '@App/layout/Header/Header';

import styles from './FlightListing.module.scss';

const FlightListing: React.FC = () => {
	return (
		<div className={styles.wrapper}>
			<Header />
		</div>
	);
};

export default FlightListing;
