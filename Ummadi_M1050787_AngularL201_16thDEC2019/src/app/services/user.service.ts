import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class UserService {

    userID = new BehaviorSubject<any>(null);

    constructor() {
        const userID = sessionStorage.getItem('user');
        this.userID.next(userID);
    }

    setUserID(id) {
        this.userID.next(id);
    }

}
