import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FlightListing from '@App/pages/FlightListing';
import FlightSearch from '@App/pages/FlightSearch/index';
import Result from '@App/pages/Result';

import styles from '@App/App.module.scss';
import './styles/globals.scss';

const App = () => (
	<div className={styles.wrapper}>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<FlightSearch />} />
				<Route path='/flights' element={<FlightListing />} />
				<Route path='/result' element={<Result />} />
			</Routes>
		</BrowserRouter>
	</div>
);

export default App;
