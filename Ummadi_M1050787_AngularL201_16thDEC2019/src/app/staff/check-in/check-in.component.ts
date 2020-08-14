import { Component, OnInit } from '@angular/core';

import { StaffserviceService } from '../staffservice.service';
import { UtilityService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})

export class CheckInComponent implements OnInit {
  public allFlights: any[];
  public allPassengers: any[];
  public dataSource: any[] = [];
  public displayedColumns: string[] = ['flightname', 'flightorigin', 'flightdest', 'flighttime', 'action'];

  public show: boolean;
  public dataItem;

  constructor(private staffService: StaffserviceService,
              private utilityService: UtilityService) { }

  ngOnInit() {
    this.staffService.fetchFlights().subscribe(res => {
      this.allFlights = res;
    }, error => {
      console.log(error);
    });
  }

  public showAllFlights() {
    this.dataSource = this.allFlights.filter(elem => {
      return (elem.flightdate === this.utilityService.formatDate(new Date()));
    });
  }

  public showDetails(event) {
    this.show = false;
    this.staffService.getpassengersDetails().subscribe(res => {
      this.dataItem = res.filter(elem => elem.flightnumber === event.flightnumber);
      this.show = true;
    }, error => {
      console.log(error);
    });
  }
}

