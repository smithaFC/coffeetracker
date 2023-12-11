'use client';
import { CoffeeProvider } from './CoffeeContext';
import { CoffeeCounter } from './CoffeeCounter';

export function FullCountCoffee() {
	return (
		<CoffeeProvider>
			<CoffeeCounter />
		</CoffeeProvider>
	);
}
