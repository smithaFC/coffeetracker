import { CoffeeBrew } from './types';
import { getDate } from './utils';

export function handleBrewAction(array: CoffeeBrew[]) {
	const newCoffee: CoffeeBrew = {
		timeBrewed: getDate(),
		timestamp: new Date().getTime(),
	};
	return [...array, newCoffee];
}
