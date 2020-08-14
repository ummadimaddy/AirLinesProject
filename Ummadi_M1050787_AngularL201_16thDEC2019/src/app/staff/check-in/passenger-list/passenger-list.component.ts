import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { StaffserviceService } from 'src/app/staff/staffservice.service';

export interface DialogData {
  data: any;
}

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {
  displayedColumns: string[] = ['passengerName', 'ancillaryservices', 'seat', 'action'];
  @Input() show: boolean;
  @Input() dataItem;

  public selectedFlight;
  public seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  public isValid = [false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false];
  constructor(public dialog: MatDialog, private staffService: StaffserviceService) { }

  ngOnInit() {
  }

  public flightSelected(event) {
    if (event.tab.textLabel === 'In Flight') {
      this.staffService.fetchFlights().subscribe(res => {
        this.selectedFlight = res.filter(elem => elem.flightnumber === this.dataItem[0].flightnumber);
        if (this.selectedFlight) {
          if (this.selectedFlight[0].seatsSelected.length > 0) {
            let i, j;
            this.isValid = [false, false, false, false, false, false, false, false, false,
              false, false, false, false, false, false, false, false, false, false, false];
            for (i = 0; i < this.seats.length; i++) {
              for (j = 0; j < this.selectedFlight[0].seatsSelected.length; j++) {
                if (this.seats[i] === this.selectedFlight[0].seatsSelected[j]) {
                  this.isValid[this.seats[i] - 1] = true;
                }
              }
            }
          }
        }
      });
    }

  }


  public seatSelection(event) {
    const dialogRef = this.dialog.open(DialogSeatSelectionDialog, {
      width: '250px',
      data: event
    });
    dialogRef.afterClosed().subscribe();
  }
}


// FOR SEAT SELECTION POP-UP
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'seatSelection.html',
})

export class DialogSeatSelectionDialog {
  public seats: any;
  // public seats: any;
  // public bookedSeats: any;
  public colourSeat;
  public passengerDetails;
  public selectedFlight;
  public isValid = [false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false];
  constructor(public dialogRef: MatDialogRef<DialogSeatSelectionDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private staffService: StaffserviceService) {
    this.passengerDetails = data;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.staffService.fetchFlights().subscribe(res => {
      this.selectedFlight = res.filter(elem => elem.flightnumber === this.passengerDetails.flightnumber);
      // this.seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      // this.bookedSeats = this.selectedFlight.seatsSelected;
      this.seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

      if (this.selectedFlight) {
        if (this.selectedFlight[0].seatsSelected.length > 0) {
          let i, j;
          this.isValid = [false, false, false, false, false, false, false,
             false, false, false, false, false, false, false, false, false, false, false, false, false];
          for (i = 0; i < this.seats.length; i++) {
            for (j = 0; j < this.selectedFlight[0].seatsSelected.length; j++) {
              if (this.seats[i] === this.selectedFlight[0].seatsSelected[j]) {
                this.isValid[this.seats[i] - 1] = true;
              }
            }
          }
        }
      }
    });
  }
  public slectedSeat(event: number) {
    this.colourSeat = event;
    this.passengerDetails.seatNumber = event;
  }
  confirmSeat() {
    this.selectedFlight[0].seatsSelected.push(this.passengerDetails.seatNumber);

    const passengerObj = {
      passengerName: this.passengerDetails.passengerName,
      address: this.passengerDetails.address,
      passportNumber: this.passengerDetails.passportNumber,
      doj: this.passengerDetails.doj,
      withInfants: this.passengerDetails.withInfants,
      flightnumber: this.passengerDetails.flightnumber,
      flightname: this.passengerDetails.flightname,
      flightorigin: this.passengerDetails.flightorigin,
      flightdest: this.passengerDetails.flightdest,
      flighttime: this.passengerDetails.flighttime,
      passengerAncillaryServices: this.passengerDetails.passengerAncillaryServices,
      food: this.passengerDetails.food,
      childAllow: this.passengerDetails.childAllow,
      wheelChair: this.passengerDetails.wheelChair,
      checkedin: this.passengerDetails.checkedin,
      seatNumber: this.passengerDetails.seatNumber,
      id: this.passengerDetails.id
    };
    const inputParam = {
      flightnumber: this.selectedFlight[0].flightnumber,
      flightname: this.selectedFlight[0].flightname,
      flightorigin: this.selectedFlight[0].flightorigin,
      flightdest: this.selectedFlight[0].flightdest,
      flighttime: this.selectedFlight[0].flighttime,
      flightprice: this.selectedFlight[0].flightprice,
      reachtime: this.selectedFlight[0].reachtime,
      flightdate: this.selectedFlight[0].flightdate,
      food: this.selectedFlight[0].food,
      childAllow: this.selectedFlight[0].childAllow,
      wheelChair: this.selectedFlight[0].wheelChair,
      id: this.selectedFlight[0].id,
      ancillaryservices: this.selectedFlight[0].ancillaryservices,
      specialMeals: this.selectedFlight[0].specialMeals,
      seatsSelected: this.selectedFlight[0].seatsSelected
    };
    this.staffService.seatsSelected(this.selectedFlight[0].id, inputParam).subscribe();
    this.staffService.seatNumberPassenger(this.passengerDetails.id, passengerObj).subscribe();
    this.dialogRef.close();
  }
}
