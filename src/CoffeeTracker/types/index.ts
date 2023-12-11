export type DailyStats = {
	count: number;
	date: string;
	brewsForDay: Array<CoffeeBrew>;
};
export interface CoffeeState {
	count: number;
	lastBrewTime: string;
}

export interface CoffeeBrew {
	timeBrewed: string;
	timestamp: number;
}
