import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AppState } from './../../../app.state';
import { User } from './../../../models/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-sidebar-customer',
  templateUrl: './sidebar-customer.component.html',
  styleUrls: ['./sidebar-customer.component.scss']
})
export class SidebarCustomerComponent implements OnInit {
  isOpen = false;
  nonMember:boolean;
  modalTitle:string;
  modalContent:string;
  user:Observable<User>;
  load:number=0
  constructor(private authService:AuthService,private actRouter:ActivatedRoute,private router:Router,private store: Store<AppState>) {
    this.user=store.select('user')
  }
  clsNm:string;
  ngOnInit() {
    this.user.subscribe(x=>{
      this.load=x.user
    })
    this.clsNm = this.actRouter.snapshot.routeConfig.path;
    this.clsNm=this.clsNm.replace('/','_')
    // if(this.clsNm != 'results'){
    //   localStorage.removeItem('purGrpNm');
    // }
    if(this.clsNm == ''){
      $('.dashboard').addClass('active');
    }
    else if(this.clsNm == 'warm' || this.clsNm == 'hot'){
      $('.prospects').addClass('active_nav active');
      $('.'+ this.clsNm).addClass('active');
    }
    else if(this.clsNm == 'profile/edit'){

    }
    else if(this.clsNm=='activities'){
      $('.activities').addClass('active');
    }
    else if (this.clsNm == 'sms' || this.clsNm == 'email' || this.clsNm == 'postcard_create' || this.clsNm =='postcard_progress') {
      $('.marketing').addClass('active_nav active');
      $('.'+ this.clsNm).addClass('active');
    }  
    else{
      $('.'+ (this.clsNm).replace(/\/:id/g, '')).addClass('active');
    }

    // const ur =window.location.href
    // if(ur.includes("postcard/create")){
    //   $('.postcard_create').addClass('active');
    // }
    // if(ur.includes("postcard/progress")){
    //   $('.postcard_progress').addClass('active');
    // }




    localStorage.removeItem('advanceSearchForm');
    this.authService.getProfile().subscribe((data)=>{
      if(data.data.reg_status===1){
        this.nonMember = false;
      } else{
        this.nonMember = true;
        //this.router.navigate(['about/membership/payment']);
        this.authService.getBecomeMemberPopupCntnt().subscribe((data)=>{
          console.log(data)
          this.modalTitle = data.become_member_popup_title;
          this.modalContent = data.become_member_popup_content;
        },(error)=>{
          console.log(error)
        })
      }
    },(error)=>{
      console.log(error)
    })
  }
  handleClick(path){
    if(this.load==0 && path==='membership'){
      this.router.navigate(['/membership/payment']);
    }
    else{
      this.router.navigate(['/customer/'+ path]);
    }
    // if(this.nonMember){
    //   $('#confirmModal').modal({backdrop: 'static', keyboard: false})
    //   $('#confirmModal').modal('show');
    // } else {
    // }
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }

  mamberCheck(){
    this.authService.getProfile().subscribe((data)=>{
      if(data.data.reg_status===1){
        this.nonMember = false;
      } else{
        this.nonMember = true;
        //this.router.navigate(['about/membership/payment']);
        this.authService.getBecomeMemberPopupCntnt().subscribe((data)=>{
          console.log(data)
          this.modalTitle = data.become_member_popup_title;
          this.modalContent = data.become_member_popup_content;
        },(error)=>{
          console.log(error)
        })
      }
    },(error)=>{
      console.log(error)
    })
  }

}
