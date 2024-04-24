import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  private usernameSubject = new BehaviorSubject<string>('');
  public username$ = this.usernameSubject.asObservable();

  private bookModeSubject = new BehaviorSubject<boolean>(false);
  public book$ = this.bookModeSubject.asObservable();

  private authModeSubject = new BehaviorSubject<boolean>(false);
  public auth$ = this.authModeSubject.asObservable();

  
  setUsername(username: string): void {
    this.usernameSubject.next(username);
  }

  setAuthMode(auth:boolean): void {
    this.authModeSubject.next(auth);
  }

  setBookMode(book:boolean): void {
    this.bookModeSubject.next(book);
  }



}
