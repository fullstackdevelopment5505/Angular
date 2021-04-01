import { Component, OnInit,Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.scss']
})
export class EmailModalComponent implements OnInit {

  content=''
  editorInstance
  editorStyle = {
    height: '200px'
  };
  subject?:string=''
  save:boolean=false
  title?:string=''
  allEmail: any = [];

  @Input() public rows

  constructor( private toastr: ToastrService,private activeModel: NgbActiveModal,private authSevice:AuthService) { }

  ngOnInit() {
    this.getAllEmail()
  }

  getAllEmail() {
    this.authSevice.getEmailListData().subscribe(data => {
      this.allEmail = data.data;
    })
  }

  changeSelect(arg){
    this.authSevice.getEmailContentDetail(arg.target.value).subscribe(data=>{
      this.content=data.data.message
      this.subject=data.data.subject
    })
  }

  selectionChange(arg){
    this.editorInstance = arg;
  }

  addText(arg){
    const index= this.editorInstance.getSelection();
    this.editorInstance.insertText(index.index, arg, true);
  }


  sendEmail(){
    if(this.subject==''){
      this.toastr.error('Please fill email subject first','Error!')
    }
    else if(this.content=='' || this.content==null){
      this.toastr.error('Please fill email content first','Error!')
    }
    else if(this.save && this.title==''){
      this.toastr.error('Please fill save title first','Error!')
    }
    else{
      const data = {
        'property_id':this.rows,
        'subject':this.subject,
        'title':this.title,
        'save':this.save? 1 : 0,
        'content': this.content
      }
      this.authSevice.sendEmail(data).subscribe(data=>{
        this.activeModel.close();  
        this.toastr.success('Successfully sent','Success!')
        console.log(data)
      })
    }
  }

  close(){
    this.activeModel.close(); 
  }
}
