import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
declare var $: any;

class Maintainance {
  maintenance_banner_content?: string
  maintenance_banner_title?: string
  status?:string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  maintainance=new Maintainance();
  constructor(private router:Router,private authService:AuthService) { }
  loginData:any;
  username:string;
  userLoggedIn:boolean=false;
  paidMember:boolean=true;
  ngOnInit() {

    this.authService.getMaintainanceBanner().subscribe(data=>{
      console.log(data)
      this.maintainance=data
    })

    this.loginData=JSON.parse(localStorage.getItem('currentUser'));
    if(this.loginData && this.loginData.token){
      this.username=this.loginData.username;
      this.userLoggedIn=true;
      // this.authService.getProfile().subscribe((data)=>{        
      //   if(data.data.member){
      //     this.paidMember = true;
      //   } else{
      //     this.paidMember = false;
      //   }
      // },(error)=>{
      //   console.log(error)
      // })
      if (localStorage.getItem('paidMember')) {
        this.paidMember = true;
      } else{
        this.paidMember = false;
      }
    }else{
      this.paidMember = false;
    }
    $(document).on('click', function(event) {
      if (!$(event.target).closest('.profile_demo').length) {
        $(".dropside").hide();
      }
    });
  }

  
  slide(){
    $(".dropside").slideToggle();
  }


  logout(){
    this.authService.logout();
    this.userLoggedIn=false;
    this.router.navigate(['/authentication/login']);
    // location.reload();
  }

}
