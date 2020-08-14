import { Injectable } from '@angular/core';

@Injectable()

export class UtilityService {
    public formatDate(parsedDate) {
        if (parsedDate) {
            const month = parsedDate.getMonth() + 1;
            const date = parsedDate.getDate();
            const year = parsedDate.getFullYear();
            return month + '/' + date + '/' + year;
        } else {
            return null;
        }
    }
}
