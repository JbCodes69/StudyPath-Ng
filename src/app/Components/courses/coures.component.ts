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
  editID: string = '';

  constructor(private fb: FormBuilder) {
      this.InitializecourseForm();
   }

  seeDialog: boolean = false;
  

  showForm(option: string, id:string) {
    this.seeDialog = !this.seeDialog;
    this.editID = id;
    console.log(this.editID);
  }

  closeForm() {
    this.seeDialog = false;
  }

  InitializecourseForm() {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],})}
  
      addCourse(): void {

        if(this.editID === '') {
          const courseName = this.courseForm.get('courseName')?.value?.trim();
      
        if (!courseName) {
          alert('Please enter a course name');
          return;
        }
      
        this.courses.push({
          id: this.courseId++,
          name: courseName,
          date: new Date().toLocaleDateString()
        });

        console.log(this.courses);
      
        this.courseForm.reset();
        this.closeForm();
        }
        else{
          this.showForm('edit',this.editID);
          this.courses.filter((course) =>{
            if(course.id === parseInt(this.editID)){
              course.name = this.courseForm.get('courseName')?.value?.trim();
            }
          });
          console.log(this.courses);
        }
        
      }
      myGroup = new FormGroup({
          courseName: new FormControl()
      });

      // editCourse(course: any): void {
      //   this.courseForm.setValue({ courseName: course.name });
      //   this.editCourse = course.id; 
      // }

      deleteCourse(courseId: string): void {
        if( confirm('Are you sure you want to delete this course?')) {
        this.courses = this.courses.filter((course) => course.id!== parseInt(courseId));
      }}
}
