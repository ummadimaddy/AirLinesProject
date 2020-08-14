import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  api = 'http://localhost:3000/';

  statusMessage = new BehaviorSubject('');
  statusCode = new BehaviorSubject('');
  updatePassengerData = new BehaviorSubject(null);
  currentPassengerData = this.updatePassengerData.asObservable();
  updateServicesData = new BehaviorSubject(null);
  currentServiceData = this.updateServicesData.asObservable();
  updateFlightData = new BehaviorSubject(null);
  currentFlightData = this.updateFlightData.asObservable();
  isLoggedIn = false;

  public editedPassengerData(data) {
    this.updatePassengerData.next(data);
  }

  public editedServicesData(data) {
    this.updateServicesData.next(data);
  }

  public editedFlightData(data) {
    this.updateFlightData.next(data);
  }

  public getStatusMessage() {
    return this.statusMessage.asObservable();
  }

  public getStatusCode() {
    return this.statusCode.asObservable();
  }

  constructor(private http: HttpClient) { }

  public getFlightDetails() {
    return this.http.get<any[]>(this.api + 'flights');
  }

  public updateFlight(flightId, flightObj) {
    return this.http.put<any>(this.api + 'flights/' + flightId, flightObj);
  }

  public addPassenger(passengerObj) {
    return this.http.post(this.api + 'passengers', passengerObj);
  }

  public updatePassenger(passengerId, passengerObj) {
    return this.http.put<any[]>(this.api + 'passengers/' + passengerId, passengerObj);
  }

  public loadServices() {
    return this.http.get<any[]>(this.api + 'ancilleryServices');
  }

  public editServices(serviceId, serviceObj) {
    return this.http.put<any>(this.api + 'ancilleryServices/' + serviceId, serviceObj);
  }

  public deleteServices(id) {
    return this.http.delete<any>(this.api + 'ancilleryServices/' + id);
  }

  public addServices(services) {
    return this.http.post(this.api + 'ancilleryServices', services);
  }

  public selectedFlightServices(number) {
    return this.http.get<any>(this.api + 'flights/' + number);
  }

  public setLoggedIn(toggle: boolean) {
    this.isLoggedIn = toggle;
  }
  
}
