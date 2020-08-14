import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StaffserviceService } from './staff/staffservice.service';
import { UserService } from './services/user.service';
@Injectable({
  providedIn: 'root'
})
export class StaffAccessGuard implements CanActivate  {

  userLoggedIn: boolean;

  constructor(private staffService: StaffserviceService, private userService: UserService) {
    this.userService.userID.subscribe(data => {
      if (data) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

 canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userLoggedIn;
  }
}
