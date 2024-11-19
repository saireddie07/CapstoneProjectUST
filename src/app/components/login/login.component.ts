import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="brand-section">
          <div class="logo-circle">
            <span>A</span>
          </div>
          <h2>Welcome Back</h2>
          <p>Please sign in to continue</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-group">
            <div class="input-wrapper">
              <input 
                type="email" 
                id="email" 
                formControlName="email" 
                placeholder=" "
                [class.error-input]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
              >
              <label for="email">Email Address</label>
              <div class="input-highlight"></div>
            </div>
            <div class="error-message" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
              <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>

          <div class="form-group">
            <div class="input-wrapper">
              <input 
                type="password" 
                id="password" 
                formControlName="password" 
                placeholder=" "
                [class.error-input]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
              >
              <label for="password">Password</label>
              <div class="input-highlight"></div>
            </div>
            <div class="error-message" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
              <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
              <span *ngIf="loginForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox">
              <span>Remember me</span>
            </label>
            <a href="#" class="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" [disabled]="!loginForm.valid" class="auth-button">
            <span>Sign In</span>
            <div class="button-overlay"></div>
          </button>

          <div class="auth-links">
            <p>Don't have an account? <a routerLink="/signup" class="signup-link">Create Account</a></p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: `
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
      padding: 20px;
    }

    .auth-card {
      background-color: white;
      border-radius: 20px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
      padding: 3rem;
      width: 100%;
      max-width: 440px;
      transform: translateY(0);
      transition: transform 0.3s ease;
    }

    .auth-card:hover {
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

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .input-wrapper {
      position: relative;
    }

    input {
      width: 100%;
      padding: 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
      font-size: 1rem;
      background: transparent;
      transition: all 0.2s ease;
    }

    input:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
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
    input:not(:placeholder-shown) ~ label {
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

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: -0.5rem;
    }

    .remember-me {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #6b7280;
      font-size: 0.875rem;
      cursor: pointer;
    }

    .forgot-password {
      color: #6366f1;
      font-size: 0.875rem;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .forgot-password:hover {
      color: #4f46e5;
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

    .signup-link {
      color: #6366f1;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s ease;
    }

    .signup-link:hover {
      color: #4f46e5;
    }

    @media (max-width: 480px) {
      .auth-card {
        padding: 2rem;
      }

      .brand-section h2 {
        font-size: 1.75rem;
      }
    }
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (result) => {
          if(result.approved === true) {
            if (result.success) {
              const adminRoles = ['Leader', 'Manager'];
              const userRoles = ['Developer', 'Other'];
              if (adminRoles.includes(result.role)) {
                this.router.navigate(['/admin']);
              } else if (userRoles.includes(result.role)) {
                this.router.navigate(['/home']);
              } else {
                console.warn('Unexpected role:', result.role);
                this.loginError = 'Invalid user role';
              }
            } else {
              this.loginError = 'Invalid credentials';
            }
          } else {
            alert("User account is under verification. Please wait for approval");
          }
        },
        error: (error) => {
          alert(error);
          console.error('Login failed:', error);
          this.loginError = 'Login failed. Please try again.';
        }
      });
    }
  }
}