'use client'
import { Container, Typography, Stack, Button } from '@mui/material';
import React from 'react';

type PrevCoffee = {
    count:number;
    date:string;
}
interface State {
	count: number;
	prevCount: Array<PrevCoffee>;
    lastBrewTime :string;
}

export const CoffeeCounter = () => {
	const [state, setState] = useLocalStorage('fcCoffee', { count: 0, prevCount: [], lastBrewTime: '' });

	const increment = () => {
		setState((prev: State) => {
			return {
				...prev,
				count: prev.count + 1,
                lastBrewTime : new Date()
			};
		});
	};

	const decrememnt = () => {
		setState((prev: State) => ({ ...prev, count: prev.count <= 0 ? 0 : prev.count - 1,
            lastBrewTime : new Date() }));
	};

	const reset = () => {
        
		setState((prev: State) => {
            const newState = {...prev};
            const lastIteration : PrevCoffee = {
                count : newState.count,
                date: new Date().toISOString()
            }
            return {
                count:0,
                prevCount: [...newState.prevCount, lastIteration],
                lastBrewTime : ''
            }
        });
	};

	return (
		<Container>
			<Stack justifyContent={'center'} alignItems={'center'} spacing={4}>
				<Typography>FullCount Coffee Tracker v1.0</Typography>

					<Typography>{`Total coffee's brewed: ${state.count}`}</Typography>
				<Stack direction={'row'} spacing={4}>
					<Button variant='contained' onClick={decrememnt}>
                     Remove 1
					</Button>
					<Button variant='contained' onClick={increment}>
                        Add 1
					</Button>
				</Stack>
                <Typography>{`Last brew time: ${state.lastBrewTime}`}</Typography>
				<Button variant='contained' color='error' onClick={reset}>
					reset
				</Button>

                <ul>
                {coffeeString(state.prevCount).map(str => (<li key={str}><Typography>{str}</Typography></li>))}
                </ul>
               
			</Stack>
		</Container>
	);
};


function coffeeString(lastBews : Array<PrevCoffee>){
    const newString = lastBews.map(({count,date}) => {
        return `Coffee's brewed: ${count} on date: ${date}`;
    }).reverse();

    return newString;
}

const useLocalStorage = (
	key: string,
	defaultValue: any,
	// the = {} fixes the error we would get from destructuring when no argument was passed
	// Check https://jacobparis.com/blog/destructure-arguments for a detailed explanation
	{ serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
	const [state, setState] = React.useState(() => {
        if (typeof window !== "undefined") {
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

	const prevKeyRef = React.useRef(key);

	// Check the example at src/examples/local-state-key-change.js to visualize a key change
	React.useEffect(() => {
		const prevKey = prevKeyRef.current;
		if (prevKey !== key) {
			window.localStorage.removeItem(prevKey);
		}
		prevKeyRef.current = key;
		window.localStorage.setItem(key, serialize(state));
	}, [key, state, serialize]);

	return [state, setState];
};

export default useLocalStorage;
