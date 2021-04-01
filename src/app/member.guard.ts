import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {       
    // if (localStorage.getItem('paidMember')) {
    //   // logged in is member so return true
    //   return true;
    // }           
    // this.router.navigate(['/customer/advance'], { queryParams: { returnUrl: state.url }});
    return true;
  }
}



