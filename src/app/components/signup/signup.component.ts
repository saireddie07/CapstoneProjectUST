import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `<div class="signup-container">
  <div class="signup-card">
    <div class="brand-section">
      <div class="logo-circle">
        <span>A</span>
      </div>
      <h2>Create Account</h2>
    
    </div>

    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="signup-form">
      <div class="form-grid">
        <div class="form-group">
          <div class="input-wrapper">
            <input
              type="text"
              id="username"
              formControlName="username"
              placeholder=" "
              [class.error-input]="signupForm.get('username')?.touched && signupForm.get('username')?.invalid"
            >
            <label for="username">Username</label>
            <div class="input-highlight"></div>
          </div>
          <div class="error-message" *ngIf="signupForm.get('username')?.touched && signupForm.get('username')?.errors?.['required']">
            Username is required
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <input
              type="text"
              id="name"
              formControlName="name"
              placeholder=" "
              [class.error-input]="signupForm.get('name')?.touched && signupForm.get('name')?.invalid"
            >
            <label for="name">Full Name</label>
            <div class="input-highlight"></div>
          </div>
          <div class="error-message" *ngIf="signupForm.get('name')?.touched && signupForm.get('name')?.errors?.['required']">
            Full name is required
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="input-wrapper">
          <input
            type="email"
            id="email"
            formControlName="email"
            placeholder=" "
            [class.error-input]="signupForm.get('email')?.touched && signupForm.get('email')?.invalid"
          >
          <label for="email">Email Address</label>
          <div class="input-highlight"></div>
        </div>
        <div class="error-message" *ngIf="signupForm.get('email')?.touched && signupForm.get('email')?.errors?.['required']">
          Email is required
        </div>
        <div class="error-message" *ngIf="signupForm.get('email')?.touched && signupForm.get('email')?.errors?.['email']">
          Please enter a valid email
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <div class="input-wrapper">
            <select
              id="role"
              formControlName="role"
              [class.has-value]="signupForm.get('role')?.value"
            >
              <option value="" disabled selected>Select a role</option>
              <option *ngFor="let role of roles" [value]="role">{{role}}</option>
            </select>
            <label for="role">Role</label>
            <div class="input-highlight"></div>
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <input
              type="tel"
              id="phoneNumber"
              formControlName="phoneNumber"
              placeholder=" "
              [class.error-input]="signupForm.get('phoneNumber')?.touched && signupForm.get('phoneNumber')?.invalid"
            >
            <label for="phoneNumber">Phone Number</label>
            <div class="input-highlight"></div>
          </div>
          <div class="error-message" *ngIf="signupForm.get('phoneNumber')?.touched && signupForm.get('phoneNumber')?.errors?.['required']">
            Phone number is required
          </div>
          <div class="error-message" *ngIf="signupForm.get('phoneNumber')?.touched && signupForm.get('phoneNumber')?.errors?.['pattern']">
            Please enter a valid 10-digit phone number
          </div>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <div class="input-wrapper">
            <input
              type="password"
              id="password"
              formControlName="password"
              placeholder=" "
              [class.error-input]="signupForm.get('password')?.touched && signupForm.get('password')?.invalid"
            >
            <label for="password">Password</label>
            <div class="input-highlight"></div>
          </div>
          <div class="error-message" *ngIf="signupForm.get('password')?.touched && signupForm.get('password')?.errors?.['required']">
            Password is required
          </div>
          <div class="error-message" *ngIf="signupForm.get('password')?.touched && signupForm.get('password')?.errors?.['minlength']">
            Password must be at least 6 characters
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <input
              type="password"
              id="confirmPassword"
              formControlName="confirmPassword"
              placeholder=" "
              [class.error-input]="signupForm.get('confirmPassword')?.touched && signupForm.get('confirmPassword')?.invalid"
            >
            <label for="confirmPassword">Confirm Password</label>
            <div class="input-highlight"></div>
          </div>
          <div class="error-message" *ngIf="signupForm.get('confirmPassword')?.touched && signupForm.get('confirmPassword')?.errors?.['required']">
            Please confirm your password
          </div>
          <div class="error-message" *ngIf="signupForm.errors?.['passwordMismatch']">
            Passwords do not match
          </div>
        </div>
      </div>

      <button type="submit" [disabled]="!signupForm.valid" class="auth-button">
        <span>Create Account</span>
        <div class="button-overlay"></div>
      </button>

      <div class="auth-links">
        <p>Already have an account? <a routerLink="/login" class="login-link">Sign In</a></p>
      </div>
    </form>
  </div>
</div>`,
  styles:`.signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
    padding: 20px;
  }

  .signup-card {
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    padding: 3rem;
    width: 100%;
    max-width: 800px;
    transform: translateY(0);
    transition: transform 0.3s ease;
  }

  .signup-card:hover {
    transform: translateY(-5px);
  }

  .brand-section {
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .logo-circle {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
  }

  .logo-circle span {
    color: white;
    font-size: 1.8rem;
    font-weight: bold;
  }

  .brand-section h2 {
    margin: 0;
    color: #1f2937;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .brand-section p {
    color: #6b7280;
    margin: 0.5rem 0 0;
    font-size: 1rem;
  }

  .signup-form {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-wrapper {
    position: relative;
  }

  input, select {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    font-size: 1rem;
    background: transparent;
    transition: all 0.2s ease;
  }

  input:focus, select:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.2em;
    padding-right: 2.5rem;
  }

  .input-wrapper label {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    transition: all 0.2s ease;
    pointer-events: none;
    background: white;
    padding: 0 0.25rem;
  }

  input:focus ~ label,
  input:not(:placeholder-shown) ~ label,
  select:focus ~ label,
  select.has-value ~ label {
    top: 0;
    font-size: 0.875rem;
    color: #6366f1;
  }

  .error-input {
    border-color: #ef4444;
  }

  .error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .auth-button {
    position: relative;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.2s ease;
  }

  .auth-button:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  .button-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .auth-button:hover .button-overlay {
    opacity: 1;
  }

  .auth-button:disabled {
    background: #e5e7eb;
    cursor: not-allowed;
    transform: none;
  }

  .auth-links {
    text-align: center;
    margin-top: 0.5rem;
  }

  .auth-links p {
    color: #6b7280;
    font-size: 0.875rem;
  }

  .login-link {
    color: #6366f1;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
  }

  .login-link:hover {
    color: #4f46e5;
  }

  @media (max-width: 768px) {
    .signup-card {
      padding: 2rem;
    }

    .form-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .brand-section h2 {
      font-size: 1.75rem;
    }
  }`
})
export class SignupComponent {
  signupForm: FormGroup;
  roles: string[] = ['Leader', 'Manager', 'Developer', 'Other'];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['User', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? 
      null : { 'passwordMismatch': true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Reset messages
      this.errorMessage = '';
      this.successMessage = '';

      const { confirmPassword, ...userData } = this.signupForm.value;
      console.log(userData);
      
      this.authService.signup(userData).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            // Show success message
            alert('Registration successful! Please wait for an approval mail.');
            this.router.navigate(['/login']);
          } else {
            // Handle unsuccessful registration but with a 200 response
            this.errorMessage = response.message || 'Registration failed. Please try again.';
            alert(this.errorMessage);
          }
        },
        error: (error) => {
          console.error('Signup failed:', error);
          
          // Handle HTTP 400 error for duplicate username
          if (error.status === 400) {
            // Check if the error message is about duplicate username
            const errorMessage = error.error?.message || 'Username is already taken. Please choose a different username.';
            this.errorMessage = errorMessage;
            alert(errorMessage);
          } else {
            // Handle other types of errors
            this.errorMessage = 'An error occurred during registration. Please try again later.';
            alert('this.errorMessage'+error);
          }
          
          // Reset the form password fields
          this.signupForm.patchValue({
            password: '',
            confirmPassword: ''
          });
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}