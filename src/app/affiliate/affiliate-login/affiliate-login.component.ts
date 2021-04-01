import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormArray,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-affiliate-login',
  templateUrl: './affiliate-login.component.html',
  styleUrls: ['./affiliate-login.component.scss']
})
export class AffiliateLoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toastr: ToastrService) { }
  loginForm:FormGroup;
  submit:boolean=false;
  ngOnInit() {
    console.log('error')
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]]
    })
  }
  submitForm(){
    this.submit=true
    if (this.loginForm.invalid) { 
      console.log('invalid')
      return;
    }
    this.authService.getAffiliateLogin(this.loginForm.value).subscribe((data)=>{
      this.router.navigate(['/affiliate/customer']);
    },
    (error)=>{
      //alert(error)
      this.toastr.error(error+'!', 'Error!');
      console.log(error)
    })
  
  }
}
