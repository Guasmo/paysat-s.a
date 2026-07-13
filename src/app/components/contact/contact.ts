import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    company: new FormControl(''),
    interest: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  
  isSubmitting = signal(false);
  submitSuccess = signal(false);

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        this.contactForm.reset();
        setTimeout(() => this.submitSuccess.set(false), 5000);
      }, 1000);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}

