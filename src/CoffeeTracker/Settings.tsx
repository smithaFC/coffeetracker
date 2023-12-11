import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Fab,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { hardResetAllData, useCoffeeContext } from './CoffeeContext';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function Settings() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Fab
				sx={{
					position: 'fixed',
					right: '1em',
				}}
				onClick={() => {
					setOpen(true);
				}}
			>
				<SettingsIcon />
			</Fab>
			<SettingsDialog open={open} onClose={() => setOpen(false)} />
		</>
	);
}

export function SettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { dispatch } = useCoffeeContext();

	const handleHardReset = () => {
		hardResetAllData(dispatch);
	};

	return (
		<Dialog open={open}>
			<DialogTitle>
				<Typography sx={{ fontWeight: 'bold', fontSize: '1.25rem' }} textAlign={'center'}>
					Settings
				</Typography>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<IconButton onClick={handleHardReset}>
					<Stack justifyContent={'center'} alignItems={'center'}>
						<RestartAltIcon />
						<Typography>Reset stored data</Typography>
					</Stack>
				</IconButton>
			</DialogContent>
			<DialogActions>
				<Button variant='contained' color='error' onClick={onClose}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}
