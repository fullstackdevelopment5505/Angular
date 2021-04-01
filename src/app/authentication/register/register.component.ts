import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormArray,FormGroup  } from '@angular/forms';
import{ MustMatch } from 'src/app/helper/match.validator';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toastr: ToastrService) { }
  stepFlag = 0; //punch
  enterCode:string = 'asd'; //punch
  receivedCode = '';//punch
  sendFlag = 1;
  phoneVerify:boolean = false; //punch
  registerForm:FormGroup;
  submit:boolean=false;
  states=[];
  cities=[];
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$'; 
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
  shareaffiliateRef:string;
  ngOnInit() {
    this.shareaffiliateRef = this.accessCookie('shareaffiliate')?this.accessCookie('shareaffiliate'):'';
    $('#cover-spin').show(0);
    this.authService.getRegisterTwoCntnt().subscribe((data)=>{
      $('#cover-spin').hide(0);
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
     // alert(error)
      this.toastr.error(error+'!', 'Error!');
      console.log(error)
      $('#cover-spin').hide(0);
    })
    
    this.registerForm=this.fb.group({
      serviceCode:[''],
      f_name:['',[Validators.required,Validators.pattern('^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$'),Validators.minLength(2),Validators.maxLength(40)]],
      // email:['',[Validators.required,Validators.email]],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      // username:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      // state:['',[Validators.required]],
      // city:['',[Validators.required]],
      phone:['+1',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),Validators.minLength(10),Validators.maxLength(11)]],//punch
      // phone:['+1',[Validators.required,Validators.pattern('^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$'),Validators.minLength(10),Validators.maxLength(11)]],//punch
      // address:['',[Validators.required]],
      postal:['',[Validators.required,Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      industry:['',[Validators.required]],
      // password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      // c_password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      shareaffiliateRef:[this.shareaffiliateRef],
      phone_verify:[false],
      aliases: this.fb.array([
        this.fb.control('')
      ])
      
    }/*,{
      validator: MustMatch('password', 'c_password'),
    }*/)

    // this.authService.getStates().subscribe((data)=>{
    //  this.states=data.data;
    // })
    $('#postal').keypress(function(e){
      var keyCode = e.which; 
      if ( !(keyCode >= 48 && keyCode <= 57) && keyCode != 8 && keyCode != 32 && keyCode != 45) {
        e.preventDefault();
      }
    });
    $('#serviceCode').keypress(function(e){
      var keyCode = e.which; 
      if ( !(keyCode >= 48 && keyCode <= 57 ) && !((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) && keyCode != 8 && keyCode != 32) {
        e.preventDefault();
      }
    });
    $('#f_name').keypress(function(e){
      var keyCode = e.which;   
      if ( !((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) && keyCode != 8 && keyCode != 32) {
        e.preventDefault();
      }
    });

}

// onStateChange(value){
//   this.authService.getCity(value).subscribe((data)=>{
//     this.cities=data.data
//   })
// }
onIndustryChange(value){
}
onChangeFormatPostal(event:any){
  var num = event.target.value.replace(/\D/g,'');  
  if(num.length==9){
    event.target.value = num.substr(0,5)+'-'+num.substr(5);
    this.registerForm.patchValue({ 'postal': event.target.value});
  }
}
onChangeFormatPhoneNumber(event:any){    
  event.target.value = this.formatPhoneNumber(event.target.value)
}
formatPhoneNumber(phoneNumberString) {    
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '')
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }
  return phoneNumberString
}
submitForm(buttonType:string): void {
  if(buttonType==='Next') {
      // console.log(buttonType)
      this.submit=true
  if (this.registerForm.invalid) { 
    console.log('invalid')
    return;
  }
  $('#cover-spin').show(0);
  this.authService.getRegister(this.registerForm.value)
  .subscribe((data)=>{    
    $('#cover-spin').hide(0);
    this.toastr.success('Signup successfully! Please check your email for the login details.', 'Success!');
   // alert('Signup successfully, Please check your email for the login details.');
    document.cookie = 'shareaffiliate= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    this.router.navigate(['/authentication/login']);
    // console.log(data)
  },
  (error)=>{
    $('#cover-spin').hide(0);
    //alert(error)
    this.toastr.error(error+'!', 'Error!');
    console.log(error)
  })

  }
  if(buttonType==='Previous'){
      // console.log(buttonType)
      // if(buttonType==='Next') {
        // console.log(buttonType)
        this.submit=true
    if (this.registerForm.invalid) { 
      console.log('invalid')
      return;
    }
    $('#cover-spin').show(0);
    this.authService.getRegister(this.registerForm.value)
    .subscribe((data)=>{    
      $('#cover-spin').hide(0);
      this.router.navigate(['/membership']);
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
  accessCookie(cookieName){
    var name = cookieName + '=';
    var allCookieArray = document.cookie.split(';');
    for(var i=0; i<allCookieArray.length; i++)
    {
      var temp = allCookieArray[i].trim();
      if (temp.indexOf(name)==0)
      return temp.substring(name.length,temp.length);
    }
    return '';
  }
  // punch new func
  resendBtn(flag){
    if(flag == 1){
      if(!this.isControlHasError('phone', 'required') || !this.isControlHasError('phone', 'minlength') || !this.isControlHasError('phone', 'maxlength')){
        this.toastr.error('You have to input correctly', 'Error!');
       return;
      } this.sendFlag = 0;
    }
    var tempForm = this.registerForm.value;
    console.log('resend Btn -',tempForm)
    this.authService.sendPhoneCode(tempForm.phone)
    .subscribe((data)=>{
      this.toastr.success('Sent Verication Code to your Phone', 'Success!');
      console.log('resend Btn',data);
      this.receivedCode = data.message;
    },
    (error)=>{
      this.toastr.error(error, 'Error!');
     
      console.log('resend Btn err',error)
    })
  }
  // punch new func
  stepBtn(flag){  
    var tempForm = this.registerForm.controls;
    if(this.stepFlag == 0)
    {
      if(flag == 1 && (!this.isControlHasError('f_name', 'required') || !this.isControlHasError('email', 'required') || !this.isControlHasError('email', 'pattern') )){
        this.toastr.error('You have to input correctly', 'Error!');
       return;
    }}else if(this.stepFlag ==1){
      if(flag == 1 && (!this.isControlHasError('phone', 'required'))){
         this.toastr.error('You have to input correctly', 'Error!');
        return;
    }}else{
      if(flag == 1 && (!this.isControlHasError('industry', 'required') || !this.isControlHasError('industry', 'pattern')|| !this.isControlHasError('postal', 'required') || !this.isControlHasError('postal', 'pattern'))){
        this.toastr.error('You have to input correctly', 'Error!');
       return;
    }}
    if(flag == 1 && this.stepFlag == 1 && this.phoneVerify == false){
      console.log('enterCode', this.enterCode)
      if(this.enterCode == this.receivedCode && this.enterCode != '')
        {
          this.toastr.success('Phone Verified successfully!.', 'Success!');
            this.registerForm.patchValue({ 'phone_verify':true});
             this.phoneVerify = true;
            this.stepFlag += flag;
        }else{
          this.toastr.error('You have to correct Input Verification Code', 'Error!');
        }
    }
    else{
      this.stepFlag += flag;
    }

  }
  // punch new func
  onEnterCode(e){
    // console.log(this.enterCode)
    console.log('onentercode',e)
    this.enterCode = e;
  }
  // punch new func
  isControlHasError(controlName: string, validationType: string): boolean
  {	
      const control = this.registerForm.controls[controlName];
      if (!control){
        return false;
      }
      const result = !control.hasError(validationType) && (control.dirty || control.touched);
      console.log(control.hasError(validationType))
      console.log(control.dirty )
      console.log(control.touched )
      console.log(control.value )
      return result;	
  }
}
