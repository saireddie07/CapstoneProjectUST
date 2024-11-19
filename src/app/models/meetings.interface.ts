export interface Meeting {
    title: string;
    description: string;
    startDateTime: Date;
    endDateTime: Date;
    timeZone: string;
    platform: string;
    link:string;
  }
  export interface Participant {
   
    userId: string;
}

export interface MeetingDetails {
    id: number;
    title: string;
    description: string;
    startTime: string;  // ISO 8601 date string
    endTime: string;    // ISO 8601 date string
    platform: string;
    createdAt: string; 
    timeZone: string;
    status: string;
    meetingLink: string; // ISO 8601 date string
    participants: Participant[];
}