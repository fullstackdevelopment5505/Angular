import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
// import { TermsComponent } from './terms/terms.component';
// import { PrivacyComponent } from './privacy/privacy.component';
// import { FaqComponent } from './faq/faq.component';
//import { AboutComponent } from './about/about.component';
//import { ContactComponent } from './contact/contact.component';
import { OwlModule } from 'ngx-owl-carousel';
import { TeamComponent } from './about/team/team.component';
import { MembershipComponent } from './membership/membership.component';
import { CareerComponent } from './career/career.component';
import { CareerDetailComponent } from './career/career-detail/career-detail.component';
import { CareerApplyComponent } from './career/career-detail/career-apply/career-apply.component';
// import { PaymentComponent } from './membership/payment/payment.component';
// import { AuthGuard } from '../auth.guard';
//import { ShareaffiliateComponent } from './shareaffiliate/shareaffiliate.component';
const routes:Routes=[
  // {path:'terms',component:TermsComponent},
  // {path:'privacy',component:PrivacyComponent},
  // {path:'faq',component:FaqComponent},
 // {path:'aboutus',component:AboutComponent},
  {path:'team/:id',component:TeamComponent},
  //{path:'contact',component:ContactComponent},
 // {path:'team',component:TeamComponent},
 // {path:'membership',component:MembershipComponent},
  {path:'career',component:CareerComponent},
  {path:'career/detail',component:CareerDetailComponent},
  {path:'career/detail/apply',component:CareerApplyComponent},
 // {path:'membership/payment',component:PaymentComponent,canActivate:[AuthGuard]},
]
 
@NgModule({
  //declarations: [TermsComponent,PrivacyComponent,FaqComponent,ContactComponent,AboutComponent,ShareaffiliateComponent,MembershipComponent,PaymentComponent],
  declarations: [TeamComponent,CareerComponent,CareerDetailComponent,CareerApplyComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    OwlModule,
    CommonModule
  ]
})
export class ExtraModule { }
