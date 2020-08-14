import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminserviceService } from '../adminservice.service';

export interface DialogData {
  addedService: any;
  id: any;
}

@Component({
  selector: 'app-ancillary-dialog',
  templateUrl: './ancillary-dialog.component.html',
  styleUrls: ['./ancillary-dialog.component.scss']
})

export class AncillaryDialogComponent implements OnInit {

  CreateServices = new FormGroup({
    addedService: new FormControl()
  });

  public title = 'Add Ancillary Services';
  public id: any;
  
  constructor(public dialogRef: MatDialogRef<AncillaryDialogComponent>, public adminService: AdminserviceService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      if(data == null){
        this.title = 'Add the Ancillary Services'
        this.CreateServices.reset()
      } else {
        this.title = 'Update the Ancillary Services'
        this.CreateServices.reset(data)
        this.id = data.id;
      }
    }

  ngOnInit() {
  }

  public onsubmitServices() {
    const data = this.CreateServices.controls.addedService.value;
    if (this.id === undefined) {
      this.adminService.addServices({addedService: data}).subscribe(res => {
        if (res) {
          this.adminService.statusCode.next('1');
          this.adminService.statusMessage.next('Suucessfully Added the Ancillary Service');
          this.onNoClick();
        } else {
          this.adminService.statusCode.next('0');
          this.adminService.statusMessage.next('Something went wrong');
        }
      });
    } else {
      this.adminService.editServices(this.id, {addedService: data}).subscribe(response => {
        if (response) {
          this.adminService.statusCode.next('1');
          this.adminService.statusMessage.next('Suucessfully Updated the Ancillary Service');
          this.onNoClick();
        } else {
          this.adminService.statusCode.next('0');
          this.adminService.statusMessage.next('Something went wrong');
        }
      });
    }
  }

  public onNoClick() {
    this.dialogRef.close();
  }

}
