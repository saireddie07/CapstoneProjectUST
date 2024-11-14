import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    // Simulate API call
    return of(true).pipe(
      delay(1000),
      tap(() => {
        this.isAuthenticated = true;
        localStorage.setItem('isAuthenticated', 'true');
      })
    );
  }

  signup(name: string, email: string, password: string): Observable<boolean> {
    // Simulate API call
    return of(true).pipe(
      delay(1000)
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';
  }
}
