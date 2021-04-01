import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckMembershipGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if (localStorage.getItem('currentUser')) {
        // logged in so return true
        if (localStorage.getItem('paidMember')) {
          this.router.navigate([''], { queryParams: { returnUrl: state.url }});
          return false;
        } else{
          return true;
        }        
      }  else{
        return true;
      } 
  }
  
}