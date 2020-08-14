import {
    MatToolbarModule, MatCardModule,
    MatIconModule, MatDialogModule, MatRadioModule,
    MatFormFieldModule, MatButtonModule, MatInputModule, MatNativeDateModule ,
    MatTableModule, MatTabsModule, MatSelectModule, MatDatepickerModule,
    MatButtonToggleModule, MatSnackBarModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatToolbarModule,
        MatCardModule,
        MatRadioModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatTabsModule,
        MatDialogModule,
        MatIconModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatSnackBarModule
    ],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatRadioModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatTabsModule,
        MatDialogModule,
        MatIconModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatSnackBarModule
    ],
    providers: [MatDatepickerModule]
})
export class MaterialModule { }
