// Header.test.tsx
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
	it('renders the header with the correct title', () => {
		render(<Header />);

		// Check if the main title is rendered
		expect(screen.getByText(/turkishairlines.com/i)).toBeInTheDocument();
		expect(screen.getByText(/search/i)).toBeInTheDocument();
		expect(screen.getByText(/flight challenge/i)).toBeInTheDocument();
	});

	it('does not apply the searchPage class when isSearchPage is false', () => {
		const { container } = render(<Header isSearchPage={false} />);
		expect(container.firstChild).not.toHaveClass('searchPage');
	});
});
