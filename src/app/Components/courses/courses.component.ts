import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../services/courses.service';



@Component({
  selector: 'app-coures',
  imports: [MatIconModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './coures.component.css'
})
export class CoursesComponent {
  
  courseForm!: FormGroup;
  courses: { id: string, name: string, date: string }[] = [];
  courseId:number = 0;
  editID: string = '';

  constructor(private fb: FormBuilder, private coursesService: CoursesService) {
      this.InitializecourseForm();
      this.loadCourses();
   }

  seeDialog: boolean = false;
  

  showForm(option: string, id:string) {
    this.seeDialog = !this.seeDialog;
    this.editID = id;
  }

  closeForm() {
    this.seeDialog = false;
  }

  InitializecourseForm() {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],})}
  
      addCourse(): void {
        if (this.editID === '') {
          const courseName = this.courseForm.get('courseName')?.value?.trim();
          if (!courseName) {
            alert('Please enter a course name');
            return;
          }
          this.courseId = this.courseId+=1;
          const newCourse = { id: this.courseId, name: courseName, date: new Date().toLocaleDateString() };
          const updatedCourses = [...this.courses, newCourse];
    
          this.coursesService.saveCoursesToStorage(updatedCourses);
          this.courseForm.reset();
        } else {
          this.courses = this.courses.map(course => {
            if (course.id === this.editID) {
              return { ...course, name: this.courseForm.get('courseName')?.value?.trim() };
            }
            return course;
          });
    
          this.coursesService.saveCoursesToStorage(this.courses);
        }
        this.closeForm()
      }

      myGroup = new FormGroup({
          courseName: new FormControl()
      });

      // editCourse(course: any): void {
      //  ;
      //   this.editCourse = course.id; 
      // }

      deleteCourse(courseId: number): void {
        if (confirm('Are you sure you want to delete this course?')) {
          this.coursesService.deleteCourseFromSchedule(courseId);
          this.courses = this.courses.filter(c => +c.id !== courseId);
          this.coursesService.saveCoursesToStorage(this.courses);
        }
      }
      
      
      saveCourses() {
        localStorage.setItem('courses', JSON.stringify(this.courses));
      }
      loadCourses() {
        this.coursesService.courses$.subscribe(updatedCourses => {
          this.courses = updatedCourses;
        });
      }
    
}
