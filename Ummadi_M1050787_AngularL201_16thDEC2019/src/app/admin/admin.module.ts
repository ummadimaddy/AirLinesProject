import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MaterialModule } from '../material.module';
 
import { AdminRoutingModule } from './admin-routing.module';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { DialogComponent } from './dialog/dialog.component';
import { AncillaryDialogComponent } from './ancillary-dialog/ancillary-dialog.component';
import { FlightDialogComponent } from './flight-dialog/flight-dialog.component';
@NgModule({
  declarations: [HomeAdminComponent, DialogComponent, AncillaryDialogComponent, FlightDialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ],
  entryComponents: [DialogComponent, AncillaryDialogComponent, FlightDialogComponent]
})
export class AdminModule { }
