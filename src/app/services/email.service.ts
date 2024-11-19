import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private serviceID = 'service_wgeozo6';
  private templateID = 'template_5ix6vfn';
  private publicKey = 'RQV6-nVWkkyQ0JSX9';

  constructor() {}

  sendEmail(toEmail: string, message: string): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to_email: toEmail,
      message: message,
    };

    return emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey);
  }
}
