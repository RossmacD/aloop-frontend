import { format } from 'date-fns';

export const formattedDate = (date: string) => format(new Date(parseInt(date)), 'd-MMM-Y');
