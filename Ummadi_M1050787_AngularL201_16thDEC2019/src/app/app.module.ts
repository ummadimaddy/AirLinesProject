import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilityService } from './services/utilities.service';
import { MaterialModule } from './material.module';

import { LayoutComponent } from './core/layout/layout/layout.component';
import { HeaderComponent } from './core/layout/partials/header/header.component';
import { LoginComponent } from './core/layout/partials/login/login.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent, LayoutComponent, HeaderComponent, LoginComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule ,
    AppRoutingModule, HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [UtilityService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
