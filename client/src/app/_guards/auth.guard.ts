import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountservice:AccountService, private toastr:ToastrService) {}

  canActivate(): Observable<boolean> {
    return this.accountservice.currentUser$.pipe(
      map(user => {
        if (user) {
          return true;
        }
        this.toastr.error("you shall not pass!");
        return false;
      })
    )
  }
  
}
