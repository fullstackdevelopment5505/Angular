import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { HomeCustomerComponent } from './home-customer/home-customer.component';
import { DashboardProspectComponent } from './dashboard-prospect/dashboard-prospect.component';
import { DashboardProspectWarmComponent } from './dashboard-prospectwarm/dashboard-prospectwarm.component';
import { SharedCustomerModule } from './shared-customer/shared-customer.module';
import { AdvanceCustomerComponent } from './advance-customer/advance-customer.component';
import { ActivitesComponent } from './activities/activities.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WalletCustomerComponent } from './wallet-customer/wallet-customer.component';
import { MembershipCustomerComponent } from './membership-customer/membership-customer.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { MessageDetailComponent } from './message/message-detail/message-detail.component';
import { InterestedComponent } from './property/interested/interested.component';
import { HighlyInterestedComponent } from './property/highly-interested/highly-interested.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import{UpdateCardComponent} from './profile/update-card/update-card.component';
import { TrashComponent } from './trash/trash.component';
import { SearchListComponent } from './search/search-list/search-list.component';
import { PurchasedRecordsComponent } from './purchased-records/purchased-records.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { MessageCreateComponent } from './message/message-create/message-create.component';
import { AdvanceResultComponent } from './advance-result/advance-result.component';
import { SearchDetailComponent } from './search/search-detail/search-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PurchasedHistoryComponent } from './purchased-history/purchased-history.component';
import { PurchasedListComponent } from './purchased-history/purchased-list/purchased-list.component';
import { UploadedListComponent } from './purchased-history/uploaded-list/uploaded-list.component';
import { AllPurchasedRecordsComponent } from './purchased-history/all-purchased-records/all-purchased-records/all-purchased-records.component';
import { AllUploadedRecordsComponent } from './purchased-history/all-uploaded-records/all-uploaded-records.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { UploadPropertyDetailComponent } from './property/upload-property-detail/upload-property-detail.component';
import { AgmCoreModule } from '@agm/core';
import { KickstarterComponent } from './kickstarter/kickstarter.component';
import { MemberGuard } from '../member.guard';
import { ConlactLogComponent } from './property/conlact-log/conlact-log.component';
import { SmsComponent } from './marketing/sms/sms.component';
import { EmailComponent } from './marketing/email/email.component';
import { PostcardComponent } from './marketing/postcard/postcard.component';
import { CommonModalComponent } from './marketing/common-modal/common-modal.component';
import {ChooseProspectComponent} from './marketing/choose-prospect/choose-prospect.component';
import { EmailEditorModule } from 'angular-email-editor';
import {SearchPipeComponent} from './shared-customer/searchPipe/searchPipe.component';
import { PaymentAdvanceComponent } from './payment-advance/payment-advance.component';
import { CreatePostcardComponent } from './marketing/create-postcard/create-postcard.component';
import { CancelMembershipComponent } from './membership-customer/cancel-membership/cancel-membership.component';
import { PostcardProgressComponent } from './marketing/postcard-progress/postcard-progress.component';
import { ProgressDetailComponent } from './marketing/progress-detail/progress-detail.component';
import { QuillModule } from 'ngx-quill';
import { CommonTableComponent } from '../shared/common-table/common-table.component';
import { CommonOverlayComponent } from '../shared/common-overlay/common-overlay.component';
import { MomentModule } from 'ngx-moment';
const routes: Routes = [
      {path:'',component:HomeCustomerComponent, canActivate:[MemberGuard]},
      {path:'activities',component:ActivitesComponent},
      {path:'advance',component:AdvanceCustomerComponent},
      {path:'kickstarter',component:KickstarterComponent, canActivate:[MemberGuard]},
      {path:'results',component:AdvanceResultComponent, canActivate:[MemberGuard]},
      {path:'wallet',component:WalletCustomerComponent, canActivate:[MemberGuard]},
      {path:'membership',component:MembershipCustomerComponent, canActivate:[MemberGuard]},
      {path:'cancel-membership',component:CancelMembershipComponent, canActivate:[MemberGuard]},
      {path:'messages',component:MessageListComponent, canActivate:[MemberGuard]},
      {path:'messages/create',component:MessageCreateComponent, canActivate:[MemberGuard]},
      {path:'messages/:id',component:MessageDetailComponent, canActivate:[MemberGuard]},
      {path:'warm',component:InterestedComponent, canActivate:[MemberGuard]},
      {path:'hot',component:HighlyInterestedComponent, canActivate:[MemberGuard]},
      {path:'profile',component:ViewProfileComponent, canActivate:[MemberGuard]},
      {path:'profile/edit',component:EditProfileComponent, canActivate:[MemberGuard]},
      {path:'profile/update-card',component:UpdateCardComponent},
      {path:'trash',component:TrashComponent, canActivate:[MemberGuard]},
      {path:'search-list',component:SearchListComponent, canActivate:[MemberGuard]},
      {path:'search-list/:id',component:SearchDetailComponent, canActivate:[MemberGuard]},
      {path:'purchased-records',component:PurchasedRecordsComponent, canActivate:[MemberGuard]},
      {path:'purchased-history',component:PurchasedHistoryComponent, canActivate:[MemberGuard]},
      {path:'purchased-list/:id',component:PurchasedListComponent, canActivate:[MemberGuard]},
      {path:'uploaded-list/:id',component:UploadedListComponent, canActivate:[MemberGuard]},
      {path:'all-purchased-records',component:AllPurchasedRecordsComponent, canActivate:[MemberGuard]},
      {path:'all-uploaded-records',component:AllUploadedRecordsComponent, canActivate:[MemberGuard]},
      {path:'contact',component:ContactListComponent, canActivate:[MemberGuard]},
      {path:'property/:id',component:PropertyDetailComponent, canActivate:[MemberGuard]},
      {path:'upload-property/:id',component:UploadPropertyDetailComponent, canActivate:[MemberGuard]},
      {path:'sms',component:SmsComponent},
      {path:'email',component:EmailComponent},
      {path:'postcard',component:PostcardComponent},
      {path:'postcard/create',component:CreatePostcardComponent},
      {path:'postcard/progress',component:PostcardProgressComponent},
      {path:'postcard/progress/:id',component:ProgressDetailComponent},
      {path:'chooseProspect',component:ChooseProspectComponent},
      {path:'payment-advance',component:PaymentAdvanceComponent}
]

@NgModule({
  declarations: [
    HomeCustomerComponent,
    DashboardProspectComponent,
    DashboardProspectWarmComponent,
    CommonTableComponent,
    CommonOverlayComponent,
    ActivitesComponent,
    AdvanceCustomerComponent,
    WalletCustomerComponent,
    MembershipCustomerComponent,
    MessageListComponent,
    MessageDetailComponent,
    InterestedComponent,
    HighlyInterestedComponent,
    ViewProfileComponent,
    EditProfileComponent,
    UpdateCardComponent,
    TrashComponent,
    SearchListComponent,
    PurchasedRecordsComponent,
    ContactListComponent,
    MessageCreateComponent,
    AdvanceResultComponent,
    SearchDetailComponent,
    PurchasedHistoryComponent,
    PurchasedListComponent,
    UploadedListComponent,
    AllPurchasedRecordsComponent,
    PropertyDetailComponent,
    UploadPropertyDetailComponent,
    KickstarterComponent,
    ConlactLogComponent,
    SmsComponent,
    EmailComponent,
    PostcardComponent,
    CommonModalComponent,
    ChooseProspectComponent,
    SearchPipeComponent,
    PaymentAdvanceComponent,
    CreatePostcardComponent,
    CancelMembershipComponent,
    PostcardProgressComponent,
    ProgressDetailComponent,
    AllUploadedRecordsComponent,
  ],
  entryComponents: [
    ConlactLogComponent,
    CommonModalComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    NgbModule,
    SharedCustomerModule,
    NgSelectModule,
    MomentModule,
    EmailEditorModule,
    QuillModule.forRoot(),
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8Aphh9TfxhOqU6-RzeMWt0l8oIzVa8MU'
    })
  ]
})
export class CustomerModule { }
