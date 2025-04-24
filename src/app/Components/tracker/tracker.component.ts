import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css'] 
})
export class TrackerComponent implements OnInit {
  // Variables
  trackerData: any[] = [];
  startDate!: Date;
  endDate!: Date;

  ngOnInit() {
    this.loadSchedules();
  }

  loadSchedules() {
    const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');

    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const todayIndex = new Date().getDay();  
    const todayName = dayNames[todayIndex];
  
    const schedulesForToday = schedules.filter((schedule: any) => {

      return schedule.day === todayName;
    });

    
    this.trackerData = schedulesForToday.map((schedule: any) => {
     this.startDate = this.parseTimeAsToday(schedule.startTime);
      this.endDate   = this.parseTimeAsToday(schedule.endTime);

      // Find matching course in courses array by schedule.course_id
      const course = courses.find((c: { id: any }) => String(c.id) === String(schedule.course_id));

      return {
        courseName: course ? course.name : 'COURSE NOT FOUND',
        startTime: this.startDate,
        endTime: this.endDate,
        delay: this.calculateDelay(this.startDate),
        countdown: this.calculateCountdown(this.endDate),
        status: 'Pending',
        countdownRunning: false,
        remainingTime: this.getTimeDifference(this.endDate)
      };
    });

    // console.log(this.calculateCountdown(schedules.endTime));
  }

  private parseTimeAsToday(timeStr: string): Date {
    const [hour, minute] = timeStr.split(':').map(Number);
    const d = new Date();
    d.setHours(hour, minute, 0, 0);
    return d;
  }

  canStartTask(task: any): boolean {
    const now = new Date().getTime();
    const start = task.startTime.getTime();
    return now >= start && task.status === 'Pending';
  }

  calculateDelay(startTime: Date): string {
    const start = startTime.getTime();
    const now = Date.now();
    return now > start ? this.formatTime(now - start) : '00:00:00';
  }
  calculateCountdown(endTime: Date): string {
    return this.getTimeDifference(endTime);
  }


  getTimeDifference(endTime: Date): string {
    const end = endTime.getTime();
    const now = this.startDate.getTime();
    const diff = end - now;
    return diff > 0 ? this.formatTime(diff) : '00:00:00';
  }

  formatTime(ms: number): string {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }


  pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  startCountdown(index: number) {
    const task = this.trackerData[index];
    if (task.countdownRunning) return;
  
    
    task.countdownRunning = true;
    task.status = 'InProgress';
  
    
    const totalMs = task.endTime.getTime() - task.startTime.getTime();
  
    
    const now = Date.now();
    let elapsedMs = now - task.startTime.getTime();
  
    
    if (elapsedMs < 0) {
      elapsedMs = 0;
    }
  
  
    let remainingMs = totalMs - elapsedMs;
  
    if (remainingMs <= 0) {
      task.status = 'Completed';
      task.countdownRunning = false;
      task.remainingTime = '00:00:00';
      return;
    }
  
    
    const interval = setInterval(() => {
      remainingMs -= 1000;
  
      if (remainingMs <= 0) {
        clearInterval(interval);
        task.status = 'Completed';
        task.countdownRunning = false;
        task.remainingTime = '00:00:00';
      } else {
    
        task.remainingTime = this.formatTime(remainingMs);
      }
    }, 1000);
  }
}