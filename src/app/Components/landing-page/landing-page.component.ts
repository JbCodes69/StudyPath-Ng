import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
   signUpForm! : FormGroup;
   signInForm! : FormGroup;
   showlogin: boolean = true;
   ngOnInit(){
    this.intializeForm()

   }

   
   constructor(private fb: FormBuilder, private router: Router) {
     
   }
   
   intializeForm(){
    this.signUpForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required,], 
      password: ['', Validators.required],
      retypepassword: ['', Validators.required]
    },  { validators: this.passwordMatchValidator });


    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]})
   }
    
   passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('retypepassword')?.value;
 
    if (password !== confirmPassword) {
       form.get('retypepassword')?.setErrors({ mismatch: true });
       return { mismatch: true };
    }
    return null;
 }

  onSignUpSubmit(): void { 
    if (this.signUpForm.valid) {
      const userData = this.signUpForm.value;
      localStorage.setItem('user', JSON.stringify(userData));
      prompt('User Registered Successfully');
      this.router.navigate(['/home']);
      return;
    }
    if (this.signUpForm.invalid) {
      prompt('Please fill out the form correctly');
      return;
    } else if(this.signUpForm.getError('mismatch')) { 
      alert('Passwords do not match');
      return;
  }
    
  }


   
  onSignInSubmit(){
    if (this.signInForm.valid) {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const { email, password } = this.signInForm.value;

      if (storedUser.email === email && storedUser.password === password) {
        alert('Login Successful!');
        this.router.navigate(['/home']);
      } else {
        alert('Invalid email or password.');
      }
    }
  }


 

  unhide(){
    this.showlogin = !this.showlogin
    
  }

 
}
