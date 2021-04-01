import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { CommonModalComponent } from './common-modal/common-modal.component';
import { walletReachargeComponent } from './wallet-reacharge-modal/wallet-reacharge-modal.component';
import { QuillModule } from 'ngx-quill'
import { EmailModalComponent } from './email-modal/email-modal.component';
import { EmailStatusComponent } from './email-status/email-status.component';
import { SmsModalComponent } from './sms-modal/sms-modal.component';
import { SmsStatusComponent } from './sms-status/sms-status.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { SortableModalComponent } from './sortable-modal/sortable-modal.component';
import { PendingModalComponent } from './pending-modal/pending-modal.component';
import { ChooseModalComponent } from './choose-modal/choose-modal.component';
import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';
import { ReferComponent } from './refer/refer.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PostcardStatusComponent } from './postcard-status/postcard-status.component';
import { RecordNameComponent } from './record-name/record-name.component';
import { RecordNameChangeComponent } from './record-name-change/record-name-change.component';
import { SetReminderComponent } from './set-reminder/set-reminder.component';
import { ReminderCalendarComponent } from './reminder-calendar/reminder-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ReminderAlertComponent } from './reminder-alert/reminder-alert.component';
import { ReminderOpenComponent } from './reminder-open/reminder-open.component';
const component=[ HeaderComponent,ReminderOpenComponent,ReminderAlertComponent, FooterComponent,PendingModalComponent,ChooseModalComponent,ReferComponent,PostcardStatusComponent,RecordNameComponent,RecordNameChangeComponent ]

@NgModule({
  declarations: [SetReminderComponent,ReminderOpenComponent,ReminderCalendarComponent,ReminderAlertComponent, CommonModalComponent, walletReachargeComponent,EmailModalComponent,EmailStatusComponent,SmsModalComponent,SmsStatusComponent,SortableModalComponent, ...component],
  imports: [
    ReactiveFormsModule,
    FormsModule, 
    CommonModule,
    DataTablesModule,
    RouterModule,
    QuillModule.forRoot(),
    SortablejsModule,
    NgSelectModule,
    NgbModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports:[
    ReactiveFormsModule,
    FormsModule,
    QuillModule,
    SortablejsModule,
    ...component
  ],
  entryComponents: [
    CommonModalComponent, 
    walletReachargeComponent,
    EmailModalComponent,
    EmailStatusComponent,
    SmsModalComponent,
    SmsStatusComponent,
    SortableModalComponent,
    PendingModalComponent,
    ChooseModalComponent,
    ReferComponent,
    RecordNameComponent,
    RecordNameChangeComponent,
    PostcardStatusComponent,
    SetReminderComponent,
    ReminderCalendarComponent,
    ReminderAlertComponent,
    ReminderOpenComponent]
})
export class SharedModule { }
