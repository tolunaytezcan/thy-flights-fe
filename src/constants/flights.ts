export interface Flight {
	originAirport: Airport;
	destinationAirport: Airport;
	arrivalDateTimeDisplay: string;
	departureDateTimeDisplay: string;
	flightDuration: string;
	fareCategories: FareCategories;
}

interface Airport {
	name: string;
	code: string;
	city: City;
	country: Country;
}

interface City {
	code: string;
	name: string;
}

interface Country {
	code: string;
	name: string;
}

interface FareCategories {
	BUSINESS: FareCategory;
	ECONOMY: FareCategory;
}

export interface FareCategory {
	subcategories: Subcategory[];
}

export interface Subcategory {
	brandCode: string;
	price: Price;
	order: number;
	status: string;
	rights: string[];
}

export interface Price {
	amount: number;
	currency: string;
}
