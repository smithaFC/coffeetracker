import { format } from 'date-fns';

export function getDate(formatPattern = 'Pp') {
	return format(new Date(), formatPattern);
}
