import { Flight } from '@App/constants/flights';
import React from 'react';
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@mui/material';

import styles from './CabinOptions.module.scss';

interface CabinOptionsProps {
	cabinClasses: (string | null)[];
	flight: Flight;
	index: number;
	promotionalCode: boolean;
	handleRadioChange: (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>,
	) => void;
}

const CabinOptions = ({
	cabinClasses,
	flight,
	index,
	handleRadioChange,
	promotionalCode,
}: CabinOptionsProps) => (
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
			{['ECONOMY', 'BUSINESS'].map(cabin => {
				const lowestPrice =
					flight.fareCategories[
						cabin as keyof typeof flight.fareCategories
					].subcategories[0].price;

				return (
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
						<div
							data-testid='price-info'
							className={styles.radio_price}
						>
							<span>Yolcu Başına</span>
							<span className={styles.amount}>
								{lowestPrice.currency.toString()}

								{promotionalCode
									? (lowestPrice.amount / 2).toString()
									: lowestPrice.amount.toString()}
							</span>
						</div>
					</div>
				);
			})}
		</RadioGroup>
	</FormControl>
);

export default CabinOptions;
