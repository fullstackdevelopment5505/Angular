import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModalComponent } from '../common-modal/common-modal.component';
import { CommonModal } from 'src/app/shared/enums/common-model.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MarketingDataService } from 'src/app/service/marketing-data.service';
import { EmailEditorComponent } from 'angular-email-editor';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ChooseModalComponent } from 'src/app/shared/choose-modal/choose-modal.component';
import { AppState } from './../../../app.state';
import { User } from './../../../models/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  providers: [EmailEditorComponent]
})
export class EmailComponent implements OnInit {
  isEmail: boolean = true;
  searchModel: any = {};

  content=''
  editorInstance
  editorStyle = {
    height: '200px'
  };
  subject?:string=''

  isNewEmail: boolean = false;
  allEmail: any = [];
  allEmailList: any = [];
  errorMsg: any = "";
  erroMsgEmail:any="";
  emailData: any = {};
  emailTemplateList: any = [];
  isSetting: boolean = false;
  isBuild: boolean = true;
  emailErrorMessage: any = "";
  showTemplateDesign={};
  save:boolean=false
  title?:string=''
  emailPostModel: any = {
    title: "",
    template_design_name: "",
    template_subject: "",
    email_preheader: "",
    template_content: "",
    template_json: ""
  };

  testEmailModel: any = {
    email: "",
    message: ""
  };
  options = {
  };

  user:Observable<User>;
  load:number=0

  constructor(private modalService: NgbModal, private router: Router, private authService: AuthService, private marketingDataService: MarketingDataService, private toastr: ToastrService,private store: Store<AppState>) {
    this.user=store.select('user')
   }
  @ViewChild('editor', { static: false })
  private emailEditor: EmailEditorComponent
  ngOnInit() {

    this.user.subscribe(x=>{
      this.load=x.user
    })
    if(this.load==0){

      $('#cover-spin').hide(0);
      return	
    }


    this.GetEmailTemplate();
    this.getAllEmail();

  }

  editorLoaded(event) {
    
    if(this.showTemplateDesign &&Object.keys(this.showTemplateDesign).length){
      this.emailEditor.editor.loadDesign(this.showTemplateDesign);
   }
   else{
    this.emailEditor.editor.loadDesign();
   }
  }

  handleSection(Ident: any, index, templateList?: any) {

    if (Ident == "faq" || Ident == "payment" || Ident == "paymentSucess") {
      this.isEmail = true;
      this.isNewEmail = false;
    }
    else if (Ident == "chooseProspect") {
      if(this.subject==''){

        this.toastr.error('Please enter Subject');
      }
      else if(this.content==null || this.content==''){
        this.toastr.error('Please enter Content');
      }
      else if(this.save && this.title==''){
        this.toastr.error('Please fill save title first','Error!')
      }
      else{

        this.marketingDataService.message = this.content;
        this.marketingDataService.subject = this.subject;
        this.marketingDataService.save = this.save;
        this.marketingDataService.title = this.title;
        const modalRef=this.modalService.open(ChooseModalComponent,{size:'xl'})
        modalRef.componentInstance.type='email'
        modalRef.result.then((data) => {
          if(data==1){
            
          this.getAllEmail();
            this.emailPostModel = {};
            this.isEmail = true;
            this.isNewEmail = false;
            this.emailData.message = '';
            this.content = '';
            this.subject = '';
          }
        })

        //this.router.navigate(['/customer/' + Ident], { queryParams: { prospect: 'email' } });
      }

    }
    else if (Ident == "EditEmail") {
      
      this.emailPostModel.template_design_name = templateList.template_designer_name;
      this.emailPostModel.template_subject = templateList.template_subject;
      this.emailPostModel.email_preheader = templateList.email_preheader;
      this.emailPostModel.template_content = templateList.template_content;
      this.emailPostModel.title = templateList.template_title;
      this.emailPostModel.template_json = templateList.template_json;
      this.showTemplateDesign=JSON.parse(this.emailPostModel.template_json);
      this.isEmail = false;
      this.isNewEmail = true;
     
    }
    else {
      this.emailPostModel = {};
      this.isEmail = false;
      this.isNewEmail = true;
      this.emailData.message = this.allEmail[index] == undefined ? "" : this.allEmail[index].message;
    }
  }

  backBtnClick() {
    window.location.reload();
    this.GetEmailTemplate();
    this.isEmail = true;
    this.isNewEmail = false;
  }
  chooseEmailSetting(selectedValue) {
    if (selectedValue == 'setting') {
      this.isSetting = true;
      this.isBuild = false;
    }
    else {
      this.isSetting = false;
      this.isBuild = true;
    }
  }
  searchEmailTemplate() {
    if (this.searchModel.searchText) {
      this.emailTemplateList = this.allEmailList.filter(x => x.template_title == this.searchModel.searchText);
    }
    else {
      this.emailTemplateList = this.allEmailList;
    }
  }
  open(Ident: any) {

    const modalRef = this.modalService.open(CommonModalComponent, { size: 'lg' });
    modalRef.componentInstance.currentModel = CommonModal.Faq;
    modalRef.componentInstance.type = Ident;

    modalRef.result.then((result) => {
      this.handleSection(result, 0);
    }, (reason) => {

    });
  }

  getAllEmail() {
    this.authService.getEmailListData().subscribe(data => {
      console.log(data)
      this.allEmail = data.data;

    })
  }

  /* method Name:saveDesign
    Purpose: To save design
    author :mahendra singh */
  saveDesign() {
     $('#cover-spin').show(0);
      this.emailEditor.editor.exportHtml((data) => {
      setTimeout(() => {
        if (data) {
          this.emailPostModel.template_content = data.html;
          this.emailPostModel.template_json = data.design
           $('#cover-spin').hide(0);
        }
      }, 1000);
    });
    this.toastr.success('Thank you ! your design has been saved');
  }
  /* method Name:saveEmailData
    Purpose: To save email template
    author :mahendra singh */
  saveEmailData() {
    if (!this.emailPostModel.title || !this.emailPostModel.template_design_name || !this.emailPostModel.template_subject || !this.emailPostModel.email_preheader
      || !this.emailPostModel.template_subject) {
      this.errorMsg = "Required field";
    }
    else{
      this.authService.saveEmailTemplate(this.emailPostModel).subscribe((data) => {
        if (data) {
          this.toastr.success('Your design saved successfully', 'Success!');
          //this.emailPostModel = {};
        }
      }, (error) => {
        this.toastr.error(error, 'Error!');
      });
    }

  }

  /* method Name:GetEmailTemplate
  Purpose: To get email template
  author :mahendra singh */
  GetEmailTemplate() {
    $('#cover-spin').show(0);
    this.authService.getEmailTemplateList().subscribe((data) => {
      this.emailTemplateList = data.data;
      console.log(this.emailTemplateList)
      this.allEmailList = data.data;
      $('#cover-spin').hide(0);
    })

  }
  /* method Name:showPreview
  Purpose: To show  email template
  author :mahendra singh */
  showPreview(modelId, templateData) {
    if (modelId) {
      this.emailPostModel.template_content = templateData.template_content;
      $(modelId).modal();
    }
  }
  /* method Name:sendTestEmail
  Purpose: To send  test email template
  author :mahendra singh */
  sendTestEmail() {

    this.emailErrorMessage = "";
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(this.testEmailModel.email) == false) {
      this.emailErrorMessage = "Invalid Email Address"
      return (false);
    }
    else if( !this.emailPostModel.template_subject || !this.emailPostModel.email_preheader){
      this.errorMsg= "Required field";
    }
    else {
      this.testEmailModel.message = this.emailPostModel.template_content;
      this.testEmailModel["subject"] = this.emailPostModel.template_subject;
      this.testEmailModel["pre_header"] = this.emailPostModel.email_preheader;
      this.authService.sendTestEmail(this.testEmailModel).subscribe((data) => {
        if (data) {
          this.toastr.success('Test Email send successfully! Please check you email', 'Success!');
          this.testEmailModel.email = "";
          this.emailErrorMessage = "";
          this.emailPostModel.email_preheader = "";
          this.emailPostModel.template_subject = "";
        }
      }, (error) => {
        this.toastr.error(error, 'Error!');
      });
    }

  }
  checkEmailValidation(email) {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  selectionChange(arg){
    this.editorInstance = arg;
  }

  addText(arg){
    const index= this.editorInstance.getSelection();
    this.editorInstance.insertText(index.index, arg, true);
  }

  continueTemplate(arg){
    this.authService.getEmailContentDetail(arg).subscribe(data=>{
        this.content=data.data.message
        this.subject=data.data.subject
        this.handleSection('NewEmail',0)
    })
  }
  
}
