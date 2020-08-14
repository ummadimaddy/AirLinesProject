import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminserviceService } from '../../../../admin/adminservice.service';
import { StaffserviceService } from '../../../../staff/staffservice.service';
import { UserService } from 'src/app/services/user.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public isLoggedin = false;
    public display = false;
    public staffCredentials: any[] = [];
    public allUsers: any[];
    public loggedInUser;
    public userID: string;

    constructor(private staffService: StaffserviceService, private adminService: AdminserviceService, private route: Router,
                private userService: UserService) { }
    loginform = new FormGroup({
        email: new FormControl('', [
            Validators.required,
        ]),
        password: new FormControl('', [
            Validators.required,
        ]),
    });

    ngOnInit() {
        this.staffService.getUser().subscribe(x => {
            this.allUsers = x;
        }, error => {
            console.log(error);
        });
        this.userService.userID.subscribe(data => {
            if (data) {
                this.isLoggedin = true;
            } else {
                this.isLoggedin = false;
            }
        });


    }
    public showLogin() {
        this.display = true;
    }
    public logOut() {
        this.isLoggedin = false;
        sessionStorage.removeItem('user');
        this.route.navigate(['/']);
    }
    public clear() {
        this.loginform.reset();
    }
    public onsubmit(loggedIn?: string) {
        let loggedInUser;
        if (loggedIn === 'loggedIn') {
            loggedInUser = this.allUsers.filter(elem => {
                return (elem.userName === this.userID);
            });
        } else {
            loggedInUser = this.allUsers.filter(elem => {
                return (elem.userName === this.loginform.value.email && elem.pass.toString() === this.loginform.value.password);
            });
        }
        if (loggedInUser && loggedInUser.length) {
            this.loggedInUser = loggedInUser[0];
            this.userService.setUserID(this.loggedInUser.userName);

            sessionStorage.setItem('user', this.loggedInUser.userName);
            if (this.loggedInUser.subtype === 'checkin') {
                this.isLoggedin = true;
                this.staffService.setLoggedIn(true);
                this.route.navigate(['/staff/checkin']);
            }  else if (this.loggedInUser.subtype === 'admin') {
                this.isLoggedin = true;
                this.adminService.setLoggedIn(true);
                this.route.navigate(['/admin/homeadmin']);
            }
        } else {
            if (this.loginform.value.email !== '' && this.loginform.value.password !== '') {
                alert('enter the valid credentials');
            }
        }
        this.display = false;
        this.loginform.reset();
    }
}
