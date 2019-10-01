import { IReminder } from "./Reminder";
import { IWarning } from "./Warning";
/*
 * Base class for all reminders
 */ 
export interface IRunwayReminder extends IReminder {
    IsReoccuring: boolean;
    DaysOfWeek?: string[];
    Warnings?: IWarning[];
}