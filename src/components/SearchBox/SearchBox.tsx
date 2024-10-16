import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PassengerPopover from '@App/components/PassengerPopover/PassengerPopover';
import styles from './SearchBox.module.scss';
import { cities, ICity } from '@App/constants/cities';
import 'dayjs/locale/en-gb';

interface SearchBoxProps {
	setSelectedOriginCity: (city: ICity) => void;
	setSelectedDestinationCity: (city: ICity) => void;
}

const SearchBox = ({
	setSelectedOriginCity,
	setSelectedDestinationCity,
}: SearchBoxProps) => {
	const renderAutocomplete = (id: string, label: string) => (
		<Autocomplete
			id={id}
			data-testid={id}
			disablePortal
			options={cities}
			sx={{
				width: 200,
				'& .MuiFormLabel-root': {
					top: '11px',
					color: '#063048',
					fontWeight: 'bold',
					fontSize: '16px',
				},
				'& .MuiInputBase-root': {
					backgroundColor: 'white',
				},
			}}
			renderInput={params => (
				<TextField
					{...params}
					placeholder={label}
					InputProps={{
						...params.InputProps,
						startAdornment:
							id === 'origin' ? (
								<FlightLandIcon sx={{ marginRight: 1 }} />
							) : (
								<FlightTakeoffIcon sx={{ marginRight: 1 }} />
							),
					}}
				/>
			)}
			onChange={(event, value) => {
				if (id === 'origin') {
					setSelectedOriginCity(
						value ?? { id: 0, value: '', label: '' },
					);
				} else {
					setSelectedDestinationCity(
						value ?? { id: 0, value: '', label: '' },
					);
				}
			}}
		/>
	);

	const renderDateTimePicker = () => (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
			<DemoContainer components={['DateTimePicker']}>
				<DateTimePicker
					sx={{
						backgroundColor: '#252a38',
						color: 'white',
						'& .MuiInputBase-root': { color: 'white' },
						'& .MuiSvgIcon-root': { color: 'white' },
						'& .MuiInputLabel-root': { color: 'white' },
					}}
					views={['year', 'month', 'day']}
					label='Tarih'
				/>
			</DemoContainer>
		</LocalizationProvider>
	);

	return (
		<div className={styles.search_box_wrapper}>
			<div className={styles.origin_city}>
				{renderAutocomplete('origin', 'Nereden')}
			</div>
			<div className={styles.destination_city}>
				{renderAutocomplete('destination', 'Nereye')}
			</div>
			<div className={styles.date_picker}>{renderDateTimePicker()}</div>
			<div className={styles.popover}>
				<PassengerPopover />
			</div>
			<div>
				<Button
					data-testid='search-button'
					variant='contained'
					type='submit'
					sx={{
						height: '55px',
						backgroundColor: 'red',
						color: 'white',
						'&:hover': { backgroundColor: 'red.500' },
					}}
				>
					<ArrowForwardIosIcon />
				</Button>
			</div>
		</div>
	);
};

export default SearchBox;
