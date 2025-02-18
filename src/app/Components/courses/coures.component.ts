import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-coures',
  imports: [MatIconModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './coures.component.html',
  styleUrl: './coures.component.css'
})
export class CouresComponent {
  courseForm!: FormGroup;
  courses: { id: number; name: string; date: string }[] = [];
  courseId = 1;

  constructor(private fb: FormBuilder) {
      this.InitializecourseForm();
   }

  seeDialog: boolean = false;
  

  showForm() {
    this.seeDialog = !this.seeDialog;
  }

  closeForm() {
    this.seeDialog = false;
  }

  InitializecourseForm() {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],})}
  
      addCourse(): void {

        if (this.courseForm.get('courseName')?.value === '') {
          return alert('Please enter a course name');
        } else {
          this.courses.push({
            id: this.courseId++,
            name: this.courseForm.value.courseName,
            date: new Date().toLocaleDateString()
          });
    
          this.courseForm.reset(); // Reset the form
          this.closeForm(); // Hid
        }
      }
      myGroup = new FormGroup({
          courseName: new FormControl()
      });
}
