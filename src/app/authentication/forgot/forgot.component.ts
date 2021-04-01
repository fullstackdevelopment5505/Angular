import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toastr: ToastrService) { }
  forgotPwdForm:FormGroup;
  submit:boolean=false;

  ngOnInit() {
    this.forgotPwdForm=this.fb.group({
      email:['',[Validators.required,Validators.email]]
    })
  }
  submitForm(){
    $('#cover-spin').show(0);
    this.submit=true
    if (this.forgotPwdForm.invalid) { 
      console.log('invalid')
      $('#cover-spin').hide(0);
      return;
    }
    
    this.authService.forgotPassword(this.forgotPwdForm.value)
    .subscribe((data)=>{    
      this.forgotPwdForm.reset();     
      //alert(data.message);
      this.toastr.success(data.message +'!', 'Success!');
      this.router.navigate(['/authentication/login']);
      $('#cover-spin').hide(0);
      // console.log(data)
    },
    (error)=>{
      $('#cover-spin').hide(0);
      //alert(error)
      this.toastr.error(error+'!', 'Error!');
      console.log(error)
    })
  }
}
