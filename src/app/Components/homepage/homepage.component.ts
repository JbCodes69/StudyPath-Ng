import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  
  constructor(private router: Router) { }
  logout() {
    this.router.navigate(['/']); // Redirect to login page after logout
  }

}
