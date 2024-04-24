import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getAllUserNames(): Observable<any> {
    return this.http.get(`http://localhost:3000/getAllUsernames`);
  }

  signup(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/signup', { username, password });
  }
  
  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/login', { username, password });
  }

  changePassword(username:string,newPassword: string): Observable<any> {
    const url = `http://localhost:3000/changePass`;
    return this.http.put(url, { newPassword,username });
  }

  
  bookCar(username:string, datetime:string,car:string, amount:number, trans_date:string){
    return this.http.post('http://localhost:3000/booking', { username, datetime,car, amount, trans_date});

  }

  

}
