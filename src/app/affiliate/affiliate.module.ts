import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AffiliateHomeComponent } from './affiliate-home/affiliate-home.component';
import { SharedModule } from '../shared/shared.module';
import { AffiliateSignupComponent } from './affiliate-signup/affiliate-signup.component';
import { AffiliateLoginComponent } from './affiliate-login/affiliate-login.component';


const routes:Routes=[
  { path: '', component:AffiliateHomeComponent},
  { path: 'signup', component:AffiliateSignupComponent},
  { path: 'login', component:AffiliateLoginComponent}
];


@NgModule({
  declarations: [AffiliateHomeComponent, AffiliateSignupComponent, AffiliateLoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AffiliateModule { }
