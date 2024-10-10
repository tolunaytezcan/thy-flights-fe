// SearchBox.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import SearchBox from './SearchBox';
import { cities } from '@App/constants/cities';

describe('SearchBox', () => {
	const mockSetSelectedOriginCity = vi.fn();
	const mockSetSelectedDestinationCity = vi.fn();

	afterEach(() => {
		mockSetSelectedOriginCity.mockClear();
		mockSetSelectedDestinationCity.mockClear();
	});

	it('renders origin and destination autocomplete fields and date picker', () => {
		render(
			<SearchBox
				setSelectedOriginCity={mockSetSelectedOriginCity}
				setSelectedDestinationCity={mockSetSelectedDestinationCity}
			/>,
		);

		expect(screen.getByPlaceholderText(/Nereden/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/Nereye/i)).toBeInTheDocument();

		expect(screen.getByLabelText(/Tarih/i)).toBeInTheDocument();
	});

	it('calls setSelectedOriginCity with the selected origin city', () => {
		render(
			<SearchBox
				setSelectedOriginCity={mockSetSelectedOriginCity}
				setSelectedDestinationCity={mockSetSelectedDestinationCity}
			/>,
		);

		const originInput = screen.getByPlaceholderText(/nereden/i);
		fireEvent.change(originInput, { target: { value: cities[0].label } });
		fireEvent.click(screen.getByText(cities[0].label));

		expect(mockSetSelectedOriginCity).toHaveBeenCalledWith(cities[0]);
	});

	it('calls setSelectedDestinationCity with the selected destination city', () => {
		render(
			<SearchBox
				setSelectedOriginCity={mockSetSelectedOriginCity}
				setSelectedDestinationCity={mockSetSelectedDestinationCity}
			/>,
		);

		const destinationInput = screen.getByPlaceholderText(/nereye/i);
		fireEvent.change(destinationInput, {
			target: { value: cities[1].label },
		});
		fireEvent.click(screen.getByText(cities[1].label)); // Select the second city

		expect(mockSetSelectedDestinationCity).toHaveBeenCalledWith(cities[1]);
	});

	it('renders the submit button', () => {
		render(
			<SearchBox
				setSelectedOriginCity={mockSetSelectedOriginCity}
				setSelectedDestinationCity={mockSetSelectedDestinationCity}
			/>,
		);

		expect(screen.getByTestId('search-button')).toBeInTheDocument();
	});
});
