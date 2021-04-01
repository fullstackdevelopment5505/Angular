import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailModalComponent } from 'src/app/shared/email-modal/email-modal.component';
@Component({
  selector: 'app-email-status',
  templateUrl: './email-status.component.html',
  styleUrls: ['./email-status.component.scss']
})
export class EmailStatusComponent implements OnInit {

  @Input() public data
  @Input() public rows

  constructor(private activeModel: NgbActiveModal,private modal:NgbModal) { }

  ngOnInit() {
  }

  close() {
    this.activeModel.close();
  }    

  getEmailCount():number{
    return this.data.filter(item=>item.email_search_flag===1).length
  }

  emailModal():void{
    this.close()
    const modalRef = this.modal.open(EmailModalComponent)
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
