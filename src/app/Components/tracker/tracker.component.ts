import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tracker',
  imports: [MatIconModule, CommonModule],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent implements OnInit {
  trackerData: any[] = [];

  ngOnInit() {
    this.loadSchedules();
  }

  loadSchedules() {
    let schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
    let courses = JSON.parse(localStorage.getItem('courses') || '[]');

    // Merge schedule data with course names
    this.trackerData = schedules.map((schedule: { courseId: any; startTime: any; endTime: any; }) => {
      let course = courses.find((c: { id: any; }) => c.id === schedule.courseId);
      return {
        courseName: course.name,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        delay: this.calculateDelay(schedule.startTime),
        countdown: this.calculateCountdown(schedule.endTime),
        status: 'Pending',
        countdownRunning: false, 
        remainingTime: this.getTimeDifference(schedule.endTime) 
    }});
  }

  calculateDelay(startTime: string): string {
    const start = new Date(startTime).getTime();
    const now = new Date().getTime();
    return now > start ? this.formatTime(now - start) : '00:00:00';
  }

  calculateCountdown(endTime: string): string {
    return this.getTimeDifference(endTime);
  }

  getTimeDifference(endTime: string): string {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
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
    let task = this.trackerData[index];
    if (task.countdownRunning) return;

    task.countdownRunning = true;
    task.status = 'InProgress';

    const interval = setInterval(() => {
      task.remainingTime = this.getTimeDifference(task.endTime);
      if (task.remainingTime === '00:00:00') {
        clearInterval(interval);
        task.status = 'Completed';
        task.countdownRunning = false;
      }
    }, 1000);
  }
}
