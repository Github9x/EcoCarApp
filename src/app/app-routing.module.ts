import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BookCarsComponent } from './book-cars/book-cars.component';
import { CancelBookingComponent } from './cancel-booking/cancel-booking.component';
import { AdminComponent } from './admin/admin.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent },
  {path: 'book', component: BookCarsComponent },
  {path: 'cancel', component: CancelBookingComponent },
  {path: 'admin', component: AdminComponent },
  { path: 'reset-password', component: ResetPasswordComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
