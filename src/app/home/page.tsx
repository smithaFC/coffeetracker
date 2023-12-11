'use client';
import { FullCountCoffee } from '@/CoffeeTracker/FullCountCoffee';
import { useEffect, useState } from 'react';

export default function Home() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);
	return isClient && <FullCountCoffee />;
}
