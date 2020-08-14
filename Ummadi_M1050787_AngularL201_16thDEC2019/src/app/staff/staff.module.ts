import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StaffRoutingModule } from './staff-routing.module';
import { CheckInComponent } from './check-in/check-in.component';
import { SeatlayoutComponent } from './check-in/seatlayout/seatlayout.component';
import { PassengerListComponent, DialogSeatSelectionDialog } from './check-in/passenger-list/passenger-list.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [CheckInComponent, SeatlayoutComponent, PassengerListComponent, DialogSeatSelectionDialog],
  imports: [
    CommonModule,
    StaffRoutingModule,
    MaterialModule, FormsModule, ReactiveFormsModule
  ],
  entryComponents: [DialogSeatSelectionDialog]
})
export class StaffModule { }
