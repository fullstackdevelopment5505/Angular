import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderCustomerComponent } from './header-customer/header-customer.component';
import { SidebarCustomerComponent } from './sidebar-customer/sidebar-customer.component';
import { FooterCustomerComponent } from './footer-customer/footer-customer.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
const component=[HeaderCustomerComponent,SidebarCustomerComponent,FooterCustomerComponent]

@NgModule({
  declarations: [...component],
  imports: [
    ReactiveFormsModule,
    FormsModule, 
    CommonModule,
    RouterModule,
    DataTablesModule,
  ],
  exports:[
    ReactiveFormsModule,
    FormsModule,
    ...component
  ]
})
export class SharedCustomerModule { }
