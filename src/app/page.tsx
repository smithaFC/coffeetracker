import Image from 'next/image';
import styles from './page.module.css';
import { CoffeeCounter } from './CoffeCounter';

export default function Home() {
	return (
		<main className={styles.main}>
			<CoffeeCounter />
		</main>
	);
}
