import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorModal } from './ErrorModal';
import { vi } from 'vitest';

describe('ErrorModal', () => {
	const mockOnClose = vi.fn();

	afterEach(() => {
		mockOnClose.mockClear();
	});

	it('renders correctly when open', () => {
		render(
			<ErrorModal
				open={true}
				onClose={mockOnClose}
				message='Test error message'
			/>,
		);

		expect(
			screen.getByRole('heading', { name: /uçuş bulunamadı!/i }),
		).toBeInTheDocument();
		expect(screen.getByText('Test error message')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /kapat/i }),
		).toBeInTheDocument();
	});

	it('does not render when closed', () => {
		render(
			<ErrorModal
				open={false}
				onClose={mockOnClose}
				message='Test error message'
			/>,
		);

		expect(
			screen.queryByRole('heading', { name: /uçuş bulunamadı!/i }),
		).not.toBeInTheDocument();
	});

	it('calls onClose when close button is clicked', () => {
		render(
			<ErrorModal
				open={true}
				onClose={mockOnClose}
				message='Test error message'
			/>,
		);

		fireEvent.click(screen.getByLabelText(/close/i));
		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});
});
