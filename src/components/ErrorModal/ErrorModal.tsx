import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const ErrorModal: React.FC<{
	open: boolean;
	onClose: () => void;
	message: string | null;
}> = ({ open, onClose, message }) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 500,
					height: 200,
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
				}}
			>
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: 'absolute',
						top: 8,
						right: 8,
						color: 'grey',
					}}
				>
					<CloseIcon />
				</IconButton>
				<Typography variant='h6' component='h2'>
					Uçuş bulunamadı!
				</Typography>
				<Typography sx={{ mt: 2 }}>{message}</Typography>
				<Button
					onClick={onClose}
					sx={{
						mt: 2,
						color: 'white',
						backgroundColor: 'red',
					}}
					variant='text'
				>
					Kapat
				</Button>
			</Box>
		</Modal>
	);
};
