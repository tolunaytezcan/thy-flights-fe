import styles from '@App/App.module.scss';
import FlightListing from '@App/pages/FlightListing';

const App = () => {
	return (
		<div className={styles.wrapper}>
			<FlightListing />
		</div>
	);
};

export default App;
