import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterTwoComponent } from './register-two/register-two.component';


const routes:Routes=[
  {path:'',component:ProfileComponent},
  {path:'edit',component:EditComponent},
  {path:'register',component:RegisterTwoComponent},
]
 
@NgModule({
  declarations: [ProfileComponent,EditComponent,RegisterTwoComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ProfileModule { }
