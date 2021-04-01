import { Component, OnInit,Input,AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-set-reminder',
  templateUrl: './set-reminder.component.html',
  styleUrls: ['./set-reminder.component.scss'],
})
export class SetReminderComponent implements OnInit {

  @Input() public property_id;
  @Input() public reminders;

  reminderForm:FormGroup
  minDate = {};
  submit:boolean=false
  d = new Date();
  constructor(private activeModel: NgbActiveModal,private modal:NgbModal, private fb:FormBuilder,private authService:AuthService) {
    const yesterday= new Date()
    yesterday.setMonth(yesterday.getMonth()+1);  
    yesterday.setDate(yesterday.getDate());  
    this.minDate= {year: this.d.getFullYear(), month: yesterday.getMonth(), day: yesterday.getDate() }
   }

  ngOnInit() {
    console.log(this.reminders)
    this.reminderForm = this.fb.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      note: ['', [Validators.required]],
    })

  }

  close(req):void {
    this.activeModel.close(req);
  }
  
  setRemin():void {
    this.activeModel.close();
  }
  
  convertDatefromat(data) {
    return `${data.year}-${data.month}-${data.day}`;
  }

  setReminder(){
    this.submit=true
    if(!this.reminderForm.valid){
      return 
    }

    const req ={
      property_id:this.property_id,
      notes:this.reminderForm.get('note').value,
      title:this.reminderForm.get('note').value,
      start_date:this.convertDatefromat(this.reminderForm.get('date').value),
      start_time:this.reminderForm.get('time').value
    }

    this.close(req)
  }


  deleteReminder(arg){
    this.authService.deleteReminder(arg).subscribe(data=>{
      this.reminders=this.reminders.filter(item=>item.id!==arg);
    })
  }

}
