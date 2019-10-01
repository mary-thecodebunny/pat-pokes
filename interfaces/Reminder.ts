/*
 * Base class for all reminders
 */ 
export interface IReminder {
    title: string;
    endDate: Date;
    id: string;
}