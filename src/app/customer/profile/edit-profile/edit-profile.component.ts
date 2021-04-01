import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import {FormBuilder, Validators, FormArray,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
require("inputmask/dist/inputmask/inputmask.numeric.extensions");
var Inputmask = require("inputmask/dist/inputmask/inputmask.date.extensions");

class profileData{
  id?: number;
  f_name: string;
  l_name?: string;
  company?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  STATE_NAME:string;
  CITY:string;
  STATE_CODE:string;
  address?: string;
  postal?: string;
  industry?:any;
  info:string;
  cityID:number;
  stateID:number;
  created_at?: string;
  updated_at?: string;
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
} 


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  states=[];
  cities=[];
  url:string="";
  imagUrl=false;
  submit:boolean=false;
  profileData=new Profile();
  profileFullData=new profileData();
  profileForm:FormGroup;
  
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toastr: ToastrService) { }

  ngOnInit() {
    $('#cover-spin').show(0);
    Inputmask().mask(document.querySelectorAll("input"));  
    this.authService.getStates().subscribe((data)=>{
      this.states=data.data;
    })

    this.authService.getProfile().subscribe((data)=>{
      console.log(data)
      $('#cover-spin').hide(0);
      if(data.data.image!=null){
        this.url= data.data.image.filename 
        this.imagUrl=true;
      }
      else{
        this.url='http://www.equityfinderspro.com/assets/images/user.png'
      }
      this.profileData=data.data;
      this.profileFullData=data.data.details
      

        this.profileForm.get('email').setValue(this.profileData.email)
        // this.profileForm.get('state').setValue(this.profileFullData.stateID)

        // this.authService.getCity(this.profileFullData.stateID).subscribe((data)=>{
        //   this.cities=data.data
        //   this.profileForm.get('city').setValue(this.profileFullData.cityID)
        // })
      
      if(this.profileFullData!=null){
        if(this.profileFullData.f_name!=null){
          this.profileForm.get('f_name').setValue(this.profileFullData.f_name)
        }
        // if(this.profileFullData.l_name!=null){
        //   this.profileForm.get('l_name').setValue(this.profileFullData.l_name) 
        // }
        if(this.profileFullData.phone!=null){
          this.profileForm.get('phone').setValue(this.profileFullData.phone)
        }
        if(this.profileFullData.industry!=null){
          this.profileForm.get('industry').setValue(Object.keys(JSON.parse(this.profileFullData.industry))[0])
        }
        if(this.profileFullData.postal!=null){
          this.profileForm.get('postal').setValue(this.profileFullData.postal)
        }
        if(this.profileFullData.address!=null){
          this.profileForm.get('address').setValue(this.profileFullData.address)
        }
        if(this.profileFullData.info!=null){
          this.profileForm.get('info').setValue(this.profileFullData.info)
        }
      }

    },(error)=>{
      console.log(error)
    })
    $("#postal").keypress(function(e){
      var keyCode = e.which; 
      if ( !(keyCode >= 48 && keyCode <= 57) && keyCode != 8 && keyCode != 32 && keyCode != 45) {
        e.preventDefault();
      }
    });
  
    $("#f_name").keypress(function(e){
      var keyCode = e.which;   
      if ( !((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) && keyCode != 8 && keyCode != 32) {
        e.preventDefault();
      }
    });

    this.profileForm=this.fb.group({
      file: [''],
      fileSource:[''],
      f_name:['',[Validators.required,Validators.pattern('^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$'),Validators.minLength(2),Validators.maxLength(40)]],
      l_name:[''],
      email:[{value:'',disabled: true},[Validators.required,Validators.email]],
      phone:['',[Validators.minLength(13),Validators.maxLength(18)]],//  Validators.pattern('^((\\+1-?)|0)?[0-9]{10}$'), ^((\\+91-?)|0)?[0-9]{10}$,
      industry:['',[Validators.required]],
      state:[{value:'',disabled: true}],
      city:[{value:'',disabled: true}],
      postal:['',[Validators.required,Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      address:['', [Validators.maxLength(80)]],
      info:[''],
      aliases: this.fb.array([
        this.fb.control('')
      ])
    })

  }
  // onChangeFormatPostal(event:any){
  //   var num = event.target.value.replace(/\D/g,"");  
  //   if(num.length==9){
  //     event.target.value = num.substr(0,5)+'-'+num.substr(5);
  //     this.profileForm.patchValue({ 'postal': event.target.value});
  //   }
  // }
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
  onFileChange(event) {
    const reader = new FileReader();    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);    
      reader.onload = () => {   
        this.url = reader.result as string; 
      };
      this.profileForm.patchValue({
        fileSource: file
      });  
    }
  }


  onStateChange(value){
    this.authService.getCity(value).subscribe((data)=>{
      this.cities=data.data
    })
  }
  
  submitForm(){
    $('#cover-spin').show(0);
    if(this.imagUrl){
      this.profileForm.get('file').clearValidators();
      this.profileForm.get('file').updateValueAndValidity();
      this.profileForm.get('fileSource').clearValidators();
      this.profileForm.get('fileSource').updateValueAndValidity();
    }
    this.submit=true
    if (this.profileForm.invalid) {
      console.log('invalid')
      $('#cover-spin').hide(0);
      return;
    }
    if(this.profileForm.get('phone').value){
      this.profileForm.get('phone').setValue(this.profileForm.get('phone').value.replace(/\D/g,"").substring(1));
    }
    const formData = new FormData();
    formData.append('file', this.profileForm.get('fileSource').value)

    formData.append('f_name', this.profileForm.get('f_name').value);
   // formData.append('l_name', this.profileForm.get('l_name').value);
    formData.append('email', this.profileForm.get('email').value);
    formData.append('industry', this.profileForm.get('industry').value);
    formData.append('phone', this.profileForm.get('phone').value);
    formData.append('postal', this.profileForm.get('postal').value);
    formData.append('address', this.profileForm.get('address').value);
    formData.append('info', this.profileForm.get('info').value);

    this.authService.updateProfile(formData).subscribe((data)=>{
      $('#cover-spin').hide(0);
      console.log(data)
      //alert('Update Successfully')
      this.toastr.success('Updated Successfully!', 'Success!');
    this.router.navigate(['/customer/profile']);
    },(error)=>{
      console.log(error)
      this.toastr.error(error, 'Error!');
      $('#cover-spin').hide(0);
    })
    return;
  }
}
