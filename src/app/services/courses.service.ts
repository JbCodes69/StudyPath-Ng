import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScheduleService } from './schedule.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  getCourses() {
    return this.courses$; 
  }
  private courses = new BehaviorSubject<any[]>(this.getCoursesFromStorage());
  courses$ = this.courses.asObservable();

  constructor(private scheduleService: ScheduleService) {} 

  getCoursesFromStorage() {
    const savedCourses = localStorage.getItem('courses');
    return savedCourses ? JSON.parse(savedCourses) : [];
  }

  saveCoursesToStorage(courses: any[]) {
    localStorage.setItem('courses', JSON.stringify(courses));
    this.courses.next(courses);
  }

  deleteCourseFromSchedule(courseId: number) {
    let schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
    
    // Remove schedules where courseId matches
    schedules = schedules.filter((schedule: { courseId: number; }) => schedule.courseId !== courseId);
    
    // Update local storage
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }
}