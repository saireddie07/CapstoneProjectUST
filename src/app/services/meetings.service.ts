import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting, MeetingDetails, Participant } from '../models/meetings.interface';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = 'https://localhost:7157/api/Meeting';

  constructor(private http: HttpClient) {}

  /**
   * Creates a new meeting
   * @param meeting Meeting data to create
   */
  createMeeting(meeting: Meeting): Observable<void> {
    // Transform the meeting object to match API expectations
    const requestBody = {
      title: meeting.title,
      description: meeting.description,
      startTime: meeting.startDateTime.toISOString(),
      endTime: meeting.endDateTime.toISOString(),
      location:meeting.platform,
      timeZone: meeting.timeZone,
      meetingLink: meeting.link
    };

    return this.http.post<void>(this.apiUrl, requestBody);
  }

  /**
   * Gets all meetings
   */
  getAllMeetings(): Observable<MeetingDetails[]> {
    return this.http.get<MeetingDetails[]>(this.apiUrl);
  }

  /**
   * Adds a participant to a meeting
   * @param meetingId The ID of the meeting
   * @param userId The ID of the user to add
   */
  addParticipant(meetingId: number, userId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/${meetingId}/participants`,
      { userId }
    );
  }

  /**
   * Gets all meetings for a specific user
   * @param userId The ID of the user
   */
  getMeetingsByUserId(userId: string): Observable<MeetingDetails[]> {
    return this.http.get<MeetingDetails[]>(`${this.apiUrl}/user/${userId}`);
  }
}