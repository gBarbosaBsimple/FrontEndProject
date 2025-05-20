import { HolidayPeriod } from "./holidayPeriodInterface";
export interface HolidayPlan{
    id: number;
    collaboratorId:number;
    holidayPeriod:HolidayPeriod[]
}