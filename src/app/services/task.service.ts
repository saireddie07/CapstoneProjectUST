import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.interface';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://localhost:7267/api/Task';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl+'/all');
  }

  getTaskByUserName(username: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/byusername/${username}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTaskStatus(taskId: number, status: Task['taskStatus'], remarks: string): Observable<Task> {
    const url = `${this.apiUrl}/${taskId}/status`;
    const data = {
      status: status,
      remarks: remarks
    };
    
    return this.http.put<Task>(url, data);
  }

  
}