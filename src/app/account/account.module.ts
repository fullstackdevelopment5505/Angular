import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PaymentsComponent } from './payments/payments.component';
import { TransactionComponent } from './transaction/transaction.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { WalletComponent } from './wallet/wallet.component';

const routes : Routes =[
  {path: 'payments',component: PaymentsComponent}, 
  {path: 'transactions',component: TransactionComponent}, 
  {path: 'wallet',component: WalletComponent}, 
]

@NgModule({
  declarations: [TransactionComponent,PaymentsComponent,WalletComponent],
  imports: [
    SharedModule,
    CommonModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
