import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SidebarCustomerComponent } from '../../shared-customer/sidebar-customer/sidebar-customer.component';
import * as UserActions from './../../../actions/user.actions';
import { AppState } from './../../../app.state';
import { Store } from '@ngrx/store';


class CancelMembership{
  amount?: number
  created_at?: string
  description?: string
  id?: number
  login_users?: number
  page_title?: string
  type?: string 
}

class UserMembership{
  created_at: Date
}

class Request{
  reasonId:string
  reasonText:string
  otherText?:string
  cancel:number
  subject?:string
  comment?:string
}

@Component({
  selector: 'app-cancel-membership',
  templateUrl: './cancel-membership.component.html',
  styleUrls: ['./cancel-membership.component.scss']
})
export class CancelMembershipComponent implements OnInit {

  currentStep:number = 1
  active_form:number = 0
  radio1:string = '0'
  reason:string = '';
  cancel:number= 1;
  subject:string='';
  comment:string='';
  cancelMessage:string='The concerned person will reach you within 12 Hours.'
  request = new Request()
  cancelMembership= new CancelMembership();
  userMembership= new UserMembership();

  @ViewChild(SidebarCustomerComponent,{static:false}) sidebar;

  constructor(private authService:AuthService,private toastr: ToastrService,private router:Router,private store:Store<AppState>) { }

  
  ngOnInit() {
      this.authService.getMembershipDetails().subscribe(data=>{
        this.cancelMembership=data.membership_plan_data
      })

      this.authService.getProfile()
      .subscribe((data)=>{
        if(data.data.reg_status!==1){
          this.router.navigate(['/customer/advance'])
        }

        this.userMembership=data.data.member
      })
  }

  firstStep():void {
    if(this.radio1==='0'){
      this.toastr.error('Please select reason', 'Error!');
    }
    else if(this.radio1==='5' && this.reason===''){
      this.toastr.error('Please enter reason', 'Error!');
    }
    else{
      ++this.currentStep
    }
  }
  

  secondStep():void {
    ++this.currentStep
  }
  
  thirdStep():void {
    ++this.currentStep
  }

  prevStep():void {
    --this.currentStep
  }

  startChat():void {
    this.active_form=this.active_form===1? 0 : 1
  }
  
  modelChangeFn(arg):void{
    if(arg!=='5'){
      this.reason=''
    }
  }


  verifyMessage(): void{
    if(this.subject.trim()===''){
      this.toastr.error('Please enter subject', 'Error!');
    }
    else if(this.comment.trim()===''){
      this.toastr.error('Please enter comment', 'Error!');
    }
    else{
      this.cancel=0
      this.makeRequest()
    }
  }

  makeRequest():void{
    this.request.cancel=this.cancel
    this.request.reasonId=this.radio1
    this.request.otherText=this.reason
    this.request.subject=this.subject
    this.request.comment=this.comment

    switch(this.radio1) {
      case '1':
        this.request.reasonText="I'm having too many techincal issues."
        break;
      case '2':
        this.request.reasonText="The plan did not work as expected."
        break;
      case '3':
        this.request.reasonText="I'm not using the products often enough."
        break;
      case '4':
        this.request.reasonText="It's too expensive."
        break;
      case '5':
        this.request.reasonText="Other (Please Specify)."
        break;
      default:
        this.request.reasonText='N/A'
    }
    this.cancelMessage=this.cancel===0 ? 'The concerned person will reach you within 12 Hours.' : 'Your membership plan will be cancel within 24 Hours.'
    this.authService.cancelMembershipRequest(this.request).subscribe(data=>{
      console.log(data)
      ++this.currentStep

      if(this.cancel===1){
        this.store.dispatch(new UserActions.UpdateUser({user: 0}))
        //this.sidebar.mamberCheck()
      }

    })
    // ++this.currentStep
  }

  

}


