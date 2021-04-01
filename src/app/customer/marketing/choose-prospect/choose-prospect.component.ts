import { Component, OnInit, ViewChild, Input,ViewEncapsulation } from '@angular/core';
import { from, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModalComponent } from '../common-modal/common-modal.component';
import { CommonModal } from 'src/app/shared/enums/common-model.enum';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketingDataService } from 'src/app/service/marketing-data.service';
import { clear } from 'console';

@Component({
  selector: 'app-choose-prospect',
  templateUrl: './choose-prospect.component.html',
  styleUrls: ['./choose-prospect.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ChooseProspectComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  isSMS: boolean = true;
  isCreateNewSMS: boolean = false;
  isEditSMS: boolean = false;
  isSMSDetail: boolean = false;
  isSMSSchedule: boolean = false;
  isSMSUser: boolean = false;
  isSMSChooseProspect: boolean = false;
  smsData: any = {};
  postCardData:any={};
  sendTo: any = [];
  sendFrom: any = [];
  allMessages: any = [];
  title = 'angulardatatables';
  dtOptions: any = {};
  smsList: any = [];
  emailData: any = [];
  prospectList: any = [];
  prospect: any = "";
  rows_selected: any = [];
  warmProspectList: any = [];
  hotProspectList: any = [];
  prospectChangeValue: any = "";
  checkedPropertyId:any=[];
  checkText:any="Check All";
  
  constructor(private authService: AuthService, private modalService: NgbModal, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private marketingDataService: MarketingDataService,private router: Router,) {

  }

  ngOnInit() {
    // this.getAllSmsDetails();
    $('#cover-spin').show(0);
    this.activatedRoute.queryParamMap
      .subscribe((params) => {
        this.prospect = Object.values(params)[0].prospect;
        if(this.prospect=='phone') {
          this.getAllSmsDetails();
        } else if(this.prospect=='email') {
          this.getAllEmailDetails();
        } else {
          this.getAllPostCardDetails();
        }
       
      });

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  getAllSmsDetails() {

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    this.dtOptions = {
      dom: 'lBfrtip',
      responsive: true,
     colReorder:true,
      drawCallback: function () {
        var hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
        $('.dt-buttons')[0].style.display = hasRows ? '' : 'none'
      },
      pagingType: "full_numbers",
      buttons: [],
      searching: false,
      lengthMenu: [
        [10, 20, 25, 50, 100, 150, 200, 250, 300, -1],
        [10, 20, 25, 50, 100, 150, 200, 250, 300, "All"]
      ],
      // buttons: [ 'copy', 'excel', 'csv', 'pdf', {
      //   extend: 'print',
      //   tag:'span',
      //   className:'printBtn',
      //   text: '<img src="https://icons.iconarchive.com/icons/double-j-design/ravenna-3d/48/Printer-Ink-icon.png" style="all: initial;height: 40px;cursor: pointer;margin: 0 1px;border: 1px solid #ccc !important;background: #f2f2f2 !important;">' }],
        
      ajax: (dataTablesParameters: any, callback) => {
        this.authService.getAllSMSDetails().subscribe((data) => {
          if (this.prospectChangeValue && this.prospectChangeValue == "1") {
            this.warmProspectList = data.data.filter(s => s.status === "1");
            this.prospectList = this.warmProspectList;
          }
          else if (this.prospectChangeValue && this.prospectChangeValue == "2") {
            this.hotProspectList = data.data.filter(s => s.status === "2");
            this.prospectList = this.hotProspectList;
          }
          else {
            this.prospectList = data.data;
          }
          $('#cover-spin').hide(0);
          console.log(this.prospectList);
          callback({
           // recordsTotal:(data.count),
            data:data.data
          });
        }, error => {
          $('#cover-spin').hide(0);
          console.log(error)
        })
      },

      columns: [

        {
          data: 'PropertyId', title: 'Select', width: '49',
          render: function (data, type, row) {
            return '<input type="checkbox" id="' + row.property_id + '">';
          }

        },
        { data: 'Owner1FirstName', title: 'First Name', defaultContent: '-' },
 
        { data: 'OwnerLastname1', title: 'Last Name', defaultContent: '-' },
        {
          render: function (data, type, row) {
            let houseNumber = row.SitusHouseNumber == null ? '' : row.SitusHouseNumber;
            let streetName = row.SitusStreetName == null ? '' : row.SitusStreetName;
            let siteMode = row.SitusMode == null ? '' : row.SitusMode;
            let addresStr = houseNumber + ' ' + streetName + ' ' + siteMode;
            return data = addresStr;
          }, title: 'Address', defaultContent: '-'
        },
        { data: 'SitusCity', title: 'City', defaultContent: '-' },
        { data: 'SitusState', title: 'State', defaultContent: '-' },
        //punch4
        { data: 'SitusZipCode', title: 'Zip Code', defaultContent: '-' ,render: function(data, type, row){
          return data.length == 4 ? '0'+ data : data;
        }},
        // end-punch4
        {
          data: 'LMSSalePrice', title: 'Market Value', defaultContent: '-', render: function (data, type, row) {
            return formatter.format(data)
          }
        },
        { data: 'phone', title: 'Phone', defaultContent: '-' },
        {
          data: 'opportunity_status',
          title: 'Status',
          
          render: function (data, type, row) {
            
           let oppStatus="";
            let statusTitle="";
            if(row.opportunity_status==1){
              oppStatus='src="assets/images/pros.png"';
             statusTitle='Prospecting';
            }
            if(row.opportunity_status==2){
              oppStatus='src="assets/images/qulification.png"';
             statusTitle='Qualification';
            }
            if(row.opportunity_status==3){
              oppStatus='src="assets/images/analysis.png"';
             statusTitle='Needs Analysis';
            }
            if(row.opportunity_status==4){
              oppStatus='src="assets/images/value-proposition.png"';
             statusTitle='Value Proposition';
            }
            if(row.opportunity_status==5){
              oppStatus='src="assets/images/dec-make.png"';
             statusTitle='Decision Makers';
            }
            if(row.opportunity_status==6){
              oppStatus='src="assets/images/per-analysis.png"';
             statusTitle='Perception Analysis';
            }
            if(row.opportunity_status==7){
              oppStatus='src="assets/images/proposal.png"';
             statusTitle='Proposal/Price Quote';
            }
            if(row.opportunity_status==8){
              oppStatus='src="assets/images/negotion.png"';
             statusTitle='Negotiation/Review';
            }
            if(row.opportunity_status==9){
              oppStatus='src="assets/images/closed-won.png"';
             statusTitle='Closed Won';
            }
            if(row.opportunity_status==10){
              oppStatus='src="assets/images/lost.png"';
             statusTitle='Closed Lost';
            }
            if(row.opportunity_status==0){
              oppStatus='src="assets/images/nostatus.png"';
             statusTitle='No status';
            }
             return '<ul class="btnsLst"><li><button  class="btn btn-actions"><img ' + oppStatus + ' alt=""></button></li></ul>'
          }
        },

      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        var rowId = data[0];
        if ($.inArray(rowId, this.rows_selected) !== -1) {
          $(row).find('input[type="checkbox"]').prop('checked', true);
          $(row).addClass('selected');
        }
        $('input[type="checkbox"]', row).unbind('click');
        $('input[type="checkbox"]', row).bind('click', () => {
          self.getSelectedRow(data);
        });
        $('td.details-control', row).unbind('click');
        $('td.details-control', row).bind('click', () => {
          self.getChildRow(data);
        });
      }
    };
  }
  getAllEmailDetails() {

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    this.dtOptions = {
      dom: 'lBfrtip',
      responsive: true,
      colReorder: true,
      // buttons: [ 'copy', 'excel', 'csv', 'pdf', {
      //   extend: 'print',
      //   tag:'span',
      //   className:'printBtn',
      //   text: '<img src="https://icons.iconarchive.com/icons/double-j-design/ravenna-3d/48/Printer-Ink-icon.png" style="all: initial;height: 40px;cursor: pointer;margin: 0 1px;border: 1px solid #ccc !important;background: #f2f2f2 !important;">' }],
      drawCallback: function () {
        var hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
        $('.dt-buttons')[0].style.display = hasRows ? '' : 'none'
      },
      pagingType: "full_numbers",
      buttons: [],
      searching: false,
      lengthMenu: [
        [10, 20, 25, 50, 100, 150, 200, 250, 300, -1],
        [10, 20, 25, 50, 100, 150, 200, 250, 300, "All"]
      ],
      ajax: (dataTablesParameters: any, callback) => {
        this.authService.getAllEmailsetails().subscribe((data) => {
          if (this.prospectChangeValue && this.prospectChangeValue == "1") {
            this.warmProspectList = data.data.filter(s => s.status === "1");
            this.prospectList = this.warmProspectList;
          }
          else if (this.prospectChangeValue && this.prospectChangeValue == "2") {
            this.hotProspectList = data.data.filter(s => s.status === "2");
            this.prospectList = this.hotProspectList;
          }
          else {
            this.prospectList = data.data;
          }
          callback({
            recordsTotal: data.data,
            recordsFiltered: data.data.recordsFiltered,
            data: this.prospectList
          });
          $('#cover-spin').hide(0);
        }, error => {
          $('#cover-spin').hide(0);
          console.log(error)
        })
      },

      columns: [

        {
          data: 'PropertyId', title: 'Select', width: '49',
          render: function (data, type, row) {

            return '<input type="checkbox" id="' + row.property_id + '">';
          }

        },
       { data: 'Owner1FirstName', title: 'First Name', defaultContent: '-' },
    //    { data: 'Owner1FirstName', title: 'First Name', defaultContent: '-' , render: function (data, type, row) {
         
    //     let strDate=row.logs ? row.logs.contact_date.split('-').join('/'):'NA';
    //     let fName=data ? row.Owner1FirstName:'NA'
    //     return  fName +'<small style="font-size: 13px; width: 100%; display: block; margin-top: 6px;color: red;">Last Contact:' +' ' +strDate + '</small>'
    //   }
    // },
        { data: 'OwnerLastname1', title: 'Last Name', defaultContent: '-' },
        {
          render: function (data, type, row) {
            let houseNumber = row.SitusHouseNumber == null ? '' : row.SitusHouseNumber;
            let streetName = row.SitusStreetName == null ? '' : row.SitusStreetName;
            let siteMode = row.SitusMode == null ? '' : row.SitusMode;
            let addresStr = houseNumber + ' ' + streetName + ' ' + siteMode;
            return data = addresStr;
          }, title: 'Address', defaultContent: '-'
        },
        { data: 'SitusCity', title: 'City', defaultContent: '-' },
        { data: 'SitusState', title: 'State', defaultContent: '-' },
        { data: 'SitusZipCode', title: 'Zip Code', defaultContent: '-' },
        {
          data: 'LMSSalePrice', title: 'Market Value', defaultContent: '-', render: function (data, type, row) {
            return formatter.format(data)
          }
        },
        { data: 'email', title: 'Email', defaultContent: '-' },
        {
          data: 'opportunity_status',
          title: 'Status',
          render: function (data, type, row) {
            
           let oppStatus="";
            let statusTitle="";
            if(row.opportunity_status==1){
              oppStatus='src="assets/images/pros.png"';
             statusTitle='Prospecting';
            }
            if(row.opportunity_status==2){
              oppStatus='src="assets/images/qulification.png"';
             statusTitle='Qualification';
            }
            if(row.opportunity_status==3){
              oppStatus='src="assets/images/analysis.png"';
             statusTitle='Needs Analysis';
            }
            if(row.opportunity_status==4){
              oppStatus='src="assets/images/value-proposition.png"';
             statusTitle='Value Proposition';
            }
            if(row.opportunity_status==5){
              oppStatus='src="assets/images/dec-make.png"';
             statusTitle='Decision Makers';
            }
            if(row.opportunity_status==6){
              oppStatus='src="assets/images/per-analysis.png"';
             statusTitle='Perception Analysis';
            }
            if(row.opportunity_status==7){
              oppStatus='src="assets/images/proposal.png"';
             statusTitle='Proposal/Price Quote';
            }
            if(row.opportunity_status==8){
              oppStatus='src="assets/images/negotion.png"';
             statusTitle='Negotiation/Review';
            }
            if(row.opportunity_status==9){
              oppStatus='src="assets/images/closed-won.png"';
             statusTitle='Closed Won';
            }
            if(row.opportunity_status==10){
             oppStatus='src="assets/images/lost.png"';
             statusTitle='Closed Lost';
            }
            if(row.opportunity_status==0){
              oppStatus='src="assets/images/nostatus.png"';
             statusTitle='No status';
            }
             return '<ul><li><button  class="btn btn-actions"><img ' + oppStatus + ' alt=""></button> </li></ul>'
          }
        },
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        var rowId = data[0];
        if ($.inArray(rowId, this.rows_selected) !== -1) {
          $(row).find('input[type="checkbox"]').prop('checked', true);
          $(row).addClass('selected');
        }
        $('input[type="checkbox"]', row).unbind('click');
        $('input[type="checkbox"]', row).bind('click', () => {
          self.getSelectedRow(data);
        });
        $('td.details-control', row).unbind('click');
        $('td.details-control', row).bind('click', () => {
          self.getChildRow(data);
        });
      }
    };
  }
  getAllPostCardDetails() {
 
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    $('.filter_and_title .filter i').click(function () {
      $('.filter_box ').slideToggle(100);
    });
    this.dtOptions = {
      dom: 'lBfrtip',
      responsive: true,
      // buttons: [ 'copy', 'excel', 'csv', 'pdf', {
      //   extend: 'print',
      //   tag:'span', 
      //   className:'printBtn',
      //   text: '<img src="https://icons.iconarchive.com/icons/double-j-design/ravenna-3d/48/Printer-Ink-icon.png" style="all: initial;height: 40px;cursor: pointer;margin: 0 1px;border: 1px solid #ccc !important;background: #f2f2f2 !important;">' }],
      drawCallback: function () {
        var hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
        $('.dt-buttons')[0].style.display = hasRows ? '' : 'none'
      },
      pagingType: "full_numbers",
      buttons: [],
      searching: false,
      lengthMenu: [
        [10, 20, 25, 50, 100, 150, 200, 250, 300, -1],
        [10, 20, 25, 50, 100, 150, 200, 250, 300, "All"]
      ],
      ajax: (dataTablesParameters: any, callback) => {
        this.authService.getAllProspectPostcard().subscribe((data) => {
          this.prospectList =data.data
          callback({
            recordsTotal: data.data,
            recordsFiltered: data.data.recordsFiltered,
            data: this.prospectList
          });
          $('#cover-spin').hide(0);
        }, error => {
          console.log(error)
          $('#cover-spin').hide(0);
        })
      },
      columns: [

        {
          data: 'PropertyId', title: 'Select', width: '49',
          render: function (data, type, row) {

            return '<input type="checkbox" id="' + row.property_id + '">';
          }

        },
        { data: 'Owner1FirstName', title: 'First Name', defaultContent: '-' },
    //    { data: 'Owner1FirstName', title: 'First Name', defaultContent: '-' , render: function (data, type, row) {
         
    //     let strDate=row.logs ? row.logs.contact_date.split('-').join('/'):'NA';
    //     let fName=data ? row.Owner1FirstName:'NA'
    //     return  fName +'<small style="font-size: 13px; width: 100%; display: block; margin-top: 6px;color: red;">Last Contact:' +' ' +strDate + '</small>'
    //   }
    // },
        { data: 'OwnerLastname1', title: 'Last Name', defaultContent: '-' },
        {
          render: function (data, type, row) {
            let houseNumber = row.SitusHouseNumber == null ? '' : row.SitusHouseNumber;
            let streetName = row.SitusStreetName == null ? '' : row.SitusStreetName;
            let siteMode = row.SitusMode == null ? '' : row.SitusMode;
            let addresStr = houseNumber + ' ' + streetName + ' ' + siteMode;
            return data = addresStr;
          }, title: 'Address', defaultContent: '-'
        },
        { data: 'SitusCity', title: 'City', defaultContent: '-' },
        { data: 'SitusState', title: 'State', defaultContent: '-' },
        { data: 'SitusZipCode', title: 'Zip Code', defaultContent: '-' },
        {
          data: 'LMSSalePrice', title: 'Market Value', defaultContent: '-', render: function (data, type, row) {
            return formatter.format(data)
          }
        },
        {
          data: 'opportunity_status',
          title: 'Status',
          render: function (data, type, row) {
            
           let oppStatus="";
            let statusTitle="";
            if(row.opportunity_status==1){
              oppStatus='src="assets/images/pros.png"';
             statusTitle='Prospecting';
            }
            if(row.opportunity_status==2){
              oppStatus='src="assets/images/qulification.png"';
             statusTitle='Qualification';
            }
            if(row.opportunity_status==3){
              oppStatus='src="assets/images/analysis.png"';
             statusTitle='Needs Analysis';
            }
            if(row.opportunity_status==4){
              oppStatus='src="assets/images/value-proposition.png"';
             statusTitle='Value Proposition';
            }
            if(row.opportunity_status==5){
              oppStatus='src="assets/images/dec-make.png"';
             statusTitle='Decision Makers';
            }
            if(row.opportunity_status==6){
              oppStatus='src="assets/images/per-analysis.png"';
             statusTitle='Perception Analysis';
            }
            if(row.opportunity_status==7){
              oppStatus='src="assets/images/proposal.png"';
             statusTitle='Proposal/Price Quote';
            }
            if(row.opportunity_status==8){
              oppStatus='src="assets/images/negotion.png"';
             statusTitle='Negotiation/Review';
            }
            if(row.opportunity_status==9){
              oppStatus='src="assets/images/closed-won.png"';
             statusTitle='Closed Won';
            }
            if(row.opportunity_status==10){
             oppStatus='src="assets/images/lost.png"';
             statusTitle='Closed Lost';
            }
            if(row.opportunity_status==0){
              oppStatus='src="assets/images/nostatus.png"';
             statusTitle='No status';
            }
             return '<ul><li><button  class="btn btn-actions"><img ' + oppStatus + ' alt=""></button> </li></ul>'
          }
        },
      ],
         rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        var rowId = data[0];
        if ($.inArray(rowId, this.rows_selected) !== -1) {
          $(row).find('input[type="checkbox"]').prop('checked', true);
          $(row).addClass('selected');
        }
        $('input[type="checkbox"]', row).unbind('click');
        $('input[type="checkbox"]', row).bind('click', () => {
          self.getSelectedRow(data);
        });
        $('td.details-control', row).unbind('click');
        $('td.details-control', row).bind('click', () => {
          self.getChildRow(data);
        });
      }
    };
  }
  handleSection(Ident: any) {
    if (Ident == "SendSMS") {
      this.isSMS = false;
      this.isCreateNewSMS = true;
      this.isEditSMS = false;
      this.isSMSDetail = false;
      this.isSMSSchedule = false;
      this.isSMSUser = false;
      this.isSMSChooseProspect = false;
    }
    else if (Ident == "ChooseProspect") {
      if (_.isNull(this.smsData.numbers) || _.isUndefined(this.smsData.numbers)) {
        this.toastr.error('Select Number: Please select a number from list', 'Warning!');
        return false
      }
      this.isSMS = false;
      this.isCreateNewSMS = false;
      this.isEditSMS = false;
      this.isSMSDetail = false;
      this.isSMSSchedule = false;
      this.isSMSUser = false;
      this.isSMSChooseProspect = true;
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

  reload() {
    alert('chal bc')
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload()
    });
  }
  getSelectedRow(data) {
    
    let prpertyId = $('#' + data.property_id);
    prpertyId.addClass("selected");
    this.rows_selected.push(data.property_id);
    var rows=$("#prospectTable").DataTable().rows().nodes();
    var uncheckedRows = $(rows).find('td:first-child input:checkbox:not(:checked)').length;
    if(uncheckedRows >0)
    this.checkText="Check All";
    else
    this.checkText="Uncheck All";
  }

  sendProspect() {
    if (this.rows_selected.length > 0)
      this.rows_selected = this.rows_selected.join()
    if (this.prospect == "email") {
      this.emailData = {
        "content": this.marketingDataService.message,
        "subject":  this.marketingDataService.subject,
        "property_id": this.rows_selected,
        "title":this.marketingDataService.title,
        "save":this.marketingDataService.save,
      }
      $('#cover-spin').show(0);
      this.authService.sendEmail(this.emailData).subscribe((data) => {
        $('#cover-spin').hide(0);
        if (data) {
          $('input[type="checkbox"]').prop('checked', false)
          $('input[type="checkbox"]').removeClass('selected')
          this.toastr.success('Email send Successfully', 'Success!');
          this.router.navigate(['/customer/email/']);

        }
      }, (error) => {
        $('#cover-spin').hide(0);
        $('input[type="checkbox"]').prop('checked', false)
        $('input[type="checkbox"]').removeClass('selected')
        this.toastr.error(error, 'Error!');

      });
    }
    else if(this.prospect == "phone"){
      
      console.log(this.marketingDataService)
      this.smsData = {
        // "numbers": "+919888503475,+918528835744",
        "numbers": "+13177729102",
        "message": this.marketingDataService.message,
        "title":this.marketingDataService.title,
        "save":this.marketingDataService.save,
        "property_id":this.rows_selected
      }
      $('#cover-spin').show(0);
      this.authService.sendSMS(this.smsData).subscribe((data) => {
        $('#cover-spin').hide(0);
        if (data) {
         $('input[type="checkbox"]').prop('checked', false)
          $('input[type="checkbox"]').removeClass('selected')
          this.toastr.success('SMS send Successfully', 'Success!');
          this.router.navigate(['/customer/sms/']);
        }
      }, (error) => {
        $('#cover-spin').hide(0);
        $('input[type="checkbox"]').prop('checked', false)
        $('input[type="checkbox"]').removeClass('selected')
        this.toastr.error(error, 'Error!');

      });
    }
    else{

      this.postCardData = {
        "message":"testing",
        "front_image_url": this.marketingDataService.message,
        "size": "4*6",
        "property_id":this.rows_selected,
        "style":"16",
        "title":this.marketingDataService.title,
        "template_json":this.marketingDataService.design
      }
      $('#cover-spin').show(0);
      this.authService.savePostcardTemplate(this.postCardData).subscribe((data) => {
        $('#cover-spin').hide(0);
        if (data) {
         $('input[type="checkbox"]').prop('checked', false)
          $('input[type="checkbox"]').removeClass('selected')
          this.toastr.success('Postcard sent Successfully', 'Success!');
          this.router.navigate(['/customer/postcard/']);
        }
      }, (error) => {
        $('#cover-spin').hide(0);
        $('input[type="checkbox"]').prop('checked', false)
        $('input[type="checkbox"]').removeClass('selected')
        this.toastr.error(error, 'Error!');

      });
    }
  }
  checkAllProspect() {

let self=this;
    var clicks = $(this).data('clicks');
    if (this.checkText == "Uncheck All") {
    var rows=$("#prospectTable").DataTable().rows().nodes();
      $(rows).find('td:first-child input:checkbox').prop("checked", false);
      this.checkText="Check All";
      this.prospectList.forEach((element) => {
        this.checkedPropertyId.pop(element.property_id)
       })
      console.log("checked",this.checkedPropertyId)
    } else {
      
      var rows=$("#prospectTable").DataTable().rows().nodes();
      $(rows).find('td:first-child input:checkbox').prop("checked", true);
      this.checkText="Uncheck All";
      var selectedIds = this.prospectList;
      this.prospectList.forEach((element) => {
        
      let checkPushedOrNot=this.checkedPropertyId.filter(x=>x==element.property_id);
      if(checkPushedOrNot.length==0){
        this.checkedPropertyId.push(element.property_id)
      }
      })
      console.log("unchecked",this.checkedPropertyId)
    }
    self.rows_selected = this.checkedPropertyId;
    $(this).data("clicks", !clicks);
  }
  getChildRow(row) {
    var tr = $(this).closest('tr');
    if (row.child.isShown()) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
      // Open this row
      row.child(this.format(row.data())).show();
      tr.addClass('shown');
    }
  }
  format(d: any) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
      '<tr>' +
      '<td>Full name:</td>' +
      '<td>' + "TEST" + '</td>' +
      '</tr>' +
      '</table>';
  }
  filterProspect(event) {
    this.checkText="Uncheck All" ? this.checkText="Check All" :this.checkText="Uncheck All";
    this.prospectChangeValue = event.target.value;
    $('#prospectTable').DataTable().clear();
    $('#prospectTable').DataTable().ajax.reload();
  }

  CancelProspect(){
    if(this.prospect=='phone'){
      this.router.navigate(['/customer/sms/']);
    }
    else if(this.prospect=='email'){
      this.router.navigate(['/customer/email/']);
    }
    else{
      this.router.navigate(['/customer/postcard/']);
    }

}
manageGridReset(){
  
}
manageGridInit(){
  
}
}
