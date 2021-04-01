import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SmsModalComponent } from '../sms-modal/sms-modal.component';

@Component({
  selector: 'app-sms-status',
  templateUrl: './sms-status.component.html',
  styleUrls: ['./sms-status.component.scss']
})
export class SmsStatusComponent implements OnInit {


  @Input() public data
  @Input() public rows

  constructor(private activeModel: NgbActiveModal,private modal:NgbModal) { }

  ngOnInit() {
  }

  close() {
    this.activeModel.close();
  }    

  getSmsCount():number{
    return this.data.filter(item=>item.phone_search_flag===1).length
  }

  smsModal():void{
    this.close()
    const modalRef = this.modal.open(SmsModalComponent)
    modalRef.componentInstance.rows=this.rows
  }

  getLastName(arg){
    let s = arg;
    if(s.indexOf(" ")!=-1){
      const k = s.indexOf(" ", s.indexOf(" ") + 1);
      return s.substring(0,k);
    }
    else{
      return arg
    }
  }

}
