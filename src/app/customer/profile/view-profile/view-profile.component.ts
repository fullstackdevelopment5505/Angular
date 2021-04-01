import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import {FormBuilder, Validators, FormGroup  } from '@angular/forms';
import{MustMatch} from 'src/app/helper/match.validator';
import { ToastrService } from 'ngx-toastr';
import { AppState } from './../../../app.state';
import { User } from './../../../models/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

declare var $: any;

class profileData{
  id?: number
  f_name: string
  l_name?: string
  company?: string
  phone?: string
  country?: string
  state?: string
  city?: string
  STATE_NAME?:string
  CITY?:string
  STATE_CODE?:string
  address?: string
  postal?: string
  info?:string
  created_at?: string
  updated_at?: string
  industry: any  
  service_code?: number
  service_code_prefix?: string
  username?: string

}

class Profile{
id: number
username: string
email: string
email_verified_at?: string
type: string
status: string
reg_status: string
created_at: string
updated_at:string
service_code?: number
service_code_prefix?: string
} 
class PurchasedRecord{
  count:number
}
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  url:string="";
  profileData=new Profile();
  profileFullData=new profileData();
  membership:any;
  purchasedRecord=new PurchasedRecord() ;
  changePwdForm:FormGroup;
  submit:boolean=false;
  
  user:Observable<User>;
  load:number=0
  
  constructor(private fb:FormBuilder, private authService:AuthService,private toastr: ToastrService,private store: Store<AppState>) {
    this.user=store.select('user')
   }

  ngOnInit() {

    this.user.subscribe(x=>{
      this.load=x.user
        })
        if(this.load==0){
          this.url='assets/images/user.png'

          this.profileFullData={
            'address': null,
            'city': null,
            'company': null,
            'country': null,
            'created_at': "2020-10-03 09:43:08",
            'f_name': "Equity Tester",
            'id': 473,
            'industry': "Investigator",
            'info': null,
            'l_name': null,
            'phone': null,
            'postal': "45353",
            'state': null,
            'updated_at': "2020-10-03 09:43:08"
          }
          this.profileData={
            id: 11,
            username: "equity",
            email: "equity@gmail.com",
            email_verified_at: "2020-10-03 09:43:08",
            type: "string",
            status: "string",
            reg_status: "1",
            created_at: "2020-10-03 09:43:08",
            updated_at:"2020-10-03 09:43:08" ,
          }
          $('#cover-spin').hide(0);
          return	
    }
    $('#cover-spin').show(0);
    this.authService.getProfile().subscribe((data)=>{
      this.membership=data.data.member;
      console.log(data)
      $('#cover-spin').hide(0);
      if(data.data.image!=null){
        this.url= data.data.image.filename 
      }
      else{
        this.url='assets/images/user.png'
      }

      this.profileData=data.data;
      console.log(this.profileData)
      this.profileFullData=data.data.details;
      this.profileFullData.industry = Object.values(JSON.parse(this.profileFullData.industry))[0];

    },(error)=>{
      console.log(error)
    })
    this.authService.getPuechasedRec().subscribe((data)=>{
         this.purchasedRecord=data.data;
      console.log(data);
    },(error)=>{
      console.log(error)
    })
    this.changePwdForm=this.fb.group({
      old_password:['',[Validators.required,Validators.minLength(6)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      password_confirmation:['',[Validators.required,Validators.minLength(6)]],
      aliases: this.fb.array([
        this.fb.control('')
      ])
    },{
      validator: MustMatch('password', 'password_confirmation'),
    })
    $('#changePasswordModal').on('hidden.bs.modal', function (e) {
      $(this)
        .find("input").val('').end();
    });
  }

  copyAffiliate(inputElement){
    inputElement.select();
    document.execCommand('copy');
    // inputElement.setSelectionRange(0, 0);
  }
  copyServiceCode(inputElement){
    inputElement.select();
    document.execCommand('copy');
    // inputElement.setSelectionRange(0, 0);
  }

  submitForm(){
    this.submit=true
    if (this.changePwdForm.invalid) { 
      console.log('invalid')
      return;
    } 
    $('#cover-spin').show(0);       
    this.authService.setChangePassword(this.changePwdForm.value).subscribe((data)=>{
     // alert(data.message);
    this.toastr.success(data.message, 'Success!');
     this.submit=false;
     this.changePwdForm.reset();
      $('#changePasswordModal').modal('hide');
      $('#cover-spin').hide(0);
    }, (error)=>{
      this.toastr.error(error, 'Error!');
      //alert(error)
      console.log(error)
      this.submit=false;
      this.changePwdForm.reset();
      $('#changePasswordModal').modal('hide');
      $('#cover-spin').hide(0);
    })
  
  }
}
