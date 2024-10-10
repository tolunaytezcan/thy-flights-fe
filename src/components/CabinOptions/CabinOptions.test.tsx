import { fireEvent, render, screen } from '@testing-library/react';
import CabinOptions from './CabinOptions';
import { Flight } from '@App/constants/flights';
import { describe, expect, it, vi } from 'vitest';

describe('CabinOptions', () => {
	const mockFlight: Flight = {
		originAirport: {
			name: 'Istanbul Airport',
			code: 'IST',
			city: {
				code: 'IST',
				name: 'Istanbul',
			},
			country: {
				code: 'TR',
				name: 'Turkey',
			},
		},
		destinationAirport: {
			name: 'Antalya Airport',
			code: 'AYT',
			city: {
				code: 'AYT',
				name: 'Antalya',
			},
			country: {
				code: 'TR',
				name: 'Turkey',
			},
		},
		arrivalDateTimeDisplay: '01:15',
		departureDateTimeDisplay: '02:45',
		flightDuration: '1s 30d',
		fareCategories: {
			BUSINESS: {
				subcategories: [
					{
						brandCode: 'ecoFly',
						price: {
							amount: 400,
							currency: 'TRY',
						},
						order: 1,
						status: 'AVAILABLE',
						rights: ['20 kg Bagaj', 'Ucresiz Yemek Secimi'],
					},
					{
						brandCode: 'extraFly',
						price: {
							amount: 500,
							currency: 'TRY',
						},
						order: 2,
						status: 'AVAILABLE',
						rights: [
							'30 kg Bagaj',
							'Standart Koltuk Secimi',
							'Ucresiz Yemek Secimi',
						],
					},
					{
						brandCode: 'primeFly',
						price: {
							amount: 800.99,
							currency: 'TRY',
						},
						order: 3,
						status: 'AVAILABLE',
						rights: [
							'50 kg Bagaj',
							'Standart Koltuk Secimi',
							'Ucretsiz Degisiklik',
							'Ucresiz Yemek Secimi',
						],
					},
				],
			},
			ECONOMY: {
				subcategories: [
					{
						brandCode: 'ecoFly',
						price: {
							amount: 242,
							currency: 'TRY',
						},
						order: 1,
						status: 'AVAILABLE',
						rights: ['15 kg Bagaj'],
					},
					{
						brandCode: 'extraFly',
						price: {
							amount: 290,
							currency: 'TRY',
						},
						order: 2,
						status: 'AVAILABLE',
						rights: ['20 kg Bagaj', 'Standart Koltuk Secimi'],
					},
					{
						brandCode: 'primeFly',
						price: {
							amount: 351.99,
							currency: 'TRY',
						},
						order: 3,
						status: 'AVAILABLE',
						rights: [
							'25 kg Bagaj',
							'Standart Koltuk Secimi',
							'Ucretsiz Degisiklik',
						],
					},
				],
			},
		},
	};

	const mockHandleRadioChange = vi.fn();

	it('displays the correct selected value', () => {
		const cabinClasses = ['economy', 'economy'];
		render(
			<CabinOptions
				cabinClasses={cabinClasses}
				flight={mockFlight}
				index={0}
				handleRadioChange={mockHandleRadioChange}
				promotionalCode={true}
			/>,
		);

		expect(screen.getByLabelText('ECONOMY')).toBeChecked();
		expect(screen.getByLabelText('BUSINESS')).not.toBeChecked();
	});

	it('calls handleRadioChange when a cabin option is selected', () => {
		const cabinClasses = [null, null];

		render(
			<CabinOptions
				cabinClasses={cabinClasses}
				flight={mockFlight}
				index={0}
				handleRadioChange={mockHandleRadioChange}
				promotionalCode={true}
			/>,
		);

		fireEvent.click(screen.getByLabelText('ECONOMY'));
		expect(mockHandleRadioChange).toHaveBeenCalledWith(
			0,
			expect.any(Object),
		);
		fireEvent.click(screen.getByLabelText('BUSINESS'));
		expect(mockHandleRadioChange).toHaveBeenCalledWith(
			0,
			expect.any(Object),
		);
	});
});
