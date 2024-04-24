import { Component, Input } from '@angular/core';
import { BookingService } from '../booking.service';
import { UsernameService } from '../username.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-cars',
  templateUrl: './book-cars.component.html',
  styleUrls: ['./book-cars.component.css']
})
export class BookCarsComponent {

  image!: string;
  selectedCar!: string;

  getAuth: boolean= false;
  showCard: Boolean=false;
  secondCard: Boolean=false;
  thirdCard: Boolean=false;
  value: number = 0;
  buyValue: number=0;
  finalValue: number=0;
  rent: boolean = false;
  buy: boolean = false;
  @Input() username: string = '';
  trans_date!: string;
  datetime!:string;

  constructor(private bookingService: BookingService, private usernameService: UsernameService, private router:Router) { } 

  ngOnInit(): void {
    
  
    // Subscribe to the username observable
 this.usernameService.username$.subscribe((username) => {
   this.username = username;
 });
 
     this.usernameService.auth$.subscribe((getAuth) => {
       this.getAuth = getAuth;
     });
     if(!this.getAuth){
     this.usernameService.setBookMode(true);
     this.router.navigate(['/login']);
     }
     
     console.log('Welcome ',this.username);
   }


   toggleCard(i:number) {
    this.showCard = !this.showCard;
    this.secondCard=false;
    this.image="assets/car"+ i +".jpg";
  }

  setCar(car:string){
    this.selectedCar = car;

  }

  bookCar(){



    const today = new Date(); //Ref. https://www.javatpoint.com/typescript-date-object + https://www.w3schools.com/js/js_date_formats.asp
    this.trans_date = today.toLocaleDateString();

    this.bookingService.bookCar(this.username,this.datetime,this.selectedCar,this.finalValue,this.trans_date).subscribe( //WE ARE PASSING SELECTED DATE, AND THIS IS WHAT WE ARE PASSING IN THE BODY OF THE API TO RUNTHE QUERY
    (response) => {
        console.log('Booking successful:', response);
        
        this.username=''
        this.datetime='';
        this.selectedCar='';// This triggers a reload of the current route
        this.finalValue = 0;
        this.trans_date=''
      },
      (error) => {
        console.error('Booking failed:', error);
        if(error.status=400){
        console.log('you cannot book more than 1 desk on a same day');
        }
      }
    );

    this.showCard=false;
    this.secondCard=false;
    this.thirdCard=false;

    alert('Booking Confirmed, Thank you for using eco car');
   }
  

  toggleSecondCard(){
    this.showCard=false;
    this.thirdCard=false;
    this.secondCard=!this.secondCard;
    this.value=0;
    this.finalValue=0;

  }

  closeCard() {
    // Hide or remove the card
    console.log("Closing card...");
    this.showCard=false;
    this.secondCard=false;
    this.thirdCard = false;
  }

  
  increase() {
    this.value++;
  }

  decrease() {
    if (this.value > 0) {
      this.value--;
    }
  }

  toggleThirdCard(){
    this.showCard=false;
    this.secondCard=false;
    this.thirdCard=!this.thirdCard;

  }
  
  toggleShowCard(){
    this.showCard=true;
    this.secondCard=false;
    this.thirdCard=false;
    this.finalValue=0;
  }

  setPriceValue(price:number){
    this.finalValue = price;
  }
  
  setFinalValue(){
    if(this.rent){
      this.finalValue = this.value*10;
    }
  }

  isRent(){
    this.rent = true;
    this.buy = false;

  }

  isBuy(){
    this.rent = false;
    this.buy = true;

  }



}
