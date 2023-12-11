'use client';
import { Container, Typography, Stack, Button } from '@mui/material';
import React from 'react';
import { brewPotFunction, undoLastBrew, useCoffeeContext } from './CoffeeContext';
import Settings from './Settings';

export const CoffeeCounter = () => {
	const { dispatch, coffeeState } = useCoffeeContext();
	const { currentDay, potsOfCoffeeBrewedToday, todaysBrews } = coffeeState;
	const increment = () => {
		brewPotFunction(dispatch);
	};

	const decrememnt = () => {
		undoLastBrew(dispatch);
	};

	function getMostRecentBrewTime() {
		if (todaysBrews.length === 0) return '';
		const coffee = todaysBrews.sort((a, b) => (a.timeBrewed < b.timeBrewed ? 1 : 0))[0];
		return coffee.timeBrewed;
	}

	return (
		<Container>
			<Settings />
			<Stack justifyContent={'flex-start'} alignItems={'center'} spacing={4} sx={{ height: '100%', my: 'auto' }}>
				<Typography>{`Current day: ${currentDay}`}</Typography>

				<Typography>{`Total pots of coffee today: ${potsOfCoffeeBrewedToday}`}</Typography>
				<Stack direction={'row'} spacing={4}>
					<Button variant='contained' onClick={decrememnt}>
						Undo
					</Button>
					<Button variant='contained' onClick={increment}>
						Brew
					</Button>
				</Stack>
				<Typography>{`Last brew time: ${getMostRecentBrewTime()}`}</Typography>
			</Stack>
		</Container>
	);
};
