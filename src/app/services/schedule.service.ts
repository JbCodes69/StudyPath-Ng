import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  
  constructor() {}

  getSchedules(): any[] {
    return JSON.parse(localStorage.getItem('schedules') || '[]');
  }

  saveSchedule(schedule: any): void {
    const schedules = this.getSchedules();
    schedules.push(schedule);
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }

  deleteSchedule(course: string, day: string): void {
    let schedules = this.getSchedules().filter(sch => !(sch.course === course && sch.day === day));
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }

  deleteSchedulesByCourse(courseName: string): void {
    let schedules = this.getSchedules().filter(sch => sch.course !== courseName);
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }
}
