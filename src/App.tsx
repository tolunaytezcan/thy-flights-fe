import styles from '@App/App.module.scss';
import FlightListing from '@App/pages/FlightListing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FlightSearch from './pages/FlightSearch';
import Result from './pages/Result';

import './styles/globals.scss';

const App = () => (
	<div className={styles.wrapper}>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<FlightListing />} />
				<Route path='/search' element={<FlightSearch />} />
				<Route path='/result' element={<Result status='success' />} />
			</Routes>
		</BrowserRouter>
	</div>
);

export default App;
