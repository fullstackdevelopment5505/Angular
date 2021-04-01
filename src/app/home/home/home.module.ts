import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home.component';
import { OwlModule } from 'ngx-owl-carousel';
import { SharedModule } from 'src/app/shared/shared.module';
import { KickStartComponent } from '../kick-start/kick-start.component';
import { CountUpModule } from 'ngx-countup';
import { KickDetailComponent } from '../kick-start/kick-detail/kick-detail.component';

import { TermsComponent } from '../../extra/terms/terms.component';
import { PrivacyComponent } from '../../extra/privacy/privacy.component';
import { FaqComponent } from '../../extra/faq/faq.component';
import { AboutComponent } from '../../extra/about/about.component';
import { ContactComponent } from '../../extra/contact/contact.component';
// import { TeamComponent } from '../../extra/about/team/team.component';
import { MembershipComponent } from '../../extra/membership/membership.component';
// import { CareerComponent } from '../../extra/career/career.component';
// import { CareerDetailComponent } from '../../extra/career/career-detail/career-detail.component';
// import { CareerApplyComponent } from '../../extra/career/career-detail/career-apply/career-apply.component';
import { PaymentComponent } from '../../extra/membership/payment/payment.component';
import { ShareaffiliateComponent } from '../../extra/shareaffiliate/shareaffiliate.component';

import { AuthGuard } from '../../auth.guard';
import { CheckMembershipGuard } from '../../check-membership.guard';

const routes : Routes = [
  { path: '',component: HomeComponent },
  { path: 'kickstarter',component: KickStartComponent },
  { path :'kickstarter/:id',component:KickDetailComponent},
  {path:'terms',component:TermsComponent},
  {path:'privacy',component:PrivacyComponent},
  {path:'faq',component:FaqComponent},
  {path:'aboutus',component:AboutComponent},
  {path:'shareaffiliate',component:ShareaffiliateComponent},
//   {path:'team/:id',component:TeamComponent},
   {path:'contact',component:ContactComponent},
//  // {path:'team',component:TeamComponent},
   {path:'membership',component:MembershipComponent,canActivate:[CheckMembershipGuard]},
//   {path:'career',component:CareerComponent},
//   {path:'career/detail',component:CareerDetailComponent},
//   {path:'career/detail/apply',component:CareerApplyComponent},
   {path:'membership/payment',component:PaymentComponent,canActivate:[AuthGuard]}

]

@NgModule({
  declarations: [
    HomeComponent,
    KickStartComponent,
    KickDetailComponent,
    TermsComponent,PrivacyComponent,FaqComponent,ContactComponent,
    AboutComponent, ShareaffiliateComponent,MembershipComponent,PaymentComponent
   //TeamComponent,CareerComponent,CareerDetailComponent,CareerApplyComponent
  ],
  imports: [
    SharedModule,
    OwlModule,
    CommonModule,
    CountUpModule,
    NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
