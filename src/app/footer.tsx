import { Stack, Typography } from '@mui/material';

export default function Footer() {
	return (
		<Stack
			sx={{ position: 'fixed', height: '10%', bottom: '1em', left: 0, textAlign: 'center', width: '100%' }}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<Typography>{`This app is brought to you by Adam. An app you didn't know you wanted`}</Typography>
		</Stack>
	);
}
