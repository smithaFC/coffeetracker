'use client';
import { CoffeeProvider, useCoffeeContext } from '@/CoffeeTracker/CoffeeContext';
import { CoffeeBrew, DailyStats } from '@/CoffeeTracker/types';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	CircularProgress,
	Container,
	Divider,
	Stack,
	Typography,
} from '@mui/material';
import { add, format } from 'date-fns';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine } from 'victory';

export default function Analytics() {
	return (
		<CoffeeProvider>
			<Container fixed>
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
							<PreviousDaysData />
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
			<Stack justifyContent={'center'} alignItems={'center'}>
				<Typography textAlign={'start'}>
					{`Todays stats: Total for ${coffeeState.currentDay} : ${coffeeState.potsOfCoffeeBrewedToday}`}
				</Typography>
				{coffeeState.todaysBrews.map((coffee) => (
					<li key={coffee.timestamp}>{coffee.timeBrewed}</li>
				))}
				<Divider flexItem />
				<Box sx={{ width: '100%' }}>
					<Typography sx={{ textAlign: 'start' }}>Previous days data:</Typography>
					{coffeeState.previousDaysData.length === 0 && <Typography>No data</Typography>}
					<Stack justifyContent={'center'} spacing={2} alignItems={'center'}>
						{coffeeState.previousDaysData.map((stat, index) => (
							<DataCard key={stat.date + index} dailyStats={stat} />
						))}
					</Stack>
				</Box>
			</Stack>
		</Container>
	);
}

function DataCard({ dailyStats }: { dailyStats: DailyStats }) {
	return (
		<Card sx={{ minHeight: '30em' }}>
			<CardHeader title={`Data for ${dailyStats.date}`} />
			<Divider />
			<CardContent>
				<Typography>Data:</Typography>
				<ul>
					{dailyStats.brewsForDay.map((data) => (
						<li key={data.timestamp}>{data.timeBrewed}</li>
					))}
				</ul>
				<Divider />
				<DataChart stat={dailyStats} />
			</CardContent>
		</Card>
	);
}

function createDataForChart(stat: DailyStats, dataset: any) {
	const data = [...stat.brewsForDay];
	const totalsForKey = data.reduce((prev: any, current: CoffeeBrew) => {
		const time = getTimeForChart(current);
		prev[time] = { ...prev[time], count: (prev[time]?.count || 0) + 1 };
		return prev;
	}, {});

	const transform = Object.keys(totalsForKey).map((key) => ({
		totals: totalsForKey[key].count,
		time: parseFloat(key),
	}));

	const final = transform.reduce((prev: any, current: any, index: number) => {
		prev[current.time] = current;

		return prev;
	}, dataset);
	const returnArr = Object.keys(final).map((key) => final[key]);
	return returnArr;
}

function DataChart({ stat }: { stat: DailyStats }) {
	const emptySet = getLabelsForTimeOfDay(false).reduce((prev: any, current: any) => {
		prev[current] = { totals: 0, time: current };
		return prev;
	}, {});
	const dataset = createDataForChart(stat, emptySet);
	return (
		<VictoryChart>
			<VictoryAxis
				// tickValues specifies both the number of ticks and where
				// they are placed on the axis
				tickValues={[7, 9, 11, 13, 15]}
				tickFormat={['7:00 AM', '9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM']}
			/>
			<VictoryAxis tickFormat={(x) => `${x} Pots`} tickValues={[1, 2, 3, 4, 5, 6]} dependentAxis />
			<VictoryLine data={dataset} x='time' y='totals' />
		</VictoryChart>
	);
}

function getLabelsForTimeOfDay(asStr: boolean) {
	const date = new Date('2000/01/01');
	const returnData = [];
	const f: string = asStr ? 'p' : 'HH';
	for (let i = 7; i < 17; i++) {
		const str = format(add(date, { hours: i }), f);
		if (asStr) {
			returnData.push(str);
		} else {
			returnData.push(parseFloat(str));
		}
	}
	return returnData;
}

function getTimeForChart(data: CoffeeBrew) {
	return format(new Date(data.timeBrewed), 'HH');
}
