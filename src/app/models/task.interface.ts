export interface Task {
    taskId: number;
    taskTitle: string;
    taskDescription: string;
    taskAssignedDate: string;
    taskDeadline: string;
    taskStatus: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
    taskRemarks: string;
    taskAssignedTo: string;
  }