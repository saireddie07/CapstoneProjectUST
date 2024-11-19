import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MeetingService } from '../../services/meetings.service';
import { Meeting } from '../../models/meetings.interface';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  
  selector: 'app-add-meeting',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl:'add-meeting.component.html',
  styleUrls:['add-meeting.component.css']
})
export class AddMeetingComponent {
  meetingForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private meetingService: MeetingService,
  ) {
    this.meetingForm=this.fb.group({
      title:new FormControl(),
      description:new FormControl(),
      startDateTime:new FormControl(),
      endDateTime:new FormControl(),
      platform:new FormControl(),
      timeZone:new FormControl(),
      link:new FormControl()
    })
  }

  private initForm(): void {
    this.meetingForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      startDateTime: ['', [Validators.required]],
      endDateTime: ['', [Validators.required]],
      platform:[''],
      timeZone: ['', [Validators.required]],
      link: ['', [Validators.required]]
    }, { validators: this.dateRangeValidator });
  }

  private dateRangeValidator(group: FormGroup): {[key: string]: any} | null {
    const start = group.get('startDateTime')?.value;
    const end = group.get('endDateTime')?.value;
    
    if (start && end && new Date(start) >= new Date(end)) {
      return { invalidDateRange: true };
    }
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.meetingForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {
    if (this.meetingForm.invalid) {
      Object.keys(this.meetingForm.controls).forEach(key => {
        const control = this.meetingForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValue = this.meetingForm.value;
    const meeting: Meeting = {
      title: formValue.title,
      description: formValue.description,
      startDateTime: new Date(formValue.startDateTime),
      endDateTime: new Date(formValue.endDateTime),
      platform:formValue.platform,
      timeZone: formValue.timeZone,
      link: formValue.link
    };

    this.meetingService.createMeeting(meeting).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Meeting created successfully!';
        // Reset form after successful submission
        this.meetingForm.reset();
        // Navigate to meetings list after a short delay
        alert("Meeting created succesfully!")
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = 'Failed to create meeting. Please try again.';
        console.error('Error creating meeting:', error);
      }
    });
  }

  onCancel(): void {
    
  }
}