import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
   showingMobilesidebar = false;

   ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    if (window.innerWidth >= 768) {
      this.showingMobilesidebar = false;
    }
  }

  constructor(private router: Router) { }
  logout() {
    this.router.navigate(['/']); // Redirect to login page after logout
  }
  showSidebar(){
    this.showingMobilesidebar = !this.showingMobilesidebar;
  }

 
 navlinks = [
    {
      path: '/home/dashboard',
      label: 'Dashboard',
      icon: 'dashboard'
    },{
      path: '/home/courses',
      label: 'Courses',
      icon: 'description'
    },{
      path: '/home/timetable',
      label: 'Timetable',
      icon: 'date_range'
    },{
      path: '/home/tracker',
      label: 'Tracker',
      icon: 'hourglass_full'
    }
  ]
}
