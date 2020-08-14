import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StaffserviceService } from '../../../../staff/staffservice.service';
import { AdminserviceService } from '../../../../admin/adminservice.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedin = false;

  constructor(private staffService: StaffserviceService, private adminService: AdminserviceService, private route: Router,
              private userService: UserService) { }


  ngOnInit() {
    this.userService.userID.subscribe(data => {
      if (data) {
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
    });
  }

  public logout() {
    this.isLoggedin = false;
    sessionStorage.removeItem('user');
    this.userService.setUserID(null);
    this.route.navigate(['/']);
  }
}
