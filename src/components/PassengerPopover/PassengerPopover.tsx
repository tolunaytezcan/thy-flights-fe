import React from 'react';

import {
	Button,
	FormControl,
	FormControlLabel,
	Popover,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';
import ManIcon from '@mui/icons-material/Man';
import PeopleIcon from '@mui/icons-material/People';

import { useLocalStorage } from '@App/utils/useLocalStorage';

import styles from './PassengerPopover.module.scss';

const PassengerPopover = () => {
	const [count, setCount] = React.useState<number>(1);
	const [cabinClass, setCabinClass] = React.useState<string>('economy');
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);

	React.useEffect(() => {
		setCount(JSON.parse(localStorage.getItem('passengerCount') ?? '1'));
		setCabinClass(useLocalStorage('cabinClass', 'economy'));
	}, []);

	const updateCount = (delta: number) => {
		setCount(prevCount => {
			const newCount = Math.max(prevCount + delta, 1);
			localStorage.setItem('passengerCount', JSON.stringify(newCount));
			return newCount;
		});
	};

	const togglePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedClass = e.target.value;
		setCabinClass(selectedClass);
		localStorage.setItem('cabinClass', JSON.stringify(selectedClass));
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<>
			<Button
				aria-describedby={id}
				variant='contained'
				onClick={togglePopover}
				sx={{
					height: 56,
					backgroundColor: '#252a38',
					color: 'white',
					'&:hover': { backgroundColor: 'grey.500' },
				}}
			>
				{count > 1 ? (
					<div className={styles.counter_wrapper}>
						<PeopleIcon />
						{count}
					</div>
				) : (
					<ManIcon />
				)}
			</Button>

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<div className={styles.popover_information_area}>
					<p>Kabin ve yolcu seçimi</p>
					<FormControl sx={{ display: 'flex' }}>
						<RadioGroup
							value={cabinClass}
							name='radio-buttons-group'
							onChange={handleRadioChange}
						>
							<div className={styles.radio_group}>
								<FormControlLabel
									value='economy'
									control={<Radio />}
									label='Economy Class'
								/>
								<FormControlLabel
									value='business'
									control={<Radio />}
									label='Business Class'
								/>
							</div>
						</RadioGroup>
					</FormControl>

					<div className={styles.passanger_counter}>
						<p>Yolcu</p>
						<div>
							<Button
								variant='contained'
								onClick={() => updateCount(-1)}
								sx={{
									backgroundColor: 'grey.400',
									color: 'grey.900',
									'&:hover': { backgroundColor: 'grey.500' },
								}}
							>
								-
							</Button>
							<TextField
								value={count}
								size='small'
								inputProps={{
									readOnly: true,
									style: {
										textAlign: 'center',
										border: 'none',
										color: 'black',
									},
								}}
								sx={{
									width: '60px',
									'& .MuiOutlinedInput-root': {
										border: 'none',
										'& fieldset': { display: 'none' },
									},
								}}
							/>
							<Button
								variant='contained'
								onClick={() => updateCount(1)}
								sx={{
									backgroundColor: 'grey.400',
									color: 'grey.900',
									'&:hover': { backgroundColor: 'grey.500' },
								}}
							>
								+
							</Button>
						</div>
					</div>
				</div>
			</Popover>
		</>
	);
};

export default PassengerPopover;
