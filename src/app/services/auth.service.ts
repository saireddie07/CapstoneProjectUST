import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuth } from '../models/authuser.interface';
import { User, UserDetailsResponse  } from '../models/user.interface';

interface UpdateStatusRequest {
  currentStatus: string;
  timeZone: string;
}
interface LoginResponse {
  result: {
    user: {
      id: string;
      email: string;
      name: string;
      phoneNumber: string;
      role: string;
      isApproved: boolean;
      currentStatus:string;
      timeZone:string
    };
    token: string;
  };
  isSuccess: boolean;
  message: string;
}

interface SignupResponse {
  result: any;
  isSuccess: boolean;
  message: string;
}

interface ApiResponse {
  result: any;
  isSuccess: boolean;
  message: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private currentUser: UserAuth | null = null;
 
  private apiUrl = 'https://localhost:7082/api/AuthAPI';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{success: boolean, role: string,approved: boolean}> {
    // Existing login code remains the same
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      userName: email,
      password: password
    }).pipe(
      map(response => {
        if (response.isSuccess) {
          this.isAuthenticated = true;
          this.currentUser = {
            email: response.result.user.email,
            role: response.result.user.role,
            isApproved: response.result.user.isApproved,
          };

          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('currentUser', this.currentUser.email);
          localStorage.setItem('token', response.result.token);

          return { 
            success: true, 
            role: response.result.user.role ,
            approved: response.result.user.isApproved
          };
        }
        return { success: false, role: '',approved:false };

    
        
      })
    );
  }

  getUnapprovedUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/unapproved-users`);
  }

  signup(userData: User): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/register`, {
      email: userData.email,
      name: userData.name,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      role: userData.role
    });
  }
  approveUser(userEmail: string): Observable<ApiResponse> {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const requestBody=true;
    // Since it's a PUT request to update the approval status
    return this.http.put<ApiResponse>(`${this.apiUrl}/updateIsApproved/${encodeURIComponent(userEmail)}`,requestBody, {headers});
    
    // If your API expects POST request instead of PUT, use this:
    // return this.http.post<ApiResponse>(url, {});
  }
  updateUserStatusAndTimezone(
    username: string, 
    statusData: UpdateStatusRequest
  ): Observable<ApiResponse> {
    const url = `${this.apiUrl}/updateStatusAndTimeZoneByUsername/${username}`;
    
    return this.http.put<ApiResponse>(url, statusData);
  }

  getUserByUserName(username: string): Observable<UserDetailsResponse> {
    // Encode the username to handle special characters in the URL
    const encodedUsername = encodeURIComponent(username);
    return this.http.get<UserDetailsResponse>(`${this.apiUrl}/getUser/${encodedUsername}`).pipe(
      tap(response => {
        if (!response.isSuccess) {
          console.warn('Failed to fetch user details:', response.message);
        }
      })
    );
  }

  getCurrentUserRole(): string {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user).role : '';
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  }
  


  isLoggedIn(): boolean {
    return this.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';
  }
/*
  getCurrentUser(): User | null {
    return this.currentUser;
  }*/
}