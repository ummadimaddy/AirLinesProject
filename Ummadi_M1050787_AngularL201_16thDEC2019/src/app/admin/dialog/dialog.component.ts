import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminserviceService } from '../adminservice.service';

export interface DialogData {
  passengerName: any,
  seatNumber: any,
  flightnumber: any,
  passengerAncillaryServices: any,
  passportNumber: any,
  address: any,
  dob: any,
  doj: any,
  wheelChair: any,
  withInfants: any,
  id: any
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public services = [];
  public flightNumbers = [];
  public id;
  public title = 'Add the Passenger Details';
  public serviceDropdown = false;

  CreatePassenger = new FormGroup({
    passengerName: new FormControl(),
    seatNumber: new FormControl(),
    flightnumber: new FormControl(),
    passengerAncillaryServices: new FormControl(),
    passportNumber: new FormControl(),
    address: new FormControl(),
    dob: new FormControl(''),
    doj: new FormControl(''),
    wheelChair: new FormControl(),
    withInfants: new FormControl()
  });

  public displayDetails: any;
  public flights: any[];

  constructor(public dialogRef: MatDialogRef<DialogComponent>, public adminService: AdminserviceService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (data == null) {
      this.title = 'Add the Passenger Details';
      this.CreatePassenger.reset();
    } else {
      this.title = 'Update the Passenger Details';
      this.CreatePassenger.reset(data);
      this.id = data.id;
    }
  }

  ngOnInit() {
    this.adminService.getFlightDetails().subscribe(res => {
      this.flights = res;
      this.flightNumbers = res.map(elem => elem.flightnumber);
      this.selectedFlight(this.CreatePassenger.controls.flightnumber.value);
    });
  }

  public selectedFlight(event) {
    this.serviceDropdown = true;
    const flightnumber = this.flights.filter(elem => elem.flightnumber === event);
    const flightId = flightnumber.map(elem => elem.id);
    this.adminService.selectedFlightServices(flightId).subscribe(x => {
      this.services = x.ancillaryservices;
    })
  }

  public onsubmit() {
    const data = this.CreatePassenger.value;
    if (this.id === undefined) {
      this.adminService.addPassenger(data).subscribe(res => {
        if (res) {
          this.adminService.statusCode.next('1');
          this.adminService.statusMessage.next('Suucessfully Added the Passenger');
          this.onNoClick();
        } else {
          this.adminService.statusCode.next('0');
          this.adminService.statusMessage.next('Something went wrong');
        }
      });
    } else {
      this.adminService.updatePassenger(this.id, data).subscribe(response => {
        if (response) {
          this.adminService.statusCode.next('1');
          this.adminService.statusMessage.next('Suucessfully Updated the Passenger');
          this.onNoClick();
        } else {
          this.adminService.statusCode.next('0');
          this.adminService.statusMessage.next('Something went wrong');
        }
      });
    }
  }
 public clear() {
    this.CreatePassenger.reset();
  }
  public onNoClick() {
    this.dialogRef.close();
  }
}
