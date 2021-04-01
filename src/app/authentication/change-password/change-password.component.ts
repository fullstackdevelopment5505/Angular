import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup  } from '@angular/forms';
import{MustMatch} from 'src/app/helper/match.validator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toastr: ToastrService) { }
  changePwdForm:FormGroup;
  submit:boolean=false;
  loading:boolean=false
  ngOnInit() {
    this.changePwdForm=this.fb.group({
      old_password:['',[Validators.required,Validators.minLength(6)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      password_confirmation:['',[Validators.required,Validators.minLength(6)]],
      aliases: this.fb.array([
        this.fb.control('')
      ])
    },{
      validator: MustMatch('password', 'password_confirmation')
    })
  }
  submitForm(){
    this.submit=true
    this.loading=true
    if (this.changePwdForm.invalid) { 
      console.log('invalid')
      this.loading=false
      return;
    }
    $('#cover-spin').show(0);  
    this.authService.setChangePassword(this.changePwdForm.value).subscribe((data)=>{
      this.router.navigate(['/customer/advance']);
      $('#cover-spin').hide(0);
      this.loading=false
    }, (error)=>{
      this.toastr.error(error+'!', 'Error!');
      //alert(error)
      console.log(error)
      this.submit=false;
      this.loading=false;
      this.changePwdForm.reset();
      $('#cover-spin').hide(0);
    })
  
  }
}
