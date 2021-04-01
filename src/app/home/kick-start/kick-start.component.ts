import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-kick-start',
  templateUrl: './kick-start.component.html',
  styleUrls: ['./kick-start.component.scss']
})
export class KickStartComponent implements OnInit {
  data:any=[];
  loginData:any;
  userLoggedIn:boolean=false;
  constructor(private router:ActivatedRoute,private authService:AuthService,private route:Router) {
    this.loginData=JSON.parse(localStorage.getItem('currentUser'));
    if(this.loginData && this.loginData.token){
      this.userLoggedIn=true;
    }
   }

  ngOnInit() {
    $('#cover-spin').show(0);
    if(!this.userLoggedIn){
      this.authService.kickList()
      .subscribe((user)=>{
        console.log(user)
        this.data=user.data
        $('#cover-spin').hide(0);
      })
    }
    else{
      this.authService.kickListLogin()
      .subscribe((user)=>{
        console.log(user)
        this.data=user.data
        $('#cover-spin').hide(0);
      })
    }
  }

  saveLike(arg,id){
    if(!this.userLoggedIn){
      this.route.navigate(['/authentication/login']);
    }
    
    let idData={id:id}
    this.authService.saveLike(idData)
    .subscribe(data=>{
      this.data[arg].status= this.data[arg].status==1? null : 1;
      console.log(data)
    },error=>{
      console.log(error)
    })

  }


}
