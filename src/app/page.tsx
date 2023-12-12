'use client';
import { FullCountCoffee } from '@/CoffeeTracker/FullCountCoffee';
import styles from './page.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);
	return <main className={styles.main}>{isClient && <FullCountCoffee />}</main>;
}
