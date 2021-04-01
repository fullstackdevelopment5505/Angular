import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormArray,FormGroup  } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register-two',
  templateUrl: './register-two.component.html',
  styleUrls: ['./register-two.component.scss']
})
export class RegisterTwoComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toastr: ToastrService) { }

  submit:boolean=false;
  registerForm:FormGroup;
  pgContent:any;
  content_1:string;
  content_2_1:string;
  content_2_2:string;
  content_2_3:string;
  heading_1:string;
  heading_2:string;
  sub_heading_1:string;
  sub_heading_2_1:string;
  sub_heading_2_2:string;
  sub_heading_2_3:string;
  ngOnInit() {
    this.registerForm=this.fb.group({
      f_name:['',[Validators.required]],
      l_name:['',[Validators.required]],
      company:['',[Validators.required]],
      phone:['',[Validators.required]],
      address:['',[Validators.required]],
      postal:['',[Validators.required]],
      aliases: this.fb.array([
        this.fb.control('')
      ])
    })

    this.authService.getRegisterTwoCntnt().subscribe((data)=>{
      console.log(JSON.parse(data.data))
      this.pgContent = JSON.parse(data.data);
      this.content_1 = this.pgContent.content_1;
      this.content_2_1 = this.pgContent.content_2_1;
      this.content_2_2 = this.pgContent.content_2_2;
      this.content_2_3 = this.pgContent.content_2_3;
      this.heading_1 = this.pgContent.heading_1;
      this.heading_2 = this.pgContent.heading_2;
      this.sub_heading_1 = this.pgContent.sub_heading_1;
      this.sub_heading_2_1 = this.pgContent.sub_heading_2_1;
      this.sub_heading_2_2 = this.pgContent.sub_heading_2_2;
      this.sub_heading_2_3 = this.pgContent.sub_heading_2_3;      
    },
    (error)=>{
      this.toastr.error(error, 'Error!');
      //alert(error)
      console.log(error)
    })
  }

  submitForm(){
    this.submit=true
    if (this.registerForm.invalid) { 
      console.log('invalid')
      return;
    }
  
    this.authService.getRegisterTwo(this.registerForm.value)
    .subscribe((data)=>{
      this.router.navigate(['/membership/payment']);
      // console.log(data)
    },
    (error)=>{
      this.toastr.error(error, 'Error!');
      //alert(error)
      console.log(error)
    })
  
  }
  




}
