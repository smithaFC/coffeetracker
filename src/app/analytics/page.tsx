'use client';
import { Card, CircularProgress, Container, Stack, Typography } from '@mui/material';

export default function Analytics() {
	return (
		<Container fixed sx={{ height: '100dvh' }}>
			<Stack height='inherit' spacing={4} justifyContent={'center'} alignItems={'center'} sx={{ my: 'auto' }}>
				<Card sx={{ p: '8px' }}>
					<Typography>
						this page will eventually contain very usefull graphs and charts based on Coffee Usage. Please be patient
						while development is progress. - Adam
					</Typography>
				</Card>
				<CircularProgress />
			</Stack>
		</Container>
	);
}
