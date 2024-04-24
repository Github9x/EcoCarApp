// reset-password.component.ts

import { Component } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  username!: string;
  newPassword!: string;
  confirmPassword!: string;
  errorMessage!: string;

  constructor(private apiService: BookingService) {}

    // Password strength check function
isPasswordStrong(password: string): boolean {
  // Check for at least one digit
  if(password == undefined){
    return false;
  }
  const hasDigit = /\d/.test(password);

  // Check for at least one special character
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check for a minimum length of 7 characters
  const hasMinimumLength = password.length >= 7;

  return hasDigit && hasSpecialChar && hasMinimumLength;
}

  resetPassword() {
    // Call the API to change the password
   
    if(!this.isPasswordStrong(this.newPassword)){
      this.errorMessage="Password is not strong enough, a password minimum length is 7, should contain a digit and a special character";
      return;
    }
    
    this.apiService.changePassword(this.username, this.newPassword).subscribe(
      response => {
        if (response.success) {
          // Password change successful
          console.log('Password changed successfully', response);
          this.errorMessage = "password changed successfully"; // Clear error message for success
          // Optionally, you can redirect the user to the login page or handle the success case.
          this.username = ''; // Clear the username input field
        this.newPassword = ''; // Clear the new password input field
        this.confirmPassword = '';
        } else {
          // Password change unsuccessful, set error message
          this.errorMessage = 'Error occurred: username does not exist, re-enter or';
          console.error('Error changing password', response);
        }
      },
      error => {
        // Handle error (e.g., display an error message)
        this.errorMessage = 'Error changing password, check username. Please try again.';
        console.error('Error changing password', error);
      }
    );
  }
  
}