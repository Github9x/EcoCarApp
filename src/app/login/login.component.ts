/// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent{
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isLoginMode: boolean = true;
  loggedInUsername: string = '';
  isBookMode: boolean=false;
  isAuthorised: boolean=false;
  isAdminMode: boolean=false;
  usernamelist: string[] = [];

  
  constructor(private apiService: BookingService, private router: Router, private usernameService: UsernameService ) {}

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.confirmPassword = '';
  }

  loadUserNames() {
   
    this.apiService.getAllUserNames().subscribe(
      response => {
        this.usernamelist = response.columnValues;
        this.usernamelist.push('admin');
      },
      error => {
        console.error('Error fetching column values:', error);
      }
    );
    
  }

  // Password strength check function
isPasswordStrong(password: string): boolean {
  // Check for at least one digit
  const hasDigit = /\d/.test(password);

  // Check for at least one special character
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check for a minimum length of 7 characters
  const hasMinimumLength = password.length >= 7;

  return hasDigit && hasSpecialChar && hasMinimumLength;
}

  ngOnInit(): void {
    this.isBookMode=false;
    
    this.usernameService.book$.subscribe((isCancelMode) => {
      this.isBookMode = isCancelMode;
      
    });
   
    console.log("Book",this.isBookMode);
  }



  onSubmit(): void {
    if (!this.username.trim() || !this.password) {
      this.errorMessage = 'Username and Password are required!';
      return; // Stop execution if validation fails
    }
  
    if (this.isLoginMode) {
      this.login();
    } else {
      this.signup();
    }
  }
  
  login(): void {
    this.usernameService.setUsername(this.username);
    if(this.username == 'admin' && this.password == '123'){
      this.router.navigate(['/admin']);
    }
    else{
    this.apiService.login(this.username, this.password).subscribe(
      (response) => {
        // Navigate based on the mode
        const route = this.isBookMode ? '/cancel' : '/book';
        this.router.navigate([route]);
        this.isAuthorised = true; // Assuming login means authorized
        this.usernameService.setAuthMode(this.isAuthorised);
      },
      (error) => {
        // Use the API's error message
        this.errorMessage = error.error.error || 'Login failed. Please try again.';
      }
    );
  }
}

 
  
  signup(): void {
    console.log('username',this.usernamelist);
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    if(this.usernamelist.includes(this.username)){
      this.errorMessage="Signup failed, username already exist";
      return;

    }

    if(!this.isPasswordStrong(this.confirmPassword)){
      this.errorMessage="Password is not strong enough, a password minimum length is 7, should contain a digit and a special character";
      return;
    }
  
    this.apiService.signup(this.username, this.password).subscribe(
      response => {
        // Navigate to login page or show a success message
        this.errorMessage="Signup Successful, please Login to continue";
        this.isLoginMode=true;
        this.router.navigate(['/login']);
      },
      error => {
        // Use the API's error message
        this.errorMessage = error.error.message || 'Signup failed. Please try again.';
      }
    );
  
    // Clear form fields after attempt
    this.clearFormFields();
  }
  
  clearFormFields(): void {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
    this.confirmPassword = '';
  }

 
  

}

