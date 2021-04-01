import { Component, OnInit, ViewChild, ViewEncapsulation ,ElementRef, Renderer, AfterViewInit} from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ExcelService } from '../../../service/excel.service';
import { ToastrService } from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ConlactLogComponent } from '../../property/conlact-log/conlact-log.component';
import { CustomerService } from '../../customer.service';
import { CommonModalComponent } from 'src/app/shared/common-modal/common-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { walletReachargeComponent } from 'src/app/shared/wallet-reacharge-modal/wallet-reacharge-modal.component';
import { EmailStatusComponent } from 'src/app/shared/email-status/email-status.component';
import { SmsStatusComponent } from 'src/app/shared/sms-status/sms-status.component';
import { SortableModalComponent } from 'src/app/shared/sortable-modal/sortable-modal.component';
import { PendingModalComponent } from 'src/app/shared/pending-modal/pending-modal.component';
import { PostcardStatusComponent } from 'src/app/shared/postcard-status/postcard-status.component';
import { RecordNameComponent } from 'src/app/shared/record-name/record-name.component';
import { RecordNameChangeComponent } from 'src/app/shared/record-name-change/record-name-change.component';
declare var $: any;
class Action {
  id: number;
  status: number;
}
class Filters {  
  firstname: string;
  lastname: string;  
  city: string;
  phone: string;
  email: string;
  zip: string;
  state: string;
  apn: string;
}
class ManageGrid {
  gridSelect:number = 9;
  gridsStatus:any = [ true, true, true, true, true, true, true, true, true];
  gridCol:any = [ 1, 2, 3, 4, 5, 6, 7, 8, 9];
  gridColName:any=['First Name','Last Name', 'City', 'Email & Phone', 'Action' , 'Zip Code','State' ,'Address', 'APN'];
  type:number=7;  
}
@Component({
  selector: 'app-uploaded-list',
  templateUrl: './uploaded-list.component.html',
  styleUrls: ['./uploaded-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadedListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  checkedText: boolean = false;
  checkedEmail: boolean = false;
  checkedPost: boolean = false;
  currentBalance: number = 0; 

  data: any = [];
  allData: any = [];
  dtTrigger: Subject<any> = new Subject();
  action = new Action();
  exlTableData: any = [];
  rows_selected: any = [];
  rows_selected_perticular: any = [];
  checkedPropertyId: any = [];
  postOppurtunityModel = {};
  listenFunc: Function;
  manageGrid = new ManageGrid();
  checkText: any = "Check All";
  proceedLoader: boolean = false;
  purchaseGroupName:string=''
  con=[]
  filterObj = new Filters();
  filter:boolean = false;
  dataTables: any = [];
  searchArr: any =[];
  exportfiles: any = [];

  constructor(private authService: AuthService,
    private customerService: CustomerService,
    elementRef: ElementRef,
    private renderer: Renderer,
    private modal: NgbModal, 
    public actRouter: ActivatedRoute,  
    private router: Router, 
    private excelService: ExcelService, 
    private toastr: ToastrService) {
      
    this.listenFunc = renderer.listen(elementRef.nativeElement, 'click', (event) => {
      if (event.target.hasAttribute('view-prop')) {
        const url='/customer/property/' + event.target.getAttribute('view-prop');
        window.open(url,'_blank');
        //this.router.navigate(['/customer/property/' + event.target.getAttribute('view-prop')])
      }  
      if (event.target.hasAttribute('open-log')) {
        this.onOpenFlyout(event.target.getAttribute('open-log'))
      }
      if (event.target.hasAttribute('purchase-id')) {
       const purchase_id = event.target.getAttribute('purchase-id')
       const purchase_type = event.target.getAttribute('purchase-type')
       this.sendMarketing1(purchase_type , purchase_id);
      //  this.authService.getPendingProperties(this.purchaseGroupName,purchase_type).subscribe(data=>{
      //     const pendingRef=this.modal.open(PendingModalComponent)
      //     pendingRef.componentInstance.type = purchase_type
      //     pendingRef.componentInstance.propertyCount=data.data.length-1

      //     if(purchase_type=='phone'){
      //       this.checkedEmail=false
      //       this.checkedText=true
      //     }else{
      //       this.checkedEmail=true
      //       this.checkedText=false 
      //     }

      //     pendingRef.result.then((result) => {

      //       if(result.close===1){
      //         if(result.type){
      //           this.rows_selected_perticular=data.data
      //         }else{
      //           this.rows_selected_perticular=[purchase_id]
      //         }
      //         this.addSMSEmailToProspectsToPerticular()
      //       }
      //       }, (reason) => {

      //       });
      //  })


      }
      if (event.target.hasAttribute('warm-idx')) {
        this.bulb(event.target.getAttribute('warm-idx'));
      }
      if (event.target.hasAttribute('hot-idx')) {
        this.fire(event.target.getAttribute('hot-idx'));
      }
      if (event.target.className == 'btn btn-actions dels') {
     //punch3 if(confirm("Are you sure to remove this property from Purchase Records? If yes, you can recover this from Trash anytime :)")) {
          // this.trash(event.target.getAttribute('set-idx'));
       //punch3 } 
      } 
      
      })
   }

  ngAfterViewInit(): void {
    $("#genieffect").on('click', function(){
      $('.modal-backdrop.show').remove();
      $('#wallet_success').addClass('newgennie');
      $('#wallet_success .modal-dialog').addClass('newanim');
      setTimeout(function () {
       jQuery('#wallet_success').trigger('click');
      }, 2100);
    });

    // $("body").on('click', '.inherticlass', function() {
    //   $('#wallet_success .modal-dialog').removeClass('newanim');
    //   $('#wallet_success').removeClass('newgennie');
    // });
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('#search').on('click', function () {
          that.search(this.filterObj).draw();
        });
      });
    });
    this.dtTrigger.next();
  }
 
   public onOpenFlyout = (info) =>
   this.openFlyout(info);
  private openFlyout(info)
  { 
    const modalRef = this.modal.open(ConlactLogComponent, { windowClass: 'flyout-right' });
    modalRef.componentInstance.info = info;
  }
 
  title = 'angulardatatables';
  dtOptions: any = {};

  ngOnInit() {

  
    // this.filterObj.prospect = '1';
    for(var i=11;i<85;i++){
      this.con.push(i)
    }

    // $('#myModal').modal('show');
    // $('#cover-spin').show(0);
    let init:boolean=false; 
    this.authService.getGridList(7).subscribe((data)=>{ 
     console.log(data);
     console.log('data');
     if(data.data.length > 0) {
       this.manageGrid.gridSelect = 10;
       this.manageGrid.gridsStatus = JSON.parse(data.data[0].column_status);
       this.manageGrid.gridCol = JSON.parse(data.data[0].selected_column);
       this.manageGrid.gridColName = JSON.parse(data.data[0].column_name); 
       init = true;
      }
    });

    // this.authService.getAllPurchaseLeads(this.actRouter.params['value'].id)
    //   .subscribe((data) => {
    //     this.exlTableData = data;
    // });

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    var colCount: any = [];
    for (var i = 0; i < 77; i++) {
      if (i < 5) {
        continue;
      }
      colCount.push(i);
    }
    $('.filter_and_title .filter i').click(function () {
      $('.filter_box ').slideToggle(100);
    });
    const that =this
    this.dtOptions = {
      dom: 'lBfrtip',
      responsive: true,
      serverSide: true,
      processing: true,
      colReorder: true,
      // buttons: [ 'copy','csv','excel','pdf'],
      buttons: [
        // {
        //     extend: 'excel',
        //     text:'<i class="fa fa-file-excel-o" aria-hidden="true"></i>Export to Excel',
        //     className: 'btn-xs',
        //     exportOptions: {
        //       columns: colCount
        //     }
        // }
      ],
      
      drawCallback: function () {
        var hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
        $('.dt-buttons')[0].style.display = hasRows ? '' : 'none'
      },
      pagingType: "full_numbers",
      searching: false,
      lengthMenu: [
        [10, 20, 25, 50, 100, 150, 200, 250, 300, -1],
        [10, 20, 25, 50, 100, 150, 200, 250, 300, "All"]
      ],
      order: [[ 1, "desc" ]],
      ajax: (dataTablesParameters: any, callback) => {
        this.checkText = 'Check All';
        this.rows_selected = [];
        this.dataTables  = dataTablesParameters;

          this.authService.getUploadedList({ group_id: this.actRouter.params['value'].id, dataTablesParameters , ...this.filterObj }).subscribe((data)=>{
            $('#cover-spin').hide(0);
            this.data =JSON.parse(data.data)
            this.purchaseGroupName =  this.data.purchase_group_name
            this.allData = this.data;
            console.log(this.data, 'uploaded records')
            callback({
              recordsTotal: JSON.parse(data.data).recordsTotal,
              //recordsTotal: data.recordsTotal,
              recordsFiltered: JSON.parse(data.data).recordsFiltered,
              data: JSON.parse(data.data).data
            });
          })  

      },
          initComplete: function(settings, json) {
          if(init){
            init = false;
            $('#initGrid').click();
          }
          
        },
      columns: [
        {
          data: 'id', title: 'Select', width: '49', orderable: false, 
          render: function (data, type, row) {
            // console.log(data, type, row);
            return '<input type="checkbox" id="' + row.id + '">';
          }
        },
        { data: 'firstname', title: 'First Name', defaultContent: 'NA' , render: function (data, type, row) {
          let strDate=row.logs ? row.logs.contact_date:'';
          let fName=data ? row.firstname:'NA';
          if(strDate) {
            let dataMon = strDate.split('-');
            dataMon[1] = dataMon[1].substr(0, 3)
            dataMon = dataMon.join('-');
            return  fName +'<small class="last_contact">Last Contact:' +' ' + dataMon + '</small>';
          }
          else{
            return  fName ;
          }
        }
      },
        { data: 'lastname', title: 'Last Name', defaultContent: 'NA', render:function(data,type,row) {
          return row.lastname.length> 10? `${row.lastname.substr(0, 10)}...`: row.lastname; 
        } },
        
        { data: 'city', title: 'City', defaultContent: 'NA' },  
        {
          data: 'status',
          title: 'Status', name: 'ser_property.status', orderable: false,
          width: '30%',
          render: function (data, type, row,index) {
            
            let bulb=data==1? 'bulbs' : 'bulbs2'
            let fire=data==2? 'fires' : 'fires2'
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
            return '<ul class="btnsLst"><li><button  class="btn btn-actions"><img ' + oppStatus + ' alt=""></button> </li><li> <button warm-idx="'+ index.row +'" class="btn btn-actions ' + bulb + ' bulbs_' + index.row + '"></button> </li><li><button hot-idx="'+ index.row +'" class="btn btn-actions ' + fire + ' hot_' + index.row + '"></button></li><li><button open-log="'+ row.id +'" class="btn btn-actions sn"></button></li><li><button set-idx="'+ index.row +'" class="btn btn-actions dels"></button></li></ul>'
          }
        },
        // {
        //   data: 'status', defaultContent: '',
        //   title: 'Status', name: 'status', orderable: false,
        //   width: '30%',
        //   render: function (data, type, row , index) {
            
        //     let bulb=data==1? 'bulbs' : 'bulbs2'
        //     let fire=data==2? 'fires' : 'fires2'
        //     let oppStatus="";
        //     let statusTitle="";
        //     if(row.opportunity_status==1){
        //       oppStatus='src="assets/images/pros.png"';
        //      statusTitle='Prospecting';
        //     }
        //     if(row.opportunity_status==2){
        //       oppStatus='src="assets/images/qulification.png"';
        //      statusTitle='Qualification';
        //     }
        //     if(row.opportunity_status==3){
        //       oppStatus='src="assets/images/analysis.png"';
        //      statusTitle='Needs Analysis';
        //     }
        //     if(row.opportunity_status==4){
        //       oppStatus='src="assets/images/value-proposition.png"';
        //      statusTitle='Value Proposition';
        //     }
        //     if(row.opportunity_status==5){
        //       oppStatus='src="assets/images/dec-make.png"';
        //      statusTitle='Decision Makers';
        //     }
        //     if(row.opportunity_status==6){
        //       oppStatus='src="assets/images/per-analysis.png"';
        //      statusTitle='Perception Analysis';
        //     }
        //     if(row.opportunity_status==7){
        //       oppStatus='src="assets/images/proposal.png"';
        //      statusTitle='Proposal/Price Quote';
        //     }
        //     if(row.opportunity_status==8){
        //       oppStatus='src="assets/images/negotion.png"';
        //      statusTitle='Negotiation/Review';
        //     }
        //     if(row.opportunity_status==9){
        //       oppStatus='src="assets/images/closed-won.png"';
        //      statusTitle='Closed Won';
        //     }
        //     if(row.opportunity_status==10){
        //       oppStatus='src="assets/images/lost.png"';
        //      statusTitle='Closed Lost';
        //     }
        //     if(row.opportunity_status==0){
        //       oppStatus='src="assets/images/nostatus.png"';
        //       statusTitle='No status';
        //     }
        //     if(row.status==0){
        //       oppStatus='src="assets/images/nostatus.png"';
        //       statusTitle='No status';
        //     }
        //     return '<ul class="btnsLst"><li><button class="btn btn-actions"><img ' + oppStatus + ' alt=""></button> </li><li> <button warm-idx1="'+ index.row +'" class="btn btn-actions1 ' + bulb + ' bulbs_' + index.row + '"></button> </li><li><button hot-idx1="'+ index.row +'" class="btn btn-actions ' + fire + ' hot_' + index.row + '"></button></li><li><button open-log1="'+ row.id +'" class="btn btn-actions sn"></button></li><li><button set-idx1="'+ index.row +'" class="btn btn-actions dels"></button></li></ul>'
        //   }
        // },
        { title: 'Email & Phone', defaultContent: 'NA', orderable: false, 
          render: function (data, type, row) {
            let email = ``;
            let phone = ``;
            if(row.email == ""){

              email = `<a  purchase-id="${row.id}" purchase-type="1" class="pending_btn"><button class="btn btn-secondary secondary_tooltip"><i class="fa fa-envelope fa-lg"></i></button></a>`;
            }
              else{
            email = `<a  purchase-id="${row.id}" purchase-type="1" class="pending_btn" ><button title="${row.email}" class="btn btn-success inherticlass fetch_records_cta"><i class="fa fa-envelope fa-lg"></i></button></a>`
          }
          if(row.phone == 0 || row.phone ==''){
            phone = `<a purchase-id="${row.id}" purchase-type="2" class="pending_btn"><button class="btn btn-secondary secondary_tooltip"><i class="fa fa-mobile fa-lg"></i></button> </a>`;
          }
          else{
            phone = `<a purchase-id="${row.id}" purchase-type="2" class="pending_btn" ><button title="${row.phone}" class="btn btn-success inherticlass fetch_records_cta"><i class="fa fa-mobile fa-lg"></i></button></a>`;
          }

            return `<div class="relative"> ${email} ${phone} </div>`;
          }
        },
        { title: 'Action', defaultContent: 'NA' , orderable: false, 
          render: function (data, type, row) {
            // return `<a target="_blank"><button class="btn btn-default">Go</button></a>`;
            return `<a href="/customer/upload-property/${row.id}" target="_blank"><button class="btn btn-default">Go</button></a>`;
          }
        },
        { data: 'zip', title: 'Zip Code', defaultContent: 'NA' },
        { data: 'state', title: 'State', defaultContent: 'NA' },
        {
          title: 'Address',data: 'address', defaultContent: 'NA', width:'49',
          render: function (data, type, row) {
            let houseNumber = row.SitusHouseNumber == null ? '' : row.SitusHouseNumber;
            let streetName = row.SitusStreetName == null ? '' : row.SitusStreetName;
            let siteMode = row.SitusMode == null ? '' : row.SitusMode;
            let addresStr = houseNumber + ' ' + streetName + ' ' + siteMode;
            // data = addresStr;
            return data.trim()===''? '-' : data 
          }
        }, 
        { data: 'apn', title: 'APN', defaultContent: 'NA'},
        // {
        //   data: 'LMSSalePrice', visible: false , title: 'Market Value', defaultContent: '-', className: 'text-right', render: function (data, type, row) {
        //     return formatter.format(data) ? formatter.format(data) : 'No Data'
        // },  
        // }       
        
        
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        var rowId = data[0];

        // If row ID is in the list of selected row IDs
        if ($.inArray(rowId, this.rows_selected) !== -1) {
          $(row).find('input[type="checkbox"]').prop('checked', true);
          $(row).addClass('selected');
        }
        $('input[type="checkbox"]', row).unbind('click');
        $('input[type="checkbox"]', row).bind('click', () => {
          self.getSelectedRow(data);
        });
        $('td a.link-list', row).unbind('click');
        $('td a.link-list', row).bind('click', () => {
          self.someClickHandler(data);
        });

        return row;
      }

    };
  }




  getSelectedRow(data) {

    let prpertyId = $('#' + data.id);
    prpertyId.addClass("selected");

    var rows = $("#prospectTbl").DataTable().rows().nodes();
    var td = $("#" + data.id);
    var chkBox = td.eq(0).find('input');
    var isChecked = $('input[id=' + data.id + ']').prop('checked');
    if (isChecked == true) {
      this.rows_selected.push(data.id);
      console.log(this.rows_selected)
    } else {
      // this.rows_selected.pop(data.id);
      this.rows_selected = this.rows_selected.filter(function(e) { return e !== data.id })
      console.log(this.rows_selected)
    }
    if (chkBox.is(':checked')) {
      chkBox.prop('checked', false);
    }

    var uncheckedRows = $(rows).find('td:first-child input:checkbox:not(:checked)').length;
    if (uncheckedRows > 0)
      this.checkText = "Check All";
    else
      this.checkText = "Uncheck All";
  }
  exportAsXLSX(): void {
    
    this.toastr.success("Download may take 10-15 seconds to start", 'Notification!'); 
    let dataTablesParameters = [];
    dataTablesParameters = this.dataTables  
    dataTablesParameters.length = -1;  
    this.authService.getUploadedList({ group_id: this.actRouter.params['value'].id, dataTablesParameters }).subscribe((data)=>{
      
        this.exlTableData = JSON.parse(data.data).data;
        this.exportfiles = [];
        this.exlTableData.forEach(element => {
          this.exportfiles.push({ Firstname: element.firstname , Lastname: element.lastname , Address: element.address, Email: element.email, Phone : element.phone , APN : element.apn, City: element.city, Zip: element.zip , State: element.state })
        });
        if(this.rows_selected.length>0){
          const expData=[]
          this.exportfiles = [];
          this.exlTableData.map((element)=>{
              if(this.rows_selected.includes(element.id)){
                // expData.push(element)
                this.exportfiles.push({Firstname: element.firstname , Lastname: element.lastname , Address: element.address, Email: element.email, Phone : element.phone , APN : element.apn, City: element.city, Zip: element.zip , State: element.state })
              }
          })
          this.excelService.exportAsExcelFile(this.exportfiles, 'PurchaseRecordExport');
        } else {
          this.excelService.exportAsExcelFile(this.exportfiles, 'PurchaseRecordExport');
        }
    });
  }
  callTrash() {
    console.log(self);
  }
  trash(index: number): void {
    let info = this.allData[index];
    console.log(info)
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.row('tr:nth(' + index + ')').remove();
      dtInstance.draw();
    });
    const tra = { id: parseInt(info.id) }
    this.authService.pushTrash(tra).subscribe((data) => {
      this.router.navigate(['/customer/trash']);
    }, (error) => {
      console.log(error)
    })

  }


  someClickHandler(info: any): void {
    const url = '/customer/property/' + info.property_id;
    window.open(url, '_blank');
    //this.router.navigate(['/customer/property/',info.property_id])
  }

  bulb( index: number): void {
   console.log(index)


      if($(`#prospectTbl .bulbs_${index}`).hasClass('bulbs2')) {
        this.action.status = 1;
        $(`#prospectTbl .bulbs_${index}`).removeClass('bulbs2').addClass('bulbs');
        $(`#prospectTbl .hot_${index}`).removeClass('fires').addClass('fires2');
      } else {
        this.action.status = 0
        $(`#prospectTbl .bulbs_${index}`).removeClass('bulbs').addClass('bulbs2');
      }
      this.action.id = this.allData[index].id;
      this.authService.postAction(this.action)
      .subscribe((data) => { console.log(data) }, (error) => { console.log(error) });

  }

  fire(index: number): void {
    if($(`#prospectTbl .hot_${index}`).hasClass('fires2')) {
      this.action.status = 2;
      $(`#prospectTbl .bulbs_${index}`).removeClass('bulbs').addClass('bulbs2');
      $(`#prospectTbl .hot_${index}`).removeClass('fires2').addClass('fires');
    } else {
      this.action.status = 0;
      $(`#prospectTbl .hot_${index}`).removeClass('fires').addClass('fires2');
    }

    this.action.id = this.allData[index].id;

    this.authService.postAction(this.action)
    .subscribe((data) => { console.log(data) }, (error) => { console.log(error) })

  }



  btnClick(Ident: any) {
    if (Ident == 'ByEmail') {
      $('.by_email').addClass('active');
      $('.by_text').removeClass('active');
      $('.by_postcard').removeClass('active');
    }
    else if (Ident == 'ByText') {
      $('.by_text').addClass('active');
      $('.by_email').removeClass('active');
      $('.by_postcard').removeClass('active');
    }
    else {
      $('.by_postcard').addClass('active');
      $('.by_email').removeClass('active');
      $('.by_text').removeClass('active');
    }
  }

  addSMSEmailToProspectsToPerticular(){
    let rows_selected = '';
    let type = '';

    if(this.checkedText && this.checkedEmail) {
      type = 'both';
    }
    else if(this.checkedEmail) {
      type = 'email';
    }
    else if(this.checkedText) {
      type = 'phone';
    }

    if(type===''){
      this.addSMSEmailToProspects3();
    }
    else{
        if (this.rows_selected_perticular.length > 0)
          rows_selected = this.rows_selected_perticular.join();

          this.proceedLoader = true;
          this.customerService.getBatchPaymentDetails(rows_selected, type)
          .subscribe(
            (data: any) => {
              let batchdata = data.data;
              console.log(batchdata)
              batchdata.btnClass = 'btn-success';
              let msg = ``;

              if(this.checkedText && this.checkedEmail) {
                msg = `${batchdata.email_message} ${batchdata.phone_message}`;
              }
              else if(this.checkedEmail) {
                msg = batchdata.email_message;
              }
              else if(this.checkedText) {
                msg = batchdata.phone_message;
              }      

              if(msg && msg.trim().length > 0) {
                // const modalRef = this.modal.open(CommonModalComponent);
                // modalRef.componentInstance.type = 'Alert';
                // modalRef.componentInstance.data = batchdata;
                // modalRef.componentInstance.title = 'Alert';
                // modalRef.componentInstance.btnText = 'Ok';
                // modalRef.componentInstance.content = `<div class="row">
                // <div class="text-center mt-3 chknew">
                // <p class="h5 mt-3">${msg}</p>
                // </div>
                // </div>`;
                
                // modalRef.result.then((result) => {
                //   this.checkWallet(batchdata);
                // }, (reason) => {
                //   this.checkWallet(batchdata);
                // });
                this.checkWallet2(batchdata,msg);
              } else {
                this.checkWallet2(batchdata,null);
              }
            
          }, err => {
            this.proceedLoader = false;
            this.toastr.error(err, 'Error!');
          }
    )

      }
  }

  addSMSEmailToProspects(): void {
    let rows_selected = '';
    let type = '';

    if(this.checkedText && this.checkedEmail) {
      type = 'both';
    }
    else if(this.checkedEmail) {
      type = 'email';
    }
    else if(this.checkedText) {
      type = 'phone';
    }

    if(type===''){
      this.addSMSEmailToProspects2();
    }
    else{
        if (this.rows_selected.length > 0)
          rows_selected = this.rows_selected.join();

          this.proceedLoader = true;
          this.customerService.getBatchPaymentDetails(rows_selected, type)
          .subscribe(
            (data: any) => {
              let batchdata = data.data;
              console.log(batchdata)
              batchdata.btnClass = 'btn-success';
              let msg = ``;

              if(this.checkedText && this.checkedEmail) {
                msg = `${batchdata.email_message} ${batchdata.phone_message}`;
              }
              else if(this.checkedEmail) {
                msg = batchdata.email_message;
              }
              else if(this.checkedText) {
                msg = batchdata.phone_message;
              }      

              if(msg && msg.trim().length > 0) {
                // const modalRef = this.modal.open(CommonModalComponent);
                // modalRef.componentInstance.type = 'Alert';
                // modalRef.componentInstance.data = batchdata;
                // modalRef.componentInstance.title = 'Alert';
                // modalRef.componentInstance.btnText = 'Ok';
                // modalRef.componentInstance.content = `<div class="row">
                // <div class="text-center mt-3 chknew">
                // <p class="h5 mt-3">${msg}</p>
                // </div>
                // </div>`;
                
                // modalRef.result.then((result) => {
                //   this.checkWallet(batchdata);
                // }, (reason) => {
                //   this.checkWallet(batchdata);
                // });
                this.checkWallet(batchdata,msg);
              } else {
                this.checkWallet(batchdata,null);
              }
            
          }, err => {
            this.proceedLoader = false;
            this.toastr.error(err, 'Error!');
          }
    )

      }
  }

  checkWallet2(batchdata,arg2) {
    if(batchdata.total_amount > batchdata.current_wallet_amount) {
            const modalRef = this.modal.open(walletReachargeComponent);
        
            modalRef.componentInstance.type = 'wallet recharge';
            modalRef.componentInstance.data = batchdata;
            
            modalRef.result.then((result) => {
              if(result === 'Cross click') { this.proceedLoader = false; return; }
              this.batchPayment(batchdata,arg2);

            }, (reason) => {
              this.proceedLoader = false;
              console.log('reason ', reason);
            });
          
        } else {
          this.batchPayment2(batchdata,arg2);
      }
  }


  checkWallet(batchdata,arg2) {
      if(batchdata.total_amount > batchdata.current_wallet_amount) {
              const modalRef = this.modal.open(walletReachargeComponent);
          
              modalRef.componentInstance.type = 'wallet recharge';
              modalRef.componentInstance.data = batchdata;
              
              modalRef.result.then((result) => {
                if(result === 'Cross click') { this.proceedLoader = false; return; }
                this.batchPayment(batchdata,arg2);

              }, (reason) => {
                this.proceedLoader = false;
                console.log('reason ', reason);
              });
            
          } else {
            this.batchPayment(batchdata,arg2);
        }
  }


  batchPayment2(batchdata,arg2) {
    $('#wallet_success .modal-dialog').removeClass('newanim');
    $('#wallet_success').removeClass('newgennie');
    
    this.authService.getWallet().subscribe(data => {
      this.currentBalance = parseFloat(data.data.current_points);
      batchdata.current_wallet_amount = this.currentBalance;

      let imgs = ``;
      let typemessage = ``;

      if(this.checkedText && this.checkedEmail) {
        imgs = `<img src="assets/images/by_email.png"><img src="assets/images/cellphone.svg">`;
        typemessage = `email and phone`;
      }
      else if(this.checkedEmail) {
        imgs = `<img src="assets/images/by_email.png">`;
        typemessage = `email`;
      }
      else if(this.checkedText) {
        imgs = `<img src="assets/images/cellphone.svg">`;
        typemessage = `phone`;
      }

          batchdata.btnClass = 'btn-success';
          const modalRef = this.modal.open(CommonModalComponent, { windowClass: 'purchased-record-batchpayment' });
          
          modalRef.componentInstance.type = 'batch payment';
          modalRef.componentInstance.data = batchdata;
          modalRef.componentInstance.title = '';
          modalRef.componentInstance.btnText = 'Confirm';
          modalRef.componentInstance.content = `<div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label>Total Records</label>
              <p><b>${batchdata.total_properties_post}</b></p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <label>Total Amount</label>
              <p><b>$${batchdata.total_amount.toFixed(2)}</b></p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <label class="w-100"><div class="d-flex justify-content-between">Wallet Amount</div></label>
              <p><b>$${batchdata.current_wallet_amount.toFixed(2)}</b></p>
            </div>
          </div>
          <div class="text-center mt-3 chknew">
            ${imgs}
            <p class="h5 mt-3 p-2">We are taking $${batchdata.full_amount.toFixed(2)} out of your wallet, any records not found will be credited to your wallet.</p>
          </div>
          <div class="text-center mt-3 chknew">
          ${arg2!=null? arg2: ''}
          </div>
        </div>`;

          modalRef.result.then((result) => {

            if(result === 'Cross click') { this.proceedLoader = false; return; }
            
            this.customerService.batchPayment(batchdata.total_amount.toFixed(2))
            .subscribe(
              (data: any) => {
                this.proceedLoader = false;
                this.addSMSEmailToProspects3();
               if(!this.checkedPost){
                $('#wallet_success').modal('show');
               } 

              }, err => {
                this.proceedLoader = false;
                console.log('err ', err);
                this.toastr.error(err, 'Error!');
              })

          }, (reason) => {
            this.proceedLoader = false;
            console.log('reason ', reason);
        });

    });
  }


  // checkmodal() {
  //  let batchdata = {btnClass:'btn-success'};
  //   const modalRef = this.modal.open(CommonModalComponent, { windowClass: 'purchased-record-batchpayment' });
  //         modalRef.componentInstance.type = 'batch payment';
  //         modalRef.componentInstance.title = '';
  //         modalRef.componentInstance.data = batchdata;
  //         modalRef.componentInstance.btnText = 'Confirm';
  //         modalRef.componentInstance.content = `hello`;
  //         modalRef.result.then(res=> {
  //           console.log(res); 
  //           $('#wallet_success').modal('show'); 
  //         })
  // }


  batchPayment(batchdata,arg2) {
    $('#wallet_success .modal-dialog').removeClass('newanim');
    $('#wallet_success').removeClass('newgennie');
    
    this.authService.getWallet().subscribe(data => {
      this.currentBalance = parseFloat(data.data.current_points);
      batchdata.current_wallet_amount = this.currentBalance;

      let imgs = ``;
      let typemessage = ``;

      if(this.checkedText && this.checkedEmail) {
        imgs = `<img src="assets/images/by_email.png"><img src="assets/images/cellphone.svg">`;
        typemessage = `email and phone`;
      }
      else if(this.checkedEmail) {
        imgs = `<img src="assets/images/by_email.png">`;
        typemessage = `email`;
      }
      else if(this.checkedText) {
        imgs = `<img src="assets/images/cellphone.svg">`;
        typemessage = `phone`;
      }

          batchdata.btnClass = 'btn-success';
          const modalRef = this.modal.open(CommonModalComponent, { windowClass: 'purchased-record-batchpayment' });
          
          modalRef.componentInstance.type = 'batch payment';
          modalRef.componentInstance.data = batchdata;
          modalRef.componentInstance.title = '';
          modalRef.componentInstance.btnText = 'Confirm';
          modalRef.componentInstance.content = `<div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label>Total Records</label>
              <p><b>${batchdata.total_properties_post}</b></p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <label>Total Amount</label>
              <p><b>$${batchdata.total_amount.toFixed(2)}</b></p>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <label class="w-100"><div class="d-flex justify-content-between">Wallet Amount</div></label>
              <p><b>$${batchdata.current_wallet_amount.toFixed(2)}</b></p>
            </div>
          </div>
          <div class="text-center mt-3 chknew">
            ${imgs}
            <p class="h5 mt-3 p-2">We are taking $${batchdata.full_amount.toFixed(2)} out of your wallet, any records not found will be credited to your wallet.</p>
          </div>
          <div class="text-center mt-3 chknew">
          ${arg2!=null? arg2: ''}
          </div>
        </div>`;

          modalRef.result.then((result) => {

            if(result === 'Cross click') { this.proceedLoader = false; return; }
            
            this.customerService.batchPayment(batchdata.total_amount.toFixed(2))
            .subscribe(
              (data: any) => {
                this.proceedLoader = false;
                this.addSMSEmailToProspects2();
               if(!this.checkedPost){
                $('#wallet_success').modal('show');
               } 

              }, err => {
                this.proceedLoader = false;
                console.log('err ', err);
                this.toastr.error(err, 'Error!');
              })

          }, (reason) => {
            this.proceedLoader = false;
            console.log('reason ', reason);
        });

    });
  }

  addSMSEmailToProspects3() {
    // $('#myModalPayment').modal('hide')
    if (this.rows_selected_perticular.length > 0) {

      let rows_selected = this.rows_selected_perticular.join();
      if(this.checkedEmail)
      this.authService.postBatchProcessEmail(rows_selected,this.purchaseGroupName).subscribe(data=>{
        console.log(data)
      })
      
      if(this.checkedText)
      this.authService.postBatchProcessPhone(rows_selected,this.purchaseGroupName).subscribe(data=>{
        console.log(data)
      })

      if(this.checkedPost){
        $('#wallet_success').modal('hide');
        localStorage.setItem('postCardMember', rows_selected);
        this.router.navigate(['/customer/postcard'])
      }

        
    }
  }



  addSMSEmailToProspects2() {
    // $('#myModalPayment').modal('hide')
    if (this.rows_selected.length > 0) {

      let rows_selected = this.rows_selected.join();
      if(this.checkedEmail)
      this.authService.postBatchProcessEmail(rows_selected,this.purchaseGroupName).subscribe(data=>{
        console.log(data)
      })
      
      if(this.checkedText)
      this.authService.postBatchProcessPhone(rows_selected,this.purchaseGroupName).subscribe(data=>{
        console.log(data)
      })

      if(this.checkedPost){
        $('#wallet_success').modal('hide');
        localStorage.setItem('postCardMember', rows_selected);
        this.router.navigate(['/customer/postcard'])
      }

        
    }
  }


  checkAllProspect() {
    let self = this;
    var clicks = $(this).data('clicks');
    if (this.checkText == "Uncheck All") {
     // $("#hiddenBtn").val("false");
      var rows = $("#prospectTbl").DataTable().rows().nodes();
      $(rows).find('td:first-child input:checkbox').prop("checked", false);
      this.checkText = "Check All";
      this.data.data.forEach((element) => {
        this.rows_selected.pop(element.id)
        console.log(this.rows_selected)
      })
    } else {

     // $("#hiddenBtn").val("true");
      var rows = $("#prospectTbl").DataTable().rows().nodes();
      $(rows).find('td:first-child input:checkbox').prop("checked", true);
      this.checkText = "Uncheck All";
      this.data.data.forEach((element) => {
        let checkPushedOrNot = this.checkedPropertyId.filter(x => x == element.id);
        if (checkPushedOrNot.length == 0) {
          this.rows_selected.push(element.id);
          this.rows_selected = [...new Set(this.rows_selected)];
          console.log(this.rows_selected)
        }
      })
    }
    // self.rows_selected = this.checkedPropertyId;
    $(this).data("clicks", !clicks);
  }

  setOppurtunity(value) {
     if (this.rows_selected.length) {
      $('#cover-spin').show(0);
      this.postOppurtunityModel['Property_id'] = this.rows_selected;
      this.postOppurtunityModel['opportunity_status_value'] = value;
      this.authService.saveOppurtunity(this.postOppurtunityModel).subscribe((data) => {
        
        this.rows_selected=[];
        $('#prospectTbl').DataTable().clear();
        $('#prospectTbl').DataTable().ajax.reload();
        $('#cover-spin').hide(0);
       this.toastr.success(data.message,'success');
      }, (error) => {
        $('#cover-spin').hide(0);
      });
    }
  else {
      this.toastr.error('Please select at least one record');
    }
  }

  manageGridReset(){
    this.manageGrid.gridSelect = 4;
    this.manageGrid.gridsStatus = [false, false,false, false,false];
    this.manageGrid.gridCol = [0,1,2,3];
    $('#manageGridHot').modal('hide');
    this.authService.setGridList(this.manageGrid).subscribe((data)=>{
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      for ( var i=0 ; i< 4; i++ ) {
        dtInstance.column(i).visible( true, true );
      }
      dtInstance.columns.adjust().draw( false );
      dtInstance['colReorder'].reset(); 
    });
  });
  }
  manageGridInit(){
    
    let colStatus = this.manageGrid.gridsStatus;
    let colOrder = this.manageGrid.gridCol;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance['colReorder'].order([0, ...colOrder.concat(this.con)], true);
      for ( var i=1 ; i< 11; i++ ) {
          dtInstance.column(i).visible(colStatus[i-1],true );
      }
      dtInstance.columns.adjust().draw( false );
    });
  }
  onGridSelectChange(event) {
    if(event) {
      for(var i=4;i>=0;i--){
        if(i>parseInt(event)){
          this.manageGrid.gridsStatus[i] = true;
        } else{
          this.manageGrid.gridsStatus[i] = false;
        }          
      }      
    }
  }
  manageGridSubmit(form:any) {    
    
    var colOrder:any=[];
    var missingOrder = [];
    for(var i=0;i<Object.keys(form).length-1;i++){
      colOrder[i] = parseInt(form['col'+i])
    }
    if(!this.checkIfArrayIsUnique(colOrder)){
      //this.toastr.error('please select unique value in each column!', 'Error!');
      return;
    }    
    this.authService.setGridList(this.manageGrid).subscribe((data)=>{ 
      //console.log(data.data.message);
      this.toastr.success("Grids saved successfully", 'Success!');   
      $('#manageGridHot').modal('hide'); 
      var tmpArr = colOrder.slice().sort();    
      for ( var i = 0,j=0; i < 3; i++ ) {
        if(tmpArr[j]== i){
          j++;
        } else{
          missingOrder.push(i);   
        }
      }
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  
        for ( var i=0 ; i< 4; i++ ) {
          dtInstance.column(i).visible( true, true );
        }    
        dtInstance['colReorder'].order(colOrder.concat(missingOrder), true);
        for( var i:number=tmpArr.length ; i < 4; i++ ) {
          dtInstance.column(i).visible( false, true );
        }
        dtInstance.columns.adjust().draw( false );
            
      });
      this.manageGrid.gridSelect = form.gridSelect;
      this.manageGrid.gridCol = colOrder.concat(missingOrder);     
    });  
  }
  checkIfArrayIsUnique(myArray) {
    for (var i = 0; i < myArray.length; i++) {
      for (var j = 0; j < myArray.length; j++) {
        if (i != j){
          if (myArray[i] == myArray[j]){            
            this.toastr.error('"'+ this.manageGrid.gridColName[this.manageGrid.gridCol[i]] + '"Coulmn can come only once!', 'Error!');
            return false; 
          }
        }
      }
    }
    return true;
  }

  sendMarketing(arg){
    if(this.rows_selected.length===0){
      this.toastr.error('Please select at least one record','Error!');
    }
    else{
      if(arg==1){
        this.authService.emailMarketingData(this.rows_selected.join(),'email', 'import').subscribe(data=>{
          const modalRef = this.modal.open(EmailStatusComponent, { size: 'lg' });
          modalRef.componentInstance.data = data.data;
          modalRef.componentInstance.rows = this.rows_selected.join();
        },(error)=>{
          this.toastr.error("Invalid property id", 'Error!');   
        })
      }
      else if(arg==2){
        this.authService.emailMarketingData(this.rows_selected.join(),'phone', 'import').subscribe(data=>{
          console.log(data)
          const modalRef = this.modal.open(SmsStatusComponent, { size: 'lg' });
          modalRef.componentInstance.data = data.data;
          modalRef.componentInstance.rows = this.rows_selected.join();
        },(error)=>{
          this.toastr.error("Invalid property id", 'Error!');   
        })
      }
      else if(arg===3){
        this.authService.emailMarketingData(this.rows_selected.join(),'postcard','import').subscribe(data=>{
          const modalRef = this.modal.open(PostcardStatusComponent, { size: 'lg' });
          modalRef.componentInstance.data = data.data;
          modalRef.componentInstance.type = 'import';
          modalRef.componentInstance.rows = this.rows_selected.join();
        })
      }
    }
    
  }

  sendMarketing1(arg , id){
    // if(this.rows_selected.length===0){
    //   this.toastr.error('Please select at least one record','Error!');
    // }
    // else{
      if(arg==1){
        this.authService.emailMarketingData(id,'email', 'import').subscribe(data=>{
          const modalRef = this.modal.open(EmailStatusComponent, { size: 'lg' });
          modalRef.componentInstance.data = data.data;
          modalRef.componentInstance.rows = id;
        },(error)=>{
          this.toastr.error("Invalid property id", 'Error!');   
        })
      }
      else if(arg==2){
        this.authService.emailMarketingData(id,'phone', 'import').subscribe(data=>{
          console.log(data)
          const modalRef = this.modal.open(SmsStatusComponent, { size: 'lg' });
          modalRef.componentInstance.data = data.data;
          modalRef.componentInstance.rows = id;
        },(error)=>{
          this.toastr.error("Invalid property id", 'Error!');   
        })
      }
      // else if(arg===3){
      //   this.authService.emailMarketingData(id,'postcard','import').subscribe(data=>{
      //     const modalRef = this.modal.open(PostcardStatusComponent, { size: 'lg' });
      //     modalRef.componentInstance.data = data.data;
      //     modalRef.componentInstance.type = 'import';
      //     modalRef.componentInstance.rows = this.rows_selected.join();
      //   })
      // }
    // }
    
  }
  resetFilters() {
    // this.filter = false;
    this.filterObj.firstname = '';
    this.filterObj.lastname = '';
    this.filterObj.city = '';
    this.filterObj.phone = '';  
    this.filterObj.email = '';
    this.filterObj.zip = '';
    this.filterObj.state = '';
    this.filterObj.apn = '';
   
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  manageGridModal():void{
    const that =this
    const modalRef = this.modal.open(SortableModalComponent);
    console.log(this.manageGrid)

    const main = []
    for(let i=0;i <this.manageGrid.gridCol.length;i++){
      main.push({item:this.manageGrid.gridCol[i],status:this.manageGrid.gridsStatus[i]})
    }
    modalRef.componentInstance.gridColName=this.manageGrid.gridColName
    modalRef.componentInstance.gridsStatus=this.manageGrid.gridsStatus
    modalRef.componentInstance.gridCol=this.manageGrid.gridCol
    modalRef.componentInstance.main=main
    modalRef.componentInstance.type=0 

    modalRef.result.then((data) => {
     if(data.type===0){
      this.manageGrid.gridsStatus = data.gridsStatus;
      this.manageGrid.gridCol = data.gridCol;
      this.manageGrid.gridColName = data.gridColName; 
      this.manageGrid.gridSelect = 9; 
      const gridData={
        gridCol: data.gridCol,
        gridColName:  data.gridColName,
        gridSelect: 9,
        gridsStatus: data.gridsStatus,
        type: 7
      }

      this.authService.setGridList(gridData).subscribe((data)=>{ 
        this.toastr.success("Grids saved successfully", 'Success!');   
      })
      that.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {   
        for( var i:number=0 ; i < 9; i++ ) {
          dtInstance.column(i).visible( true, true );
        }
        dtInstance['colReorder'].order([0,...this.manageGrid.gridCol.concat(this.con)],true);
        for( var i:number=1 ; i < 10; i++ ) {
          dtInstance.column(i).visible( data.gridsStatus[i-1], true );
        }
        dtInstance.columns.adjust().draw( false );    
      });
    } else if(data.type===1){
      const gridDefault=new ManageGrid()
      this.manageGrid.gridsStatus = gridDefault.gridsStatus;
      this.manageGrid.gridCol = gridDefault.gridCol;
      this.manageGrid.gridColName = gridDefault.gridColName; 
      this.manageGrid.gridSelect = 9; 
      const gridData={
        gridCol: gridDefault.gridCol,
        gridColName:  gridDefault.gridColName,
        gridSelect: 9,
        gridsStatus: gridDefault.gridsStatus,
        type: 9
      }

      this.authService.setGridList(gridData).subscribe((data)=>{ 
        this.toastr.success("Grids saved successfully", 'Success!');   
      })
      that.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {   
        for( var i:number=0 ; i < 9; i++ ) {
          dtInstance.column(i).visible( true, true );
        }
        dtInstance['colReorder'].order([0,...gridDefault.gridCol.concat(this.con)],true);
        dtInstance.columns.adjust().draw( false );    
      });   
    }
    }, (reason) => {
      // on dismiss
    });
  }

  searchFilter(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
    // this.filter = true;
    $('#prospectTbl').DataTable().ajax.reload();
}

}



