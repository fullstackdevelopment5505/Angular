import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import {FormBuilder, Validators, FormArray,FormGroup  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

class ResponseDetail{
  status:string
  amount:number
}

class CardDetail{
  brand:string
  id:string
  funding:string
  last4:string
  exp_month:number
  exp_year:number
}

@Component({
  selector: 'app-payment-advance',
  templateUrl: './payment-advance.component.html',
  styleUrls: ['./payment-advance.component.scss']
})
export class PaymentAdvanceComponent implements OnInit {
  advanceForm:FormGroup;
  submit:boolean=false;
  
  disabled:boolean=false
  closeResult:string
  cardDetail=new CardDetail()          
  responseDetail=new ResponseDetail()
  @ViewChild('content',{static:false}) private content;
  constructor(private fb:FormBuilder,private authService:AuthService,private modalService: NgbModal,private router:Router) { }

  ngOnInit() {
    $('#cover-spin').show(0);
    this.authService.getDefaultCard().subscribe(data=>{
      console.log(data)
      this.cardDetail=data
      $('#cover-spin').hide(0);
    })



    this.advanceForm=this.fb.group({
      amount:['499',[Validators.required,Validators.pattern('^[0-9]*$')]],
      type:['1'],
  })
}
handleChange(arg){
  this.advanceForm.patchValue({
    amount: arg,
 });
}
handleChangeAmount(arg){
  console.log(arg.target.value)
  this.advanceForm.patchValue({
    type: '',
 });
}

submitForm(){
  this.submit=true
  if (this.advanceForm.invalid) { 
    console.log('invalid')
    return;
  }
  this.disabled=true
  this.authService.walletRecharge(this.advanceForm.value).subscribe(data=>{
    this.disabled=false
    this.responseDetail=data
    this.modalService.open(this.content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.router.navigate(['/customer/advance']);

    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  })
}

}
