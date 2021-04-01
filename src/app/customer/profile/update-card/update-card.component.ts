import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import {FormBuilder, Validators, FormArray,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { data } from 'jquery';
require("inputmask/dist/inputmask/inputmask.numeric.extensions");
var Inputmask = require("inputmask/dist/inputmask/inputmask.date.extensions");

interface iCards{
  brand?: string
  exp_month?: number
  exp_year?: number
  id?: string
  last4?: string
  active?:number,
  card
}

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.scss']
})
export class UpdateCardComponent implements OnInit {
  months:any=[];
  years:any=[];
  cards:iCards[]=[]
  submit:boolean=false
  loader:boolean=false
  cardActive:number =0
  paymentForm:FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toastr: ToastrService) {
      for (let index = 1; index <= 12; index++) {
        this.months.push(index);
      }
      let year=new Date().getFullYear()
      for (let index = year; index <= (year+25); index++) {
        this.years.push(index);
      }
   }
  ngOnInit() {
    this.authService.getAllCards().subscribe(data=>{
      this.cards=data.data.data
      this.cards = this.cards.map((item ,key)=>{
        item.active=key===0? 1 :0 
        return item
      })
    })

      Inputmask({autoUnmask: true}).mask(document.querySelectorAll("input"));
      this.paymentForm=this.fb.group({
        card_no:['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
        cvvNumber:['',[Validators.required,Validators.minLength(3),Validators.maxLength(4)]],
        ccExpiryMonth:['',Validators.required],
        ccExpiryYear:['',Validators.required],
        terms:[false,Validators.requiredTrue],
      })


  }
 
  onChange(arg){
    
    this.loader=true
    this.cardActive=0
    this.authService.setDefaultCard(arg.id).subscribe(data=>{
      this.toastr.success('Default card changed', 'Success!');
      this.fetchCards()
    },error=>{
      console.log(error)
    })
  }

  submitForm(){
    this.submit=true;
    if(!this.paymentForm.valid){
      console.log('error')
      return;
    }
    this.loader=true
    this.authService.createCard(this.paymentForm.value).subscribe(data=>{
      this.paymentForm.reset()
      this.submit=false
      this.toastr.success('Card added successfully', 'Success!');
      this.fetchCards()
    },error=>{
      this.toastr.error(error, 'Error!');
    })

  }

  fetchCards(){
    
    this.loader=true
    this.authService.getAllCards().subscribe(data=>{
      console.log(data)
      this.cards=data.data.data
      this.cards = this.cards.map((item ,key)=>{
        item.active=key===0? 1 :0 
        return item
      })
      this.loader=false
    })
  }

  deleteCards(arg){
    this.loader=false
    this.authService.deleteCreditCard(arg).subscribe(data=>{
      
    console.log(data)
      this.toastr.success('Card deleted successfully', 'Success!');
      this.fetchCards()
    },error=>{
      this.toastr.error(error, 'Error!');
    })
  }

}
