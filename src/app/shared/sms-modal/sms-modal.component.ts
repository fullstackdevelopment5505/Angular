import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-sms-modal',
  templateUrl: './sms-modal.component.html',
  styleUrls: ['./sms-modal.component.scss']
})
export class SmsModalComponent implements OnInit {
  @ViewChild('r',{static:false}) r:ElementRef;
  @Input() public rows
  subject?:string=''
  title?:string=''
  allMessages: any = [];
  save:boolean=false
  constructor(private activeModel:NgbActiveModal,private toastr: ToastrService,private authService:AuthService) { }

  ngOnInit() {
    this.getAllmessages()
  }

  sendSms(){
    if(this.subject===''){
      this.toastr.error('Please enter content first')
    }else if(this.save && this.title==''){
      this.toastr.error('Please fill save title first','Error!')
    } else{
      const data={
        "numbers": "+13177729102",
        "message": this.subject,
        "save":this.save?"true":"false",
        "title":this.title,
        "property_id":this.rows
      }
      this.authService.sendSMS(data).subscribe((data) => {
        this.activeModel.close(); 
        this.toastr.success('Message successfully sent')
      },error=>{
        this.toastr.error(error, 'Error!');
      })
    }
  }
  close(){
    this.activeModel.close(); 
  }

  getAllmessages() {
    this.authService.getSMSListData().subscribe(data => {
      this.allMessages =data.data ;
    })
  }

  changeSelect(arg){
    this.subject=arg.target.value
  }

  addText(e):void{


    var startPos=this.r.nativeElement.selectionStart;
    this.r.nativeElement.focus();
    this.r.nativeElement.value=this.r.nativeElement.value.substr(0,this.r.nativeElement.selectionStart)+e+this.r.nativeElement.value.substr(this.r.nativeElement.selectionStart,this.r.nativeElement.value.length);
    //this.r.nativeElement.selectionStart=startPos;
    //this.r.nativeElement.focus();
  }

}
