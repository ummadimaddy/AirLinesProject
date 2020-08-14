import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffserviceService {
  api = 'http://localhost:3000/';
  isLoggedIn = false;


  constructor(private http: HttpClient) { }
  getStaffCredentials(){
    return this.http.get<any[]>(this.api + 'staff');
  }
  fetchFlights() {
    return this.http.get<any[]>(this.api + 'flights');
  }

  getUser() {
    return this.http.get<any[]>(this.api + 'users');
  }
  getpassengersDetails() {
    return this.http.get<any[]>(this.api + 'passengers')
  }
  setLoggedIn(toggle: boolean) {
    this.isLoggedIn = toggle;
  }
  seatlayout() {
    return this.http.get<any[]>(this.api + 'seats');
  }
  seatsSelected(id, seatsSelected) {
    return this.http.put<any[]>(this.api + 'flights/' + id , seatsSelected);
  }
  seatNumberPassenger(id, passengerObj){
    return this.http.put<any[]>(this.api + 'passengers/' + id, passengerObj)
  }
}