import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormArray,FormGroup  } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
var Inputmask = require("inputmask/dist/inputmask/inputmask.date.extensions");

@Component({
  selector: 'app-affiliate-signup',
  templateUrl: './affiliate-signup.component.html',
  styleUrls: ['./affiliate-signup.component.scss']
})
export class AffiliateSignupComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toastr: ToastrService) { }

  signupForm:FormGroup;
  submit:boolean=false;
  states=[];
  cities=[];
  cityLoading:boolean=false;
  loginData:any;
  username:string;
  userLoggedIn:boolean=false;
  paidMember:boolean=true;
  ngOnInit() {
    this.loginData=JSON.parse(localStorage.getItem('currentUser'));
    if(this.loginData && this.loginData.token){
      this.username=this.loginData.username;
      this.userLoggedIn=true;
      this.authService.getProfile().subscribe((data)=>{        
        if(data.data.member){
          this.paidMember = true;
        } else{
          this.paidMember = false;
        }
      },(error)=>{
        console.log(error)
      })
    }else{
      this.paidMember = false;
    }
    Inputmask({autoUnmask: false}).mask(document.querySelectorAll("input"));
    // $("#postal").keypress(function(e){
    //   var keyCode = e.which; 
    //   if ( !(keyCode >= 48 && keyCode <= 57) && keyCode != 8 && keyCode != 32 && keyCode != 45) {
    //     e.preventDefault();
    //   }
    // });
  
    $("#f_name").keypress(function(e){
      var keyCode = e.which;   
      if ( !((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) && keyCode != 8 && keyCode != 32) {
        e.preventDefault();
      }
    });
    this.authService.getStates().subscribe((data)=>{
      this.states=data.data;
     })
    this.signupForm=this.fb.group({
      //affiliateCode:['',[Validators.required]],
      f_name:['',[Validators.required,Validators.pattern('^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$'),Validators.minLength(2),Validators.maxLength(40)]],
      state:['',[Validators.required]],
      city:['',[Validators.required]],
      postal:['',[Validators.required,Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      phone:['',[Validators.required,Validators.pattern('^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$')]], //,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),Validators.minLength(10),Validators.maxLength(11)
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      address:['']
    })
  }
  onStateChange(value){
    this.signupForm.get('city').setValue('');
    this.cityLoading = true;
    this.cities = [];
    $('[formControlName="city"]').addClass('selectLoading');  
    this.authService.getCity(value).subscribe((data)=>{
      this.cities=data.data;
      this.cityLoading = false;
      $('[formControlName="city"]').removeClass('selectLoading');       
    })
  }
  onChangeFormatPostal(event:any){
    var num = event.target.value.replace(/\D/g,"");  
    if(num.length==9){
      event.target.value = num.substr(0,5)+'-'+num.substr(5);
      this.signupForm.patchValue({ 'postal': event.target.value});
    }
  }
  // onChangeFormatPhoneNumber(event:any){    
  //   event.target.value = this.formatPhoneNumber(event.target.value)
  // }
  // formatPhoneNumber(phoneNumberString) {    
  //   var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  //   var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  //   if (match) {
  //     var intlCode = (match[1] ? '+1 ' : '')
  //     return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  //   }
  //   return phoneNumberString
  // }
  submitForm(){
    $('#cover-spin').show(0);
    this.submit=true
    //this.signupForm.get('phone').setValue(this.signupForm.get('phone').value.replace(/\D/g,""));
    if (this.signupForm.invalid) { 
      console.log('invalid')
     //this.signupForm.get('phone').setValue(this.formatPhoneNumber(this.signupForm.get('phone').value));
      $('#cover-spin').hide(0);
      return;
    }
    
    this.authService.getAffiliateRegister(this.signupForm.value)
    .subscribe((data)=>{    
      this.signupForm.reset();     
     // alert(data.message);
      this.toastr.success(data.message +'!', 'Success!');
      this.router.navigate(['/affiliate']);
      $('#cover-spin').hide(0);
      // console.log(data)
    },
    (error)=>{
      $('#cover-spin').hide(0);
      this.toastr.error(error+'!', 'Error!');
      console.log(error)
    })
  }
}
