import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Routes, Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as UserActions from './../../../actions/user.actions';
import { AppState } from './../../../app.state';
import { Store } from '@ngrx/store';

require("inputmask/dist/inputmask/inputmask.numeric.extensions");
var Inputmask = require("inputmask/dist/inputmask/inputmask.date.extensions");
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  months:any=[];
  years:any=[];
  cards:any=[];
  membership:number;
  submit:boolean=false;
  paymentForm:FormGroup;
  previousRoute: string;

  constructor(private authService:AuthService,private fb:FormBuilder,private router:Router,private toastr: ToastrService,private store: Store<AppState>) {     
    for (let index = 1; index <= 12; index++) {
      this.months.push(index);
    }
    let year=new Date().getFullYear()
    for (let index = year; index <= (year+25); index++) {
      this.years.push(index);
    }
    this.authService.getPaymentPage()
    .subscribe((data)=>{
      this.cards=data.data.data.cards;
      this.membership=data.data.membership
      console.log(data)
    },(error)=>{

    })
  }

  ngOnInit() {
    Inputmask({autoUnmask: true}).mask(document.querySelectorAll("input"));
    this.paymentForm=this.fb.group({
      card_no:['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
      cvvNumber:['',[Validators.required,Validators.minLength(3),Validators.maxLength(4)]],
      ccExpiryMonth:['',Validators.required],
      ccExpiryYear:['',Validators.required],
      amount:['',[Validators.required]],
      card:[''],
      terms:[false,Validators.requiredTrue],
    })
  }

  submitForm(){
    this.submit=true;
    if(!this.paymentForm.valid){
      console.log('error')
      return;
    }
    $('#cover-spin').show(0);
    this.authService.buyMembership(this.paymentForm.value)
    .subscribe((data)=>{
      //alert("Payment Successfull");      
      this.toastr.success('Payment Successful!', 'Success!');
      localStorage.setItem('paidMember', 'true');

      this.store.dispatch(new UserActions.UpdateUser({user:1}))

      if(localStorage.getItem('advanceSearchForm')){        
        this.router.navigate(['/customer/advance']);
        $('#cover-spin').hide(0);
      } else{
        this.router.navigate(['/customer/membership', { type: 'new' }]);
        $('#cover-spin').hide(0);
      }    
      console.log(data)
    },(error)=>{
      this.toastr.error(error, 'Error!');
      $('#cover-spin').hide(0);
    })
    return;
  }

  deleteCard(arg){
    const cardData={card_id:arg}
    this.authService.deleteCard(cardData)
    .subscribe((data)=>{
      this.cards=data.data;
      console.log(data)
    },(error)=>{

    })
  }
  selectCard(arg){
    console.log(this.cards[arg])
    this.paymentForm.patchValue({    
      "card_no":this.cards[arg].card_no,  
      "ccExpiryMonth":this.cards[arg].month,  
      "ccExpiryYear":this.cards[arg].year
      }); 
  }

  
}
