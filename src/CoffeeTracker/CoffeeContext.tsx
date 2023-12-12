'use client';
import { Dispatch, PropsWithChildren, createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { CoffeeBrew, DailyStats } from './types';
import { getDate } from './utils';
import { handleBrewAction } from './ReducerActions';
import { useCoffeeStorage } from './useCoffeeData';
import { compareAsc, compareDesc } from 'date-fns';
import { useNewDay } from './useNewDayJob';

export interface CoffeeContext {
	potsOfCoffeeBrewedToday: number;
	currentDay: string;
	todaysBrews: CoffeeBrew[];
	previousDaysData: DailyStats[];
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

function coffeeReducer(state: CoffeeContext, { action, payload }: CoffeeAction): CoffeeContext {
	switch (action) {
		case COFFEE_ACTIONS.BREW: {
			const newCoffeeList = handleBrewAction(state.todaysBrews);
			newCoffeeList.sort((a, b) => compareDesc(new Date(a.timeBrewed), new Date(b.timeBrewed)));
			return { ...state, potsOfCoffeeBrewedToday: newCoffeeList.length, todaysBrews: newCoffeeList };
		}
		case COFFEE_ACTIONS.UNDO: {
			const currentCoffees = [...state.todaysBrews];
			currentCoffees.shift();
			currentCoffees.sort((a, b) => compareDesc(new Date(a.timeBrewed), new Date(b.timeBrewed)));
			return { ...state, todaysBrews: currentCoffees, potsOfCoffeeBrewedToday: currentCoffees.length };
		}
		case COFFEE_ACTIONS.RESET_TODAYS: {
			return { ...state, todaysBrews: [] };
		}
		case COFFEE_ACTIONS.HARD_RESET: {
			return { ...defaultState, currentDay: simpleDateFormatted() };
		}
		case COFFEE_ACTIONS.NEW_DAY: {
			return {
				...defaultState,
				currentDay: simpleDateFormatted(),
				previousDaysData: [...(state.previousDaysData as DailyStats[]), payload as DailyStats],
			};
		}
		default:
			return { ...state };
	}
}

function isNewDay(compareToValue: string) {
	const lastDate = new Date(compareToValue);
	const todayDate = new Date(simpleDateFormatted());
	const compare = compareDesc(lastDate, todayDate);
	return compare > 0;
}

function CoffeeProvider(props: PropsWithChildren) {
	const [localState, setLocalState] = useCoffeeStorage<CoffeeContext>('fcCoffeev2', defaultState);
	const [state, dispatch] = useReducer(coffeeReducer, {
		...localState,
	});

	const intervalRef = useRef<NodeJS.Timeout>();
	const callbackRef = useRef(() => {});
	useEffect(() => {
		setLocalState(state);
	}, [state, setLocalState]);

	useEffect(() => {
		const newDayFunction = () => {
			const newDay = isNewDay(state.currentDay);
			if (newDay) {
				const action: CoffeeAction = {
					action: COFFEE_ACTIONS.NEW_DAY,
					payload: {
						count: state.potsOfCoffeeBrewedToday,
						date: simpleDateFormatted(),
						brewsForDay: [...state.todaysBrews],
					},
				};
				dispatch(action);
			}
		};
		const id = setInterval(newDayFunction, 30000);
		return () => clearInterval(id);
	}, [state]);

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
