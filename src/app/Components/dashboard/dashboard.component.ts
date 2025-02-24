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
  
  ngOnInit(): void {
   this.loadCourseCount();
   window.addEventListener('storage', () => {
    this.loadCourseCount();
  });
  }

  loadCourseCount() {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      this.totalCourses = JSON.parse(savedCourses).length;
    } else {
      this.totalCourses = 0;
    }
  }



chartOptions = {
  title: {
    text: "Weekly Progress"
  },
  theme: "light2",
  animationEnabled: true,
  exportEnabled: true,
  axisY: {
  includeZero: true,
  valueFormatString: "$#,##0k"
  },
  data: [{
  type: "column", //change type to bar, line, area, pie, etc
  yValueFormatString: "$#,##0k",
  color: "#e53e3e",
  dataPoints: [
    { label: "Monday", y: 172 },
    { label: "Tuesday", y: 189 },
    { label: "Wednesday", y: 201 },
    { label: "Thursday", y: 240 },
    { label: "Friday", y: 166 },
    { label: "Saturday", y: 196 },
    { label: "Sunday", y: 218 }
  ]
  }]
}

}
