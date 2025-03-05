import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ScheduleService } from '../../services/schedule.service'; 
import { CoursesService } from '../../services/courses.service';   

declare class Timetable {
  constructor();
  scope: string;
  locations: Array<string>;
  events: Array<any>;
  Renderer(tt: any): any;
  setScope(start: number, end: number): void;
  addLocations(locations: Array<string>): void;
  addEvent(eventName: string, location: string, startDate: Date, endDate: Date): void;
}

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css'
})

export class TimetableComponent implements OnInit {
  timetable: any;
  scheduleForm!: FormGroup;
  isDialogOpen = false;
  courses: { id: any, name: any }[] = [];  
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  hours = Array.from({ length: 24 }, (_, i) => i); 
  minutes = [0, 15, 30, 45];

  constructor(
    private fb: FormBuilder, 
    @Inject(ScheduleService) private scheduleService: ScheduleService,
    private coursesService: CoursesService  
  ) {  
    this.scheduleForm = this.fb.group({
      course: [''],
      day: [''],
      startHour: [''],
      startMinute: [''],
      endHour: [''],
      endMinute: ['']
    });
  }                                                                      
  

  ngOnInit(): void {
    this.loadCourses();  
    this.loadSchedules();
  }

  //Fetch courses from the shared CoursesService
  loadCourses() {
    this.coursesService.getCourses().subscribe(courses => {
      this.courses = courses
    });
  }

  loadSchedules() {
    this.timetable = new Timetable();
    this.timetable.setScope(0, 23);
    this.timetable.addLocations(this.days);
    
    const savedSchedules = this.scheduleService.getSchedules();  

    savedSchedules.forEach((schedule: any) => {
      const startHour = parseInt(schedule.startTime.split(':')[0]);
      const startMinute = parseInt(schedule.startTime.split(':')[1]);
      const endHour = parseInt(schedule.endTime.split(':')[0]);
      const endMinute = parseInt(schedule.endTime.split(':')[1]);

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const currentDay = new Date().getDate();

      this.timetable.addEvent(
        schedule.course,
        schedule.day,
        new Date(currentYear, currentMonth, currentDay, startHour, startMinute),
        new Date(currentYear, currentMonth, currentDay, endHour, endMinute)
      );
    });

    const renderer = new (Timetable as any).Renderer(this.timetable);
    renderer.draw('.timetable');
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  onSubmit() { 
    if (this.scheduleForm.valid) {
      const scheduleData = this.scheduleForm.value;
      const startTimeStr = `${scheduleData.startHour}:${scheduleData.startMinute}`;
      const endTimeStr   = `${scheduleData.endHour}:${scheduleData.endMinute}`;
      const newStartTime = parseInt(scheduleData.startHour) * 60 + parseInt(scheduleData.startMinute);
      const newEndTime = parseInt(scheduleData.endHour) * 60 + parseInt(scheduleData.endMinute);

      console.log(scheduleData.course)

      if (newStartTime >= newEndTime) {  
        alert("End time must be later than start time.");
        return;
      }


      const newSchedule = {
        course_id:scheduleData.course.id,
        course: scheduleData.course.name,
        day: scheduleData.day,
        startTime: startTimeStr,
        endTime: endTimeStr
      };

      this.scheduleService.saveSchedule(newSchedule);  
      this.loadSchedules();
      this.closeDialog();
    }
  }
}