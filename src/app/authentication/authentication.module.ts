import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotComponent } from './forgot/forgot.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotChangePwdComponent } from './forgot-change-pwd/forgot-change-pwd.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes : Routes = [
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'forgot', component:ForgotComponent},
  { path: 'change-password', component:ChangePasswordComponent},
  { path: 'forgot-password', component:ForgotChangePwdComponent}
]

@NgModule({
  declarations: [LoginComponent,RegisterComponent,ForgotComponent, ChangePasswordComponent, ForgotChangePwdComponent],
  imports: [    
    NgbModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthenticationModule { }
