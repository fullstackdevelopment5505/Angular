import { Component, OnInit, ViewChild, Input,ElementRef } from '@angular/core';
import { from, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModalComponent } from '../common-modal/common-modal.component';
import { CommonModal } from 'src/app/shared/enums/common-model.enum';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketingDataService } from 'src/app/service/marketing-data.service';
import { ChooseModalComponent } from 'src/app/shared/choose-modal/choose-modal.component';
import { AppState } from './../../../app.state';
import { User } from './../../../models/user.model';
import { Store } from '@ngrx/store';

declare var $: any;
@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  @ViewChild('r', { static: false })  r:ElementRef;
  dtElement: DataTableDirective;
  isSMS: boolean = true;
  isCreateNewSMS: boolean = false;
  isEditSMS: boolean = false;
  isSMSDetail: boolean = false;
  isSMSSchedule: boolean = false;
  isSMSUser: boolean = false;
  isSMSChooseProspect: boolean = false;
  smsData: any = {};
  sendTo: any = [];
  sendFrom: any = [];
  allMessages: any = [];
  allMessagesList:any =[];
  searchModel:any = {};
  title = '';
  dtOptions: any = {};
  sendMessage: string = "";
  previewSms: any = "";
  smsTitle:any="";
  errorMsg:any="";
  save:boolean=false
  user:Observable<User>;
  load:number=0
  
  constructor(private authService: AuthService, private modalService: NgbModal, private toastr: ToastrService, private router: Router, private marketingDataService: MarketingDataService,private store: Store<AppState>) {
    
    this.user=store.select('user')
    this.sendFrom = [
      { id: 'MobileNumber', text: 'Your Mobile Number' },
      { id: 'BusinessName', text: 'Your Business Name' }
    ]
    this.sendTo = [
      { id: +919888503475, text: '+919888503475' },
      { id: +918427757285, text: '+918427757285' },
      { id: +917347693153, text: '+917347693153' }
    ]
  }

  ngOnInit() {
    this.user.subscribe(x=>{
      this.load=x.user
    })
    if(this.load==0){

      $('#cover-spin').hide(0);
      return	
    }
    this.getAllmessages();
   // choose Prospective Table
    this.dtOptions = {
      dom: 'lBfrtip',
      responsive: true,
      // serverSide: true,
      //processing: true,
      buttons: ['copy', 'csv', 'excel', 'pdf'],
      drawCallback: function () {
        var hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
        $('.dt-buttons')[0].style.display = hasRows ? '' : 'none'
      },
      pagingType: "full_numbers",
      lengthMenu: [
        [10, 20, 25, 50, 100, 150, 200, 250, 300, -1],
        [10, 20, 25, 50, 100, 150, 200, 250, 300, "All"] 
      ]
      // ajax: (dataTablesParameters: any, callback) => {
      // },
      //  columns: [],
      //   rowCallback: (row: Node, data: any[] | Object, index: number) => {
      //      return row;
      //   }
     
    };
   
  }
  searchMsgs(){
    if(this.searchModel.searchText){
      this.allMessages = this.allMessagesList.filter(x=>x.title == this.searchModel.searchText);
    }
    else{
      this.allMessages = this.allMessagesList;
    }
  }
  handleSection(Ident: any, smsText?: any,title?:any) {
    if(this.save && this.title==''){
      this.toastr.error('Please fill save title first','Error!')
      return
    }
    if (Ident == "SendSMS") {
      
      this.smsData.message = smsText;
      this.smsTitle=title;
      this.isSMS = false;
      this.isCreateNewSMS = true;
      this.isEditSMS = false;
      this.isSMSDetail = false;
      this.isSMSSchedule = false;
      this.isSMSUser = false;
      this.isSMSChooseProspect = false;
    }
    else if (Ident == "chooseProspect") {
      
      this.marketingDataService.message = this.smsData.message;
          this.marketingDataService.title=this.title;
          this.marketingDataService.save=this.save;
         const modalRef=this.modalService.open(ChooseModalComponent,{size:'xl'})
         modalRef.componentInstance.type='phone'
         modalRef.result.then((data) => {
           if(data==1){
             this.backBtnClick();
           }
         })
          // this.router.navigate(['/customer/' + Ident], { queryParams: { prospect: 'phone' } });
      //   if(!this.smsTitle){
      //   this.errorMsg="Please enter title";
      //   }
      //  else{
          
      //   }
    

    }
    else if (Ident == "SMSUser") {
      this.isSMS = false;
      this.isCreateNewSMS = false;
      this.isEditSMS = false;
      this.isSMSDetail = false;
      this.isSMSSchedule = false;
      this.isSMSUser = true;
      this.isSMSChooseProspect = false;
    }
    else if (Ident == "EditSMS") {
      this.isSMS = false;
      this.isCreateNewSMS = false;
      this.isEditSMS = true;
      this.isSMSDetail = false;
      this.isSMSSchedule = false;
      this.isSMSUser = false;
      this.isSMSChooseProspect = false;
    }
    else if (Ident == "faq" || Ident == "payment" || Ident == "paymentSucess") {
      this.isSMS = true;
      this.isCreateNewSMS = false;
      this.isEditSMS = false;
      this.isSMSDetail = false;
      this.isSMSSchedule = false;
      this.isSMSUser = false;
      this.isSMSChooseProspect = false;
    }
    else {
      this.isSMS = false;
      this.isCreateNewSMS = false;
      this.isEditSMS = false;
      this.isSMSDetail = false;
      this.isSMSSchedule = true;
      this.isSMSUser = false;
      this.isSMSChooseProspect = false;
    }
  }

  backBtnClick() {
    ;
    let confirmResult = true;
    if(this.isSMSSchedule){
      confirmResult =  confirm('Are you sure, you want to go back, your payment is already done?');
    }
    
    this.save=false
    this.title=''
    this.getAllmessages();
    this.isSMS = true;
    this.isCreateNewSMS = false;
    this.isEditSMS = false;
    this.isSMSDetail = false;
    ;
    if(confirmResult != true){
      this.isSMS = false;
      this.isSMSSchedule = true;
    }
     
    else{
      this.isSMSSchedule = false;
    }
   
    this.isSMSUser = false;
  }

  // open(Ident: any) {

  //   const modalRef = this.modalService.open(CommonModalComponent, { size: 'lg' });
  //   modalRef.componentInstance.currentModel = CommonModal.Faq;
  //   modalRef.componentInstance.type = Ident;
  //   modalRef.result.then((result) => {
  //     this.handleSection(result);
  //   }, (reason) => {

  //   });
  // }

  sendSMSClick(item) {
    item.title = 'Greetings';
    item.numbers = item.numbers.toString();
    this.authService.sendSMS(item).subscribe(data => {
      this.toastr.success(data.message, 'Success!');
      this.getAllmessages();
    })
  }
  getAllmessages() {
    $('#cover-spin').show(0);
    this.authService.getSMSListData().subscribe(data => {
      this.allMessagesList = data.data;
      this.allMessages =data.data ;
    
     $('#cover-spin').hide(0);
    })
  }
  /* method Name:showPreview
  Purpose: To show sms 
   autor :Mayank Negi */
  showPreview(modelId, msg) {
    if (modelId) {
      this.previewSms = msg;
      $(modelId).modal();
    }
  }

  confSave(arg:boolean){
    this.title=arg?this.title:''
  }


  addText(e):void{


    var startPos=this.r.nativeElement.selectionStart;
    //this.r.nativeElement.focus();
    this.r.nativeElement.value=this.r.nativeElement.value.substr(0,this.r.nativeElement.selectionStart)+e+this.r.nativeElement.value.substr(this.r.nativeElement.selectionStart,this.r.nativeElement.value.length);
    this.smsData.message=this.r.nativeElement.value
    //this.r.nativeElement.selectionStart=startPos;
    //this.r.nativeElement.focus();
  }
}

