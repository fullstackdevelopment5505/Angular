import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup  } from '@angular/forms';
import{MustMatch} from 'src/app/helper/match.validator';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot-change-pwd',
  templateUrl: './forgot-change-pwd.component.html',
  styleUrls: ['./forgot-change-pwd.component.scss']
})
export class ForgotChangePwdComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private actRouter:ActivatedRoute,private router:Router,private toastr: ToastrService) { }
  forgotChangePwdForm:FormGroup;
  submit:boolean=false;
  emailId:string;
  tokenNum:string;
  ngOnInit() {
    this.actRouter.queryParams.subscribe(params => {
      this.emailId = params['email'];
      this.tokenNum = params['token'];
    });
    this.forgotChangePwdForm=this.fb.group({
      email:[this.emailId,[Validators.required,Validators.email]],
      token:[this.tokenNum,[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)]],
      password_confirmation:['',[Validators.required,Validators.minLength(6)]]
    },{
      validator: MustMatch('password', 'password_confirmation')
    })
  }
  submitForm(){
    this.submit=true
    if (this.forgotChangePwdForm.invalid) { 
      console.log('invalid')
      return;
    }
    $('#cover-spin').show(0);  
    this.authService.setForgotChangePassword(this.forgotChangePwdForm.value).subscribe((data)=>{
      this.router.navigate(['']);
      this.forgotChangePwdForm.reset();
      $('#cover-spin').hide(0);
    }, (error)=>{
      //alert(error)
      this.toastr.error(error+'!', 'Error!');
      console.log(error)
      this.submit=false;
      this.forgotChangePwdForm.reset();
      $('#cover-spin').hide(0);
    })
  
  }
}
