import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  totalCourses: number = 0;
  constructor() { }
  userName: string = '';
  tasksToday: number = 0;
  completedTasksToday: number = 0;
  hoursToday: number = 0;
  

  ngOnInit(): void {
   this.loadCourseCount();
   this.loadTodaySchedules();
   this.loadWeeklyProgress()
   window.addEventListener('storage', () => {
    this.loadCourseCount();
  });
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser && storedUser.fullname) {
        this.userName = storedUser.fullname;
      };
  }

  loadCourseCount() {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      this.totalCourses = JSON.parse(savedCourses).length;
    } else {
      this.totalCourses = 0;
    }
  }

  loadTodaySchedules() {
    const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
    const now = new Date();
  
    //Today's day
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayName = dayNames[now.getDay()]; 
  
    //Filter today's tasks based on day 
    const tasksForToday = schedules.filter((task: any) => task.day === todayName);
    this.tasksToday = tasksForToday.length; 
  
    //Count completed tasks (tasks that ended before now)
    const completedTasks = tasksForToday.filter((task: any) => {
      const endTime = this.parseTimeAsToday(task.endTime).getTime();
      return endTime < now.getTime();
    });
    this.completedTasksToday = completedTasks.length;
  
    
    const totalMs = tasksForToday.reduce((acc: number, task: any) => {
      const startTime = this.parseTimeAsToday(task.startTime).getTime();
      const endTime = this.parseTimeAsToday(task.endTime).getTime();
      return acc + Math.max(endTime - startTime, 0); 
    }, 0);
    this.hoursToday = totalMs / (1000 * 60 * 60); 
  }
  
  //Convertstime into a Date object for today.
  private parseTimeAsToday(timeStr: string): Date {
    const [hour, minute] = timeStr.split(':').map(Number);
    const today = new Date();
    today.setHours(hour, minute, 0, 0);
    return today;
  }

  chartOptions = {
    title: { text: "Weekly Progress" },
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    axisY: { includeZero: true, valueFormatString: "##" },
    data: [{
      type: "column",
      yValueFormatString: "##",
      color: "#7F8C8D",
      dataPoints: [] as { label: string, y: number }[]
    }]
  };

  loadWeeklyProgress() {
    const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
    const dayHours: { [key: string]: number } = {
      Monday: 0, Tuesday: 0, Wednesday: 0,
      Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0
    };

    schedules.forEach((task: any) => {
      const dayName = task.day;
      if (dayHours[dayName] !== undefined) {
        const startDate = this.parseTimeAsDay(task.startTime);
        const endDate = this.parseTimeAsDay(task.endTime);

        const diffMs = endDate.getTime() - startDate.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours > 0) {
          dayHours[dayName] += diffHours;
        }
      }
    });

    this.chartOptions.data[0].dataPoints = [
      { label: "Monday", y: dayHours['Monday'] },
      { label: "Tuesday", y: dayHours['Tuesday'] },
      { label: "Wednesday", y: dayHours['Wednesday'] },
      { label: "Thursday", y: dayHours['Thursday'] },
      { label: "Friday", y: dayHours['Friday'] },
      { label: "Saturday", y: dayHours['Saturday'] },
      { label: "Sunday", y: dayHours['Sunday'] }
    ];
  }

  private parseTimeAsDay(timeStr: string): Date {
    const [hour, minute] = timeStr.split(':').map(Number);
    const d = new Date();
    d.setHours(hour, minute, 0, 0);
    return d;
  }


}
