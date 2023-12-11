'use client';
import { useEffect, useRef, useState } from 'react';

export function useNewDay(callback: CallableFunction, compareFunction: CallableFunction) {
	const intervalRef = useRef<NodeJS.Timeout>();
	useEffect(() => {
		if (!intervalRef.current) {
			intervalRef.current = setInterval(() => {
				const isNewDay = compareFunction();
				if (isNewDay) {
					callback();
				}
			}, 30000);
		}
		return () => intervalRef.current && clearInterval(intervalRef.current);
	}, [callback, compareFunction]);
	return {};
}
