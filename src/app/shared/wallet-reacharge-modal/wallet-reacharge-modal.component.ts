import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';
// punch
import { Router } from '@angular/router';
// end punch
require("inputmask/dist/inputmask/inputmask.numeric.extensions");
var Inputmask = require("inputmask/dist/inputmask/inputmask.date.extensions");

@Component({
  templateUrl: './wallet-reacharge-modal.component.html'
})

export class walletReachargeComponent implements OnInit{

  @Input() public type;
  @Input() public data;

  depositeForm: FormGroup;
  submitWallet: boolean = false;

  constructor(private activeModel: NgbActiveModal, 

    private authService: AuthService,
    // punch
    private router:Router,
// end punch
    private fb: FormBuilder) {  }

  ngOnInit(): void {
    Inputmask({ autoUnmask: true }).mask(document.querySelectorAll("input"));

    this.depositeForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(50)]],
    })

    this.depositeForm.patchValue({
      amount: this.minAmount()
    });

    this.depositeForm.get('amount').setValidators([Validators.required, Validators.min(this.minAmount())]);
  }

  // convenience getter for easy access to form fields
  get f() { return this.depositeForm.controls; }

  deposite() {
    this.submitWallet = true;
    // if (this.depositeForm.invalid) return;

    // this.authService.walletRecharge( this.depositeForm.value )
    // .subscribe( data => { this.activeModel.close(data); });
    // punch
    this.activeModel.close();
      this.router.navigate(['/customer/wallet']);
    // end punch
  }

  minAmount() {
    if((parseInt(this.data.total_amount) - parseInt(this.data.current_wallet_amount)) >= 50) 
      return parseInt(this.data.total_amount) - parseInt(this.data.current_wallet_amount);
    else return 50;
  }

  close(popupName) {
    this.activeModel.close(popupName);
  }

}
