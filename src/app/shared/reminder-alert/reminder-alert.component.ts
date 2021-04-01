import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';
import { ReminderOpenComponent } from '../reminder-open/reminder-open.component';

@Component({
  selector: 'app-reminder-alert',
  templateUrl: './reminder-alert.component.html',
  styleUrls: ['./reminder-alert.component.scss']
})
export class ReminderAlertComponent implements OnInit {
  @Input() public data;
  active:number=null;
  reminderToDismiss:any=[];
  constructor(private activeModel: NgbActiveModal,private modal:NgbModal,private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  close() {
    this.activeModel.close();
  }

  activeReminder(arg,arg2){
    this.active=arg;
    this.reminderToDismiss=[arg2];
    console.log(this.reminderToDismiss)
  }

  dismiss(arg){
    const argToDismiss= arg===2?this.data.map(item=>item.id): this.reminderToDismiss;
    this.authService.dismissReminder(argToDismiss).subscribe(data=>{
      this.data= this.data.filter(item=>!argToDismiss.includes(item.id))
    })

  }

  openTab(){
    this.activeModel.close();
    const propId= this.data.find(item=>this.reminderToDismiss.includes(item.id))
    //this.router.navigate(['/customer/property', propId.user_property_id]);
    this.dismiss(1)
    const modalRef = this.modal.open(ReminderOpenComponent,{size:'md'})
    modalRef.componentInstance.data=propId
  } 

}
