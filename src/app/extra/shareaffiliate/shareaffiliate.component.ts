import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-shareaffiliate',
  templateUrl: './shareaffiliate.component.html',
  styles: []
})
export class ShareaffiliateComponent implements OnInit {
  name:string;
  loginData:any;  
  userLoggedIn:boolean=false;
  constructor(private authService:AuthService,private actRouter:ActivatedRoute,private router:Router) { 
    this.loginData=JSON.parse(localStorage.getItem('currentUser'));
    if(this.loginData && this.loginData.token){
      this.userLoggedIn=true;
    }
  }
  
  ngOnInit() {    
    $('#cover-spin').show(0);
    this.actRouter.fragment.subscribe((fragment: string) => {
      console.log(fragment);
      this.name = fragment;
    });
    var date = new Date();
    date.setTime(date.getTime()+(30*24*60*60*1000));    
    if(this.userLoggedIn){
      this.router.navigate(['']);
      $('#cover-spin').hide(0);
    } else{
      document.cookie = 'shareaffiliate=' + this.name + '; expires=' + date.toUTCString();
      this.router.navigate(['/authentication/register']);
      $('#cover-spin').hide(0);
    }    
  }

}
