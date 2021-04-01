import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormArray,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import * as UserActions from './../../actions/user.actions';
import { AppState } from './../../app.state';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toastr: ToastrService,private store:Store<AppState>) { }

  loginForm:FormGroup;
  submit:boolean=false;
  staticAlertClosed:boolean = true;
  errMsg:string;
  pageTitle:string;
  pageContent:string;

  ngOnInit() {      
    $('#cover-spin').show(0);
    this.authService.getLoginCntnt().subscribe((data)=>{
      $('#cover-spin').hide(0);
      this.pageTitle = data.data.page_title;
      this.pageContent = data.data.page_content;
    },
    (error)=>{
      //alert(error)
      this.toastr.error(error+'!', 'Error!');      
      console.log(error)
    }) 
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      aliases: this.fb.array([
        this.fb.control('')
      ])
    })
  }

  submitForm(){
    this.submit=true
    if (this.loginForm.invalid) { 
      console.log('invalid')
      return;
    }
    $('#cover-spin').show(0);
    this.authService.getLogin(this.loginForm.value)
    .subscribe((data)=>{
      if(data.data.last_login){ 
        ////
        this.authService.getProfile().subscribe((data)=>{        
            this.store.dispatch(new UserActions.UpdateUser({user: data.data.reg_status}))
         // $('#cover-spin').hide(0); 
         console.log(data.data.reg_status)
          if(data.data.reg_status==1){
            this.router.navigate(['/customer']);
          } else{
            $('#cover-spin').hide(0);
            this.router.navigate(['/customer/advance']);
          }
        },(error)=>{
          console.log(error)
        })
        ////////       
        
      } else{
        this.authService.getProfile().subscribe((data)=>{    
          this.store.dispatch(new UserActions.UpdateUser({user: data.data.reg_status}))
          
          $('#cover-spin').hide(0); 
          this.router.navigate(['authentication/change-password']);
        })
      } 
    },
    (error)=>{
      //alert(error)
      //this.toastr.error(error+'!', 'Error!');
      $('#cover-spin').hide(0);
      this.errMsg = error;  //'Your account is no longer active. Kindly contact admin to re-activate your account. Thank you!';
      this.staticAlertClosed = false; 
      console.log(error)
    })
  
  }

}
