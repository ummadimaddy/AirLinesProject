import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

import { StaffserviceService } from 'src/app/staff/staffservice.service';
import { AdminserviceService } from '../adminservice.service';

import { DialogComponent } from '../dialog/dialog.component';
import { AncillaryDialogComponent } from '../ancillary-dialog/ancillary-dialog.component';
import { FlightDialogComponent } from '../flight-dialog/flight-dialog.component';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent implements OnInit {

  public displayedColumns: string[] = ['addedService', 'action'];
  public displayedColumns2: string[] = ['passengerName', 'passportNumber', 'address', 'flightnumber', 'action'];
  public displayesColumns3: string[] = ['flightnumber', 'flightname', 'ancillaryservices', 'specialMeals', 'action'];

  public allPassengersDetails: any[];
  public dataSource: any;
  public allFlightDetails: any[];
  public ancillaryservicesList: string[];
  public addPassengerDetails: any[];
  public statusMessage: string;
  public statusCode: string;
  public services;

  constructor(private staffService: StaffserviceService, private adminService: AdminserviceService, private dialog: MatDialog,
              private snackBar: MatSnackBar, private route: Router) {
    this.adminService.getStatusMessage().subscribe(res => {
      this.statusMessage = res;
      if (this.statusCode === '1') {
        this.fetchPassengers();
        this.fetchallServices();
        this.fetchallFlights();
        this.openSnackBar(this.statusMessage, 'OK');
      }
    });
    this.adminService.getStatusCode().subscribe(res => {
      this.statusCode = res;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  ngOnInit() {
    this.fetchPassengers();
    this.fetchallServices();
    this.fetchallFlights();
  }

  public fetchPassengers() {
    this.staffService.getpassengersDetails().subscribe(res => {
      this.allPassengersDetails = res;
      this.dataSource = new MatTableDataSource(this.allPassengersDetails);
    }, error => {
      console.log(error);
    });
  }

  public fetchallServices() {
    this.adminService.loadServices().subscribe(res => {
      this.services = res;
    }, error => {
      console.log(error);
    });
  }

  public fetchallFlights() {
    this.adminService.getFlightDetails().subscribe(res => {
      this.allFlightDetails = res;
    }, error => {
      console.log(error);
    });
  }

  public deleteAncillaryServices(event) {
    this.adminService.deleteServices(event.id).subscribe(res => {
      if (res) {
        this.adminService.statusCode.next('1');
        this.adminService.statusMessage.next('Deleted the service');
      } else {
        this.adminService.statusCode.next('0');
        this.adminService.statusMessage.next('Something went wrong');
      }
    });
  }

  public updatePassengers(event) {
    const dialogRef = this.dialog.open(DialogComponent, {data: event});
    dialogRef.afterClosed().subscribe();
  }

  public onAddPassenger() {
    this.adminService.editedPassengerData(null);
    const dialogRef = this.dialog.open(DialogComponent, {data: null});
    dialogRef.afterClosed().subscribe();
  }

  public updateAncillaryServices(event) {
    const dialogRef = this.dialog.open(AncillaryDialogComponent, {data: event});
    dialogRef.afterClosed().subscribe();
  }

  public onAddServices() {
    this.adminService.editedServicesData(null);
    const dialogRef = this.dialog.open(AncillaryDialogComponent, {data: null});
    dialogRef.afterClosed().subscribe();
  }

  public updateFlightDetalls(event) {
    this.adminService.editedFlightData(event);
    const dialogRef = this.dialog.open(FlightDialogComponent, {});
    dialogRef.afterClosed().subscribe();
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
