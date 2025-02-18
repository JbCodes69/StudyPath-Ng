import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
   signUpForm! : FormGroup;

   
   constructor(private fb: FormBuilder, private router: Router) {
      this.intializeForm();
   }
   
   intializeForm(){
    this.signUpForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required,], 
      password: ['', Validators.required],
      // retypepassword: ['', Validators.required]
    });
   }

    onSubmit(): void {
     if(this.signUpForm.valid){
      this.router.navigate(['/home']);  
     }
    }



  showlogin: boolean = true;

  unhide(){
    this.showlogin = !this.showlogin
    console.log(this.showlogin)
  }

  myGroup = new FormGroup({
    name: new FormControl()
});
}
function emailExistsValidator(): any {
  throw new Error('Function not implemented.');


}

