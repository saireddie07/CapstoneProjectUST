export interface User {
    
    email: string;
    name: string;
    phoneNumber: string;
    password: string;
    role: string;
    approved:boolean
  }

export interface UserDetailsResponse {
    result: {
      timeZone: string;
      id: string;
      email: string;
      name: string;
      phoneNumber: string;
      role: string;
      isApproved: boolean | null;
      currentStatus:string;
     
    };
    isSuccess: boolean;
    message: string;
  }