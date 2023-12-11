'use client';
import { CoffeeProvider, useCoffeeContext } from '@/CoffeeTracker/CoffeeContext';
import { DailyStats } from '@/CoffeeTracker/types';
import { Card, CardContent, CardHeader, CircularProgress, Container, Stack, Typography } from '@mui/material';

export default function Analytics() {
	return (
		<CoffeeProvider>
			<Container fixed sx={{ height: '100dvh' }}>
				<Stack height='inherit' spacing={4} justifyContent={'center'} alignItems={'center'} sx={{ my: 'auto' }}>
					<Card sx={{ p: '8px' }}>
						<CardHeader
							title={
								<Typography>
									this page will eventually contain very usefull graphs and charts based on Coffee Usage. Please be
									patient while development is progress. - Adam
								</Typography>
							}
						></CardHeader>
						<CardContent>
							<Stack spacing={2} justifyContent={'center'}>
								<Typography>Previous Days Data</Typography>
								<PreviousDaysData />
							</Stack>
						</CardContent>
					</Card>
					<CircularProgress />
				</Stack>
			</Container>
		</CoffeeProvider>
	);
}

function PreviousDaysData() {
	const { coffeeState } = useCoffeeContext();

	return (
		<Container>
			<ul>
				{coffeeState.previousDaysData.map((prev: DailyStats, index) => {
					return <li key={prev.date + index}>{`Total for ${prev.date} : ${prev.count}`}</li>;
				})}
			</ul>
		</Container>
	);
}
