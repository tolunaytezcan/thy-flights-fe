import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import FlightSearch from './FlightSearch';
import { useFetchFlights } from '../../api/useFetchFlights';

vi.mock('../../api/useFetchFlights');
vi.mock('react-router-dom', async importOriginal => {
	const actual = await importOriginal();
	return {
		...(typeof actual === 'object' ? actual : {}),
		useNavigate: vi.fn(),
		MemoryRouter: (actual as { MemoryRouter: typeof MemoryRouter })
			.MemoryRouter,
	};
});

describe('FlightSearch component', () => {
	const mockFlights = [
		{
			originAirport: { city: { name: 'istanbul' } },
			destinationAirport: { city: { name: 'ankara' } },
		},
		{
			originAirport: { city: { name: 'izmir' } },
			destinationAirport: { city: { name: 'antalya' } },
		},
	];

	beforeEach(() => {
		(useFetchFlights as Mock).mockReturnValue({
			flights: mockFlights,
			loading: false,
			error: null,
		});
	});

	it('renders FlightSearch component', () => {
		render(
			<MemoryRouter>
				<FlightSearch />
			</MemoryRouter>,
		);

		expect(screen.getByText(/Merhaba/i)).toBeInTheDocument();
		expect(
			screen.getByText(/Nereyi keşfetmek istersiniz/i),
		).toBeInTheDocument();
	});

	it('shows loading text when loading flights', () => {
		(useFetchFlights as Mock).mockReturnValue({
			flights: [],
			loading: true,
			error: null,
		});

		render(
			<MemoryRouter>
				<FlightSearch />
			</MemoryRouter>,
		);

		expect(screen.getByText(/Loading flights/i)).toBeInTheDocument();
	});

	it('shows error message when there is an error', () => {
		(useFetchFlights as Mock).mockReturnValue({
			flights: [],
			loading: false,
			error: 'Failed to fetch flights',
		});

		render(
			<MemoryRouter>
				<FlightSearch />
			</MemoryRouter>,
		);

		expect(
			screen.getByText(/Error: Failed to fetch flights/i),
		).toBeInTheDocument();
	});
});
