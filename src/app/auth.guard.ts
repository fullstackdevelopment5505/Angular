import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot)
    {
      if (localStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
      }        
      this.router.navigate(['/authentication/register'], { queryParams: { returnUrl: state.url }});
      return false;

  }
  
}
