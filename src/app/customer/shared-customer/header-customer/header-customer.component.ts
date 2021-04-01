import { Component, OnInit, Input, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { SidebarCustomerComponent } from '../sidebar-customer/sidebar-customer.component';
import { NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Routes, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { switchMap, takeWhile } from 'rxjs/operators';
import { interval, Observable, Subscription, timer } from 'rxjs';
import { AppState } from './../../../app.state';
import { EmailModalComponent } from 'src/app/shared/email-modal/email-modal.component';
import { SmsModalComponent } from 'src/app/shared/sms-modal/sms-modal.component';
import * as UserActions from './../../../actions/user.actions';
import { User } from './../../../models/user.model';
import { Store } from '@ngrx/store';
import * as XLSX from 'xlsx'; 
import { ReferComponent } from 'src/app/shared/refer/refer.component';
import { arraysAreNotAllowedMsg } from '@ngrx/store/src/models';
import { ReminderCalendarComponent } from 'src/app/shared/reminder-calendar/reminder-calendar.component';
import { ReminderAlertComponent } from 'src/app/shared/reminder-alert/reminder-alert.component';

class profileData{
  id?: number
  f_name: string
  l_name?: string
  company?: string
  phone?: string
  country?: string
  state?: string
  city?: string
  STATE_NAME:string
  CITY:string
  STATE_CODE:string
  address?: string
  postal?: string
  info?:string
  created_at?: string
  updated_at?: string
}

class Profile{
id: number
username: string
email: string
email_verified_at?: string
type: string
status: string
reg_status: string
created_at: string
updated_at:string
} 

class Maintainance {
  maintenance_banner_content?: string
  maintenance_banner_title?: string
  status?:string
}

interface iProgress{
  success_percentage:string
  total:number
  batch_status?:string
  batch_id:string
  type: string,
  purchase_group_name?:string
}

class BatchProcess{
  email_progress:[iProgress]
  phone_progress:[iProgress]
  full_progress_detail:[iProgress]
}

declare var $: any;
@Component({
  selector: 'app-header-customer',
  templateUrl: './header-customer.component.html',
  styleUrls: ['./header-customer.component.scss']
})

export class HeaderCustomerComponent implements OnInit, OnDestroy {
  @ViewChild('syncElement', { static: false }) syncElement;
  
  @Input() sideBar: SidebarCustomerComponent;
  
  viewDataRecords: any;
  viewDataRecordsEntries: number;
  rows_selected:any = [];

  // syncSubscription: Subscription;
  runningQueue: number = 0;
  viewType: string = 'Email';

  dtOptions: DataTables.Settings = {};
  url:string="";
  profileData=new Profile();
  maintainance=new Maintainance();
  profileFullData=new profileData();
  batchProgress=new BatchProcess();
  membership:any;
  
  syncDrop: boolean=false;
  syncStart: boolean=false;
  syncInterval: any;
  haveReminders:boolean=false
  marketModel:NgbModalRef
  isFullScreen:boolean=false
  nonMember:boolean;
  loadedSync:boolean=false
  user:Observable<User>;
  load:number=0
  @ViewChild('content', {static:false}) private content;
  constructor(private authService:AuthService,private router:Router,private modalService: NgbModal,private store: Store<AppState>) {
    this.user=store.select('user')
   }

  ngOnInit() {
    this.user.subscribe(x=>{
      this.load=x.user
    })
    this.onDocumentClick = this.onDocumentClick.bind(this);
    document.addEventListener('click', this.onDocumentClick);

    if (localStorage.getItem('paidMember')) {
      this.nonMember = false;
    } else{
      this.nonMember = true;
    }
     
  // sidebar navigation
  $('.navigation > ul > li > a').click(function(){
    $(this).next('.sub_menu').slideToggle(100);
    $(this).parents("li.has_dropdown").toggleClass('active_nav');
  });	

  this.authService.getProfile().subscribe((data)=>{
    this.membership=data.data.member;
    //console.log(data)
    if(data.data.image!=null){
      this.url= data.data.image.filename 
    }
    else{
      this.url='assets/images/user.png'
    }

    this.profileData=data.data;
    this.profileFullData=data.data.detail

    },(error)=>{
      console.log(error)
    });
    // toggle header click
    $('.header_area .l_head .toggle').click(function(){
      //$('body').toggleClass('hide_dividers')  
    });


  this.authService.getMaintainanceBanner().subscribe(data=>{
    console.log(data)
    this.maintainance=data
  })
    
    // add class on 1024 on main div
    if ( $(window).width() <= 1023 || !this.authService.leftMenuOpen) { 
        $('body').addClass('hide_dividers')
        } else {  
        $('body').removeClass('hide_dividers')
    } 
    // search js
    $('.header_area .r_head .search').click(function(){
      $('.search_popup').slideToggle(100);
      $('.search .show_search, .search .remove_search').toggle();
    });


    // notification
    $('.notification').click(function(){
      $(this).find('.notify').fadeToggle(100);
    });

    // user dropdown
    $('.user').click(function(){
        $(this).find('.user_detail').fadeToggle(100);
    });
    // // batch process
    // $('.sync').click(function(){
    //     $(this).find('.syncdropdown').fadeToggle(100);
    // });

    $(document).on("click", function(event){
      var $trigger = $(".user");
      if($trigger !== event.target && !$trigger.has(event.target).length){
          $(".user_detail").slideUp("fast");
      }            
    });

    // $(document).on("click", function(event){
    //   var $trigger = $(".sync");
    //   if($trigger !== event.target && !$trigger.has(event.target).length){
    //       $(".syncdropdown").slideUp("fast");
    //   }            
    // });

    this.authService.getPendingReminders().subscribe(data=>{
      this.haveReminders=data.data.length > 0
    })
  setInterval(()=>{
    this.authService.getPendingReminders().subscribe(data=>{
      this.haveReminders=data.data.length > 0
    })
  },30000)


  }
  
  // startMarketing():void {
  //   this.marketModel.close()
  //   if(this.viewType === 'Email'){
  //     this.router.navigate(['/customer/email'])
  //   }
  //   else{
  //     this.router.navigate(['/customer/sms'])
  //   }
  // }
  startMarketing():void {
    this.marketModel.close()
    if(this.viewType === 'Email'){
      // this.router.navigate(['/customer/email'])
      const modalRef = this.modalService.open(EmailModalComponent);
      modalRef.componentInstance.rows= (this.rows_selected).toString();
    }
    else{
      // this.router.navigate(['/customer/sms'])
      const modalRef = this.modalService.open(SmsModalComponent);
      modalRef.componentInstance.rows= (this.rows_selected).toString();
    }
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick);
    clearInterval(this.syncInterval);
    // this.syncSubscription.unsubscribe();
  }

  sync() {
    this.syncDrop = !this.syncDrop;

    if(!this.syncStart) {
      this.syncData();
      this.syncStart = true;
      this.syncInterval = setInterval(() => {
        this.syncData();
      }, 4000);
    }

    // this.syncStart = true;
    // this.syncSubscription = timer(0, 4000).pipe(
    //   switchMap(() => this.authService.getBatchProcess())
    // ).subscribe(result => console.log('result ', result) );

    // this.authService.getBatchProcess().subscribe(data => {
    //   this.loadedSync = true
    //   this.batchProgress=data.data
    //   console.log(this.batchProgress)
    // })

    // setInterval(() => {
    //   this.authService.getBatchProcess().subscribe(data => {
    //     this.batchProgress=data.data
    //     console.log(this.batchProgress)
    //   })
    //  }, 2000);
  }

  syncData() {
    this.authService.getBatchProcess().subscribe(data => {
      this.loadedSync = true
      this.batchProgress = data.data;
      this.runningQueue = this.batchProgress.full_progress_detail.filter(item=>parseInt(item.success_percentage)<100).length;
    })
  }

  protected onDocumentClick(event: MouseEvent) {
    if (this.syncElement.nativeElement.contains(event.target)) {
      return;
    }
    this.syncDrop = false;
  }

  handleClick(path){    
    // if(this.nonMember){    
    //  $('#confirmModal').modal('show');
    // } else {
      this.router.navigate(['/customer/'+ path]);
    // }    
  }
  toggleFullScreen() {

    if(!this.isFullScreen){
      const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
        mozRequestFullScreen(): Promise<void>;
        webkitRequestFullscreen(): Promise<void>;
        msRequestFullscreen(): Promise<void>;
      };

      
      if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
        docElmWithBrowsersFullScreenFunctions.requestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Safari */
        docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE11 */
        docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
      }
      this.isFullScreen=true

    } else{
      const docWithBrowsersExitFunctions = document as Document & {
        mozCancelFullScreen(): Promise<void>;
        webkitExitFullscreen(): Promise<void>;
        msExitFullscreen(): Promise<void>;
      };
      if (docWithBrowsersExitFunctions.exitFullscreen) {
        docWithBrowsersExitFunctions.exitFullscreen();
      } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
        docWithBrowsersExitFunctions.mozCancelFullScreen();
      } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        docWithBrowsersExitFunctions.webkitExitFullscreen();
      } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
        docWithBrowsersExitFunctions.msExitFullscreen();
      }
      this.isFullScreen=false
    }
  }

  exportexcel(): void {
       /* table id is passed over here */   
       let element = document.getElementById('bpview_tables'); 
       const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, 'ExcelSheet.xlsx');
			
    }

  viewRecord(arg, arg2):void {
    const that=this
    this.viewType = arg2 === 'email' ? 'Email' : 'Phone';

    this.marketModel = this.modalService.open(this.content, { size: 'lg' });

    this.marketModel.result.then((result) => {
        setTimeout(() => { 
          this.syncDrop = true; 
          console.log('result ', result); 
        }, 0);
    }, (reason) => {;
        setTimeout(() => { 
          this.syncDrop = true; 
          console.log('reason', reason); 
        }, 0);
    });

    // console.log(arg2)
    // this.modalService.open(this.content, { size: 'lg' }).result.then((result) => {
      
    //   setTimeout(() => { 
    //     this.syncDrop = true; 
    //     console.log('result ', result); 
    //   }, 0);
      
    // }, (reason) => {
      
    //   setTimeout(() => { 
    //     this.syncDrop = true; 
    //     console.log('reason ', reason); 
    //   }, 0);
    // })

    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      lengthMenu: [
        [10, 25, 50, -1], [10, 25, 50, "All"]
      ],
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {        
        this.authService.showBatchProperties(arg, arg2).subscribe((data)=>{ 

          
          this.viewDataRecords = data.data.data.filter(item=>item[arg2]!=0 && item[arg2]!='');
          console.log(this.viewDataRecords)
          this.viewDataRecords.forEach(element => {
            that.rows_selected.push(element.property_id)
          });
          // console.log(this.viewDataRecords[0].property_id,'property_id');
          // console.log(this.rows_selected,'property_id');
          
          this.viewDataRecordsEntries = data.data.total;
          callback({
            recordsTotal: this.viewDataRecords.length,
            recordsFiltered: this.viewDataRecords.length,
            //data: this.viewDataRecords
            data: this.viewDataRecords
          });
        })
      },
      columns: [
        { data: 'Owner1FirstName', title:'First Name', defaultContent: 'NA', name: 'Owner1FirstName', render: function (data, type, row) {
        return row.Owner1FirstName; }
      },
      { data:'OwnerLastname1',title:'Last Name', defaultContent: 'NA', name: 'OwnerLastname1', render: function (data, type, row) {
        return row.OwnerLastname1.length> 10? `${row.OwnerLastname1.substr(0, 10)}...`: row.OwnerLastname1; 
      } 
      }, 
      { data: arg2, title: arg2.charAt(0).toUpperCase()+arg2.slice(1), defaultContent: 'NA', name: arg2, render: function (data, type, row) {
        // console.log();
        return `${ arg2 === 'email' ? row.email : that.numberFormat(row.phone)}`; } 
      }
      ]
    };
  }
  


  numberFormat(tel){
    var value = tel.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
        return tel;
    }

    var country, city, number;

    switch (value.length) {
        case 1:
        case 2:
        case 3:
            city = value;
            break;

        default:
            city = value.slice(0, 3);
            number = value.slice(3);
    }

    if(number){
        if(number.length>3){
            number = number.slice(0, 3) + '-' + number.slice(3,7);
        }
        else{
            number = number;
        }

        return "+1"+("(" + city + ") " + number).trim();
    }
    else{
        return "+1"+"(" + city;
    }

  }
  // get runningQueue() {
  //   const email_progress= this.batchProgress && this.batchProgress.email_progress && this.batchProgress.email_progress.filter(item=>parseInt(item.success_percentage)<100);
  //   const phone_progress= this.batchProgress && this.batchProgress.phone_progress && this.batchProgress.phone_progress.filter(item=>parseInt(item.success_percentage)<100);
  //   return email_progress.length+phone_progress.length;
  // }

  sidebar(){
    this.sideBar.toggle();
    if(this.authService.leftMenuOpen) {
      $('body').addClass('hide_dividers')   
    } else{
      $('body').removeClass('hide_dividers')
    }
    this.authService.leftMenuOpen = !this.authService.leftMenuOpen;
  }


  logout(){
    this.authService.logout();
   
    this.router.navigate(['/authentication/login']);
    // location.reload();
  }
  
  refer():void{
    const modalRef=this.modalService.open(ReferComponent,{size:'lg'})
  }
  
  reminCalen(){
    this.authService.getReminders().subscribe(data=>{
      const modalRef = this.modalService.open(ReminderCalendarComponent,{size:'xl'}) 
      modalRef.componentInstance.data=data.data
    })
  }

  
  reminderAlert(){
    this.authService.getPendingReminders().subscribe(data=>{
      const modalRef = this.modalService.open(ReminderAlertComponent,{size:'md'}) 
      modalRef.componentInstance.data=data.data
      console.log(data.data) 
    })
  }

}


