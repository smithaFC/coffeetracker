import { useState, useRef, useEffect } from 'react';
import { deserialize, serialize } from 'v8';
export function useCoffeeStorage<T>(
	key: string,
	defaultValue: T | null,
	{ serialize = JSON.stringify, deserialize = JSON.parse } = {}
): [state: T, setState: any] {
	const [state, setState] = useState<T>(() => {
		if (typeof window !== 'undefined') {
			// Client-side-only code
			const valueInLocalStorage = window.localStorage.getItem(key);
			if (valueInLocalStorage) {
				// the try/catch is here in case the localStorage value was set before
				// we had the serialization in place (like we do in previous extra credits)
				try {
					return deserialize(valueInLocalStorage);
				} catch (error) {
					window.localStorage.removeItem(key);
				}
			}
		}
		return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
	});

	const prevKeyRef = useRef(key);

	// Check the example at src/examples/local-state-key-change.js to visualize a key change
	useEffect(() => {
		const prevKey = prevKeyRef.current;
		if (prevKey !== key) {
			window.localStorage.removeItem(prevKey);
		}
		prevKeyRef.current = key;
		window.localStorage.setItem(key, serialize(state));
	}, [key, state, serialize]);

	return [state, setState];
}
