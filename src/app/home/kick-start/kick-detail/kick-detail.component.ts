import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-kick-detail',
  templateUrl: './kick-detail.component.html',
  styleUrls: ['./kick-detail.component.scss']
})
export class KickDetailComponent implements OnInit {
  images:any=[];
  name:string;
  id:string;
  status:string;
  description:string;
  image:string;
  loginData:any;
  userLoggedIn:boolean=false;
  membership:any;
  constructor(private authService:AuthService,private router:ActivatedRoute,private route:Router,private toastr: ToastrService) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.loginData=JSON.parse(localStorage.getItem('currentUser'));
    if(this.loginData && this.loginData.token){
      this.userLoggedIn=true;
    }
   }

  ngOnInit() {
    $('#cover-spin').show(0);
    if(!this.userLoggedIn){
      this.authService.getListDetail(this.router.params['value'].id)
      .subscribe((data)=>{
        console.log(data)
        this.id=data.detail.user_id
        this.name=data.detail.name
        this.image=data.detail.profile_image.filename
        this.description=(data.detail.description).replace(new RegExp('\n', 'g'), "<br />")
        this.status=data.detail.status;
        this.images = data.related_kicks;
        $('#cover-spin').hide(0);
      })

      // this.authService.kickList()
      // .subscribe((user)=>{
      //   console.log(user)
      //   this.images=user.data
      //   console.log(this.images)
      // })
    }
    else{
      this.authService.getListDetailLogin(this.router.params['value'].id)
      .subscribe((data)=>{
        console.log(data)
        this.id=data.detail.user_id
        this.name=data.detail.name
        this.image=data.detail.profile_image.filename
        this.description=(data.detail.description).replace(new RegExp('\n', 'g'), "<br />")
        this.status=data.detail.status;
        this.images = data.related_kicks;
        $('#cover-spin').hide(0);
      })

      // this.authService.kickListLogin()
      // .subscribe((user)=>{
      //   console.log(user)
      //   this.images=user.data
      //   console.log(this.images)
      // }) 
      this.authService.getProfile().subscribe((data)=>{
        this.membership=data.data.member;  
      },(error)=>{
        console.log(error)
      }) 
    }
  }

  viewPg(){
    if(!this.userLoggedIn){
      this.route.navigate(['/authentication/login']);
    } else{
      if(this.membership.id){
        if(confirm("50 points will be deduct from Wallet")) {
          this.route.navigate(['/search/87422113']);
        }
      } else{
        this.toastr.warning('Please Become Member!', 'Warning!');
        //alert('login non member');
        this.route.navigate(['/membership/payment']);
      }
    }
  }
  saveLikes(){
    if(!this.userLoggedIn){
      this.route.navigate(['/authentication/login']);
    }
    
    let idData={id:this.id}
    this.authService.saveLike(idData)
    .subscribe(data=>{
      this.status= this.status=='1'? null : '1';
      console.log(data)
    },error=>{
      console.log(error)
    })

  }

  saveLike(arg,id){
    if(!this.userLoggedIn){
      this.route.navigate(['/authentication/login']);
    }
    
    let idData={id:id}
    this.authService.saveLike(idData)
    .subscribe(data=>{
      this.images[arg].status= this.images[arg].status==1? null : 1;
      console.log(data)
    },error=>{
      console.log(error)
    })

  }


}
