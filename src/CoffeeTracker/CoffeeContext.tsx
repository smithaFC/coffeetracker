'use client';
import { Dispatch, PropsWithChildren, ReducerState, createContext, useContext, useEffect, useReducer } from 'react';
import { CoffeeBrew, DailyStats } from './types';
import { getDate } from './utils';
import { handleBrewAction } from './ReducerActions';
import { useCoffeeStorage } from './useCoffeeData';

interface CoffeeContext {
	potsOfCoffeeBrewedToday: number;
	currentDay: string;
	todaysBrews: CoffeeBrew[];
	previousDaysData: DailyStats | [];
	dayToCompare: string;
}
export function simpleDateFormatted() {
	return getDate('LL/dd/yyyy');
}

const defaultState: CoffeeContext = {
	potsOfCoffeeBrewedToday: 0,
	currentDay: simpleDateFormatted(),
	todaysBrews: [],
	previousDaysData: [],
	dayToCompare: getDate('yyyy/mm/LL'),
};
const CoffeeContext = createContext({});

type CoffeeAction = {
	payload: DailyStats | DailyStats[] | string | number | null | CoffeeBrew | CoffeeBrew[];
	action: COFFEE_ACTIONS;
};
const enum COFFEE_ACTIONS {
	BREW = 'BREW',
	RESET_TODAYS = 'RESET_TODAY',
	HARD_RESET = 'HARD_RESET',
	UNDO = 'undo',
	NEW_DAY = 'NEW_DAY',
}

function coffeeReducer(state: CoffeeContext, { action }: CoffeeAction): CoffeeContext {
	switch (action) {
		case COFFEE_ACTIONS.BREW: {
			const nextValue = state.potsOfCoffeeBrewedToday++;
			const newCoffee = handleBrewAction(state.todaysBrews);
			return { ...state, potsOfCoffeeBrewedToday: nextValue, todaysBrews: newCoffee };
		}
		case COFFEE_ACTIONS.UNDO: {
			const currentCoffees = [...state.todaysBrews];
			currentCoffees.shift();
			return { ...state, todaysBrews: currentCoffees, potsOfCoffeeBrewedToday: currentCoffees.length };
		}
		case COFFEE_ACTIONS.RESET_TODAYS: {
			return { ...state, todaysBrews: [] };
		}
		case COFFEE_ACTIONS.HARD_RESET: {
			return { ...defaultState };
		}
		case COFFEE_ACTIONS.NEW_DAY: {
			return { ...state, potsOfCoffeeBrewedToday: 0, currentDay: simpleDateFormatted() };
		}
		default:
			return { ...state };
	}
}

function CoffeeProvider(props: PropsWithChildren) {
	const [localState, setLocalState] = useCoffeeStorage('fcCoffeev2', defaultState);
	const [state, dispatch] = useReducer(coffeeReducer, {
		...localState,
		potsOfCoffeeBrewedToday: 0,
		currentDay: simpleDateFormatted(),
	});

	useEffect(() => {
		setLocalState(state);
	}, [state, setLocalState]);

	return <CoffeeContext.Provider value={{ coffeeState: state, dispatch }}>{props.children}</CoffeeContext.Provider>;
}

interface CoffeeContextValues {
	dispatch: Dispatch<CoffeeAction>;
	coffeeState: CoffeeContext;
}

export function useCoffeeContext() {
	const ctx = useContext(CoffeeContext);
	if (!ctx) throw new Error('not inside coffee context');
	return ctx as CoffeeContextValues;
}

export const brewPotFunction = (dispatch: Dispatch<CoffeeAction>) => {
	const action: CoffeeAction = { action: COFFEE_ACTIONS.BREW, payload: null };
	dispatch(action);
};

export const undoLastBrew = (dispatch: Dispatch<CoffeeAction>) => {
	const action: CoffeeAction = { action: COFFEE_ACTIONS.UNDO, payload: null };
	dispatch(action);
};

export const resetTodaysData = (dispatch: Dispatch<CoffeeAction>) => {
	const action: CoffeeAction = { action: COFFEE_ACTIONS.RESET_TODAYS, payload: null };
	dispatch(action);
};

export const hardResetAllData = (dispatch: Dispatch<CoffeeAction>) => {
	const action: CoffeeAction = { action: COFFEE_ACTIONS.HARD_RESET, payload: null };
	dispatch(action);
};
export { CoffeeProvider };
