import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

import { AdminserviceService } from '../adminservice.service';

export interface DialogData {}

@Component({
  selector: 'app-flight-dialog',
  templateUrl: './flight-dialog.component.html',
  styleUrls: ['./flight-dialog.component.scss']
})

export class FlightDialogComponent implements OnInit {

  UpdateFlightDetails = new FormGroup({
    flightnumber: new FormControl(),
    flightname: new FormControl(),
    ancillaryservices: new FormControl(),
    specialMeals: new FormControl()
  });

  public id: any;
  public services: any[];

  constructor(public dialogRef: MatDialogRef<FlightDialogComponent>, public adminService: AdminserviceService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.adminService.currentFlightData.subscribe(response => {
      if (response != null) {
        this.UpdateFlightDetails = new FormGroup({
          flightnumber: new FormControl(response.flightnumber),
          flightname: new FormControl(response.flightname),
          ancillaryservices: new FormControl(response.ancillaryservices),
          specialMeals: new FormControl(response.specialMeals)
        });
        this.id = response.id;
      }
    });
    this.adminService.loadServices().subscribe(x => {
      this.services = x.map(elem => elem.addedService);
    });
  }

  public onupdate() {
    const data = this.UpdateFlightDetails.value;
    this.adminService.updateFlight(this.id, data).subscribe(response => {
      if (response) {
        this.adminService.statusCode.next('1');
        this.adminService.statusMessage.next('Suucessfully Updated the Fligth Details');
        this.onNoClick();
      } else {
        this.adminService.statusCode.next('0');
        this.adminService.statusMessage.next('Something went wrong');
      }
    });
  }

  public onNoClick() {
    this.dialogRef.close();
  }
  public clear() {
    this.UpdateFlightDetails.reset();
  }

}
