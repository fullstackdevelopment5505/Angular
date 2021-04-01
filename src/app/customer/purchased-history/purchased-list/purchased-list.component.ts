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
  Owner1FirstName: string;
  OwnerLastname1: string;  
  SitusCity: string;
  status: string;
  phone: string;
  email: string;
  SitusZipCode: string;
  SitusState: string;
}
class ManageGrid {
  gridSelect:number = 10;
  gridsStatus:any = [ true, true, true, true, true, true, true, true, true, true];
  gridCol:any = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  gridColName:any=['First Name','Last Name', 'City', 'Status', 'Email & Phone', 'Action' , 'Zip Code','State' ,'Address', 'Market Value'];
  type:number=3;  
}
@Component({
  selector: 'app-purchased-list',
  templateUrl: './purchased-list.component.html',
  styleUrls: ['./purchased-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PurchasedListComponent implements OnInit, AfterViewInit {
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
  all_rows_selected_excel: any = [];

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

      if(event.target.hasAttribute('pur-id')){
        const purchase_id = event.target.getAttribute('pur-id')
        this.authService.emailMarketingData(purchase_id,'email', 'datatree').subscribe(data=>{
          const modalRef = this.modal.open(RecordNameComponent, { size: 'lg' });
          modalRef.componentInstance.data = data.data;
          modalRef.componentInstance.rows = purchase_id;
          modalRef.componentInstance.type = 'email';
          modalRef.result.then((result) => {
            if(result===1){
              const modalRef = this.modal.open(RecordNameChangeComponent, { size: 'lg' });
              modalRef.componentInstance.data = data.data;
              modalRef.componentInstance.rows = purchase_id;
              modalRef.componentInstance.type = 'email';
            }
            else if(result===2){
              const modalRef = this.modal.open(EmailStatusComponent, { size: 'lg' });
              modalRef.componentInstance.data = data.data;
              modalRef.componentInstance.rows = purchase_id;
            }
            
          })

        })
      }

      
      if(event.target.hasAttribute('purh-id')){
        const purchase_id = event.target.getAttribute('purh-id')
        this.authService.emailMarketingData(purchase_id,'phone', 'datatree').subscribe(data=>{
          const modalRef = this.modal.open(RecordNameComponent, { size: 'lg' });
          modalRef.componentInstance.data = data.data;
          modalRef.componentInstance.rows = purchase_id;
          modalRef.componentInstance.type = 'phone';
          modalRef.result.then((result) => {
            if(result===1){
              const modalRef = this.modal.open(RecordNameChangeComponent, { size: 'lg' });
              modalRef.componentInstance.data = data.data;
              modalRef.componentInstance.rows = purchase_id;
              modalRef.componentInstance.type = 'phone';
            }
            else if(result===2){
              const modalRef = this.modal.open(SmsStatusComponent, { size: 'lg' });
              modalRef.componentInstance.data = data.data;
              modalRef.componentInstance.rows = purchase_id;
            }
            
          })
        })
      }

      if (event.target.hasAttribute('purchase-id')) {
       const purchase_id = event.target.getAttribute('purchase-id')
       const purchase_type = event.target.getAttribute('purchase-type')

       this.authService.getPendingProperties(this.purchaseGroupName,purchase_type).subscribe(data=>{
          const pendingRef=this.modal.open(PendingModalComponent)
          pendingRef.componentInstance.type = purchase_type
          pendingRef.componentInstance.propertyCount=data.data.length-1

          if(purchase_type=='phone'){
            this.checkedEmail=false
            this.checkedText=true
          }else{
            this.checkedEmail=true
            this.checkedText=false 
          }

          pendingRef.result.then((result) => {

            if(result.close===1){
              if(result.type){
                this.rows_selected_perticular=data.data
              }else{
                this.rows_selected_perticular=[purchase_id]
              }
              this.addSMSEmailToProspectsToPerticular()
            }
            }, (reason) => {

            });
       })


      }
      if (event.target.hasAttribute('warm-idx')) {
        this.bulb(event.target.getAttribute('warm-idx'));
      }
      if (event.target.hasAttribute('hot-idx')) {
        this.fire(event.target.getAttribute('hot-idx'));
      }
      if (event.target.className == 'btn btn-actions dels') {
        //punch3if(confirm("Are you sure to remove this property from Purchase Records? If yes, you can recover this from Trash anytime :)")) {
          this.trash(event.target.getAttribute('set-idx'));
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

  

    for(var i=11;i<85;i++){
      this.con.push(i)
    }

    // $('#myModal').modal('show');
    $('#cover-spin').show(0);
    let init:boolean=false; 
    this.authService.getGridList(3).subscribe((data)=>{ 
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
      minimumFractionDigits: 0
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
      aaSorting: [[ 5 , 'desc' ]], 
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
      ajax: (dataTablesParameters: any, callback) => {
        //this.authService.getPuechasedList({name:this.actRouter.params['value'].id,start:dataTablesParameters.start,length:dataTablesParameters.length,draw:dataTablesParameters.draw,search:dataTablesParameters.search.value})

        // console.log('dataTablesParameters ', dataTablesParameters);

        this.checkText = 'Check All';
        // this.rows_selected = [];
        this.dataTables  = dataTablesParameters;

        // if(dataTablesParameters.draw > 2) {
          // this.checkText = this.checkText == 'Check All' ? 'Uncheck All' : 'Check All';
        // }

        this.authService.getPuechasedList({ name: this.actRouter.params['value'].id, dataTablesParameters, ...this.filterObj })
          .subscribe((data) => {
            this.data = JSON.parse(data.data);
            this.allData = this.data.data;
            that.purchaseGroupName=this.data.purchase_group_name
            $('#cover-spin').hide(0);

            // callback({            
            //   data: JSON.parse(data.data) 
            //   // recordsTotal: data.data.length,
            //   // recordsFiltered: 10,
            //   // data: [],
            // });
            callback({
              recordsTotal: JSON.parse(data.data).recordsTotal,
              //recordsTotal: data.recordsTotal,
              recordsFiltered: JSON.parse(data.data).recordsFiltered,
              data: JSON.parse(data.data).data
            });
            var countChecked = 0;
            this.allData.forEach(element => {
              this.rows_selected.forEach(erow => {
               
                if(element.prop_id == erow)
                {
                  countChecked++;
                } 
              });
            });

            if(this.allData.length == countChecked) {
              this.checkText = 'Uncheck All';
            }

            $('td').on('click mousedown mouseup', function(e) {
              if (e.target.type === 'checkbox') {
                  e.stopPropagation();
              }
          });

          //  var checkValue = ($("#hiddenBtn").val() === "true");
          //  var rows = $("#prospectTbl").DataTable().rows().nodes();
           // $(rows).find('td:first-child input:checkbox').prop("checked", checkValue);
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
          data: 'property_id', title: 'Select', width: '49', orderable: false, 
          render: function (data, type, row) {
            // console.log(data, type, row);
            return '<input type="checkbox" id="' + row.prop_id + '">';
          }
        },
        { data: 'Owner1FirstName', title: 'First Name', defaultContent: 'NA' , render: function (data, type, row) {
          let strDate=row.logs ? row.logs.contact_date:'';
          let fName=data ? row.Owner1FirstName:'NA';
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
        { data: 'OwnerLastname1', title: 'Last Name', defaultContent: 'NA', render:function(data,type,row) {
          return row.OwnerLastname1.length> 10? `${row.OwnerLastname1.substr(0, 10)}...`: row.OwnerLastname1; 
        } },
        
        { data: 'SitusCity', title: 'City', defaultContent: 'NA' },
        
        
        // {
        //   data: 'address', name: 'SitusHouseNumber',
        //   title: 'Address name',
        //   render: function (data, type, row) {
        //     var str = row.SitusHouseNumber ? (row.SitusHouseNumber + ' ') : '' + row.SitusStreetName ? (row.SitusStreetName + ' ') : '' + row.SitusMode ? row.SitusMode : '';
        //     str = data ? data : str;
        //     let strDate=row.logs ? row.logs.contact_date : '';
        //     if(strDate) {
        //       let dataMon = strDate.split('-');
        //       dataMon[1] = dataMon[1].substr(0, 3);
        //       dataMon = dataMon.join('-');
        //         return '<a class="link-list" target="_blank">' + str +'<small class="last_contact">Last Contact:' +' ' +dataMon + '</small>'+ '</a>'
        //     } else{
        //       return '<a class="link-list" target="_blank">'  + str + '</a>'
        //     }
        //   }
        //       // render: function (data, type, row) {
        //   //   return '<span id="id' + row.property_id + '">' + row.purchase_group_name + 
        //   //   '<small class="last_contact">Last Contact: July/10/2020</small>'+'</span>' ;
        //   // }
        // },


        // {
        //   data: 'amount', name: 'LMSSalePrice',
        //   title: 'Market Value', className: 'text-right', render: function (data, type, row) {
        //     return formatter.format(data)
        //   }
        // },
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
        // { data: 'date', title: 'Date & Time', name: 'date', width: '15%' },
        { title: 'Email & Phone', defaultContent: 'NA', orderable: false, data:'user_property.updated_at',
          render: function (data, type, row) {
            let email = ``;
            let phone = ``;

            if(parseInt(row.batch_search_email_flag) === 1) {
              if(parseInt(row.email_search_flag) === 1) {
                email = `<a  pur-id="${row.prop_id}" class="pending_btns" purchase-type="email"><button class="btn btn-success inherticlass fetch_records_cta"><i class="fa fa-envelope fa-lg"></i></button></a>`;
              } else {
                email = `<a href="javascript:void(0);"><button class="btn btn-secondary secondary_tooltip"><i class="fa fa-envelope fa-lg"></i></button></a>`;
              }
            } else {
              email = `<a  purchase-id="${row.prop_id}" purchase-type="email" class="pending_btn"><button class="btn btn-info inherticlass pending_data_cta"><i class="fa fa-envelope fa-lg"></i></button></a>`;
            }

            if(parseInt(row.batch_search_phone_flag) === 1) {
              if(parseInt(row.phone_search_flag) === 1) {
                phone = `<a purh-id="${row.prop_id}" class="pending_btns" purchase-type="phone"><button class="btn btn-success inherticlass fetch_records_cta"><i class="fa fa-mobile fa-lg"></i></button></a>`;
              } else {
                phone = `<a href="javascript:void(0);"><button class="btn btn-secondary secondary_tooltip"><i class="fa fa-mobile fa-lg"></i></button> </a>`;
              }
            } else {
              phone = `<a purchase-id="${row.prop_id}" purchase-type="phone" class="pending_btn"><button class="btn btn-info inherticlass pending_data_cta"><i class="fa fa-mobile fa-lg"></i></button></a>`;
            }

            return `<div class="relative"> ${email} ${phone} </div>`;
          }
        },
        { title: 'Action', defaultContent: 'NA' , orderable: false, 
          render: function (data, type, row) {
            return `<a href="/customer/property/${row.property_id}" target="_blank"><button class="btn btn-default">Go</button></a>`;
          }
        },
        //punch4
        { data: 'SitusZipCode', title: 'Zip Code', defaultContent: 'NA' ,render: function(data, type, row){
          return data.length == 4 ? '0'+ data : data;
        }},
        // end-punch4
        { data: 'SitusState', title: 'State', defaultContent: 'NA' },
        { title: 'Address',data: 'address', defaultContent: 'NA' },
        {
          // data: 'LMSSalePrice', title: 'Market Value', defaultContent: '-', className: 'text-right', render: function (data, type, row) {
            data: 'EstimatedValue', title: 'Market Value', defaultContent: '-', className: 'text-right', render: function (data, type, row) {//punch2
            return formatter.format(data) //punch2
          }
        },          
        
        { data: 'email', title: 'Email', defaultContent: '', visible: false },
        { data: 'phone', title: 'Phone', defaultContent: '', visible: false },
        { data: 'Owner1FirstName', title: 'Owner1 First Name', defaultContent: '', visible: false },
        { data: 'Owner1FirstName', title: 'Owner1 First Name', defaultContent: '', visible: false },
        { data: 'OwnerLastname1', title: 'Owner1 Last Name', defaultContent: '', visible: false },
        { data: 'Owner1Type', title: 'Owner1 Type', defaultContent: '', visible: false },
        { data: 'Owner1PropertiesOwned', title: 'Owner1 Properties Owned', defaultContent: '', visible: false },
        { data: 'Owner2FirstName', title: 'Owner2 First Name', defaultContent: '', visible: false },
        { data: 'OwnerLastname2', title: 'Owner2 Last Name', defaultContent: '', visible: false },
        { data: 'Owner2Type', title: 'Owner2 Type', defaultContent: '', visible: false },
        { data: 'OwnerRelationshipType', title: 'Owner Relationship Type', defaultContent: '', visible: false },
        { data: 'OwnerRightsVestingCode', title: 'Owner Rights Vesting Code', defaultContent: '', visible: false },
        { data: 'OwnerStatus', title: 'Owner Status', defaultContent: '', visible: false },
        { data: 'DoNotMail', title: 'Do Not Mail', defaultContent: '', visible: false },
        { data: 'County', title: 'County', defaultContent: '', visible: false },
        { data: 'MailHouseNumber', title: 'Mail House Number', defaultContent: '', visible: false },
        { data: 'MailDirection', title: 'Mail Direction', defaultContent: '', visible: false },
        { data: 'MailPostDirection', title: 'Mail Post Direction', defaultContent: '', visible: false },
        { data: 'MailStreetName', title: 'Mail Street Name', defaultContent: '', visible: false },
        { data: 'MailStreetNameSuffix', title: 'Mail Street Name Suffix', defaultContent: '', visible: false },
        { data: 'MailUnitNumber', title: 'Mail Unit Number', defaultContent: '', visible: false },
        { data: 'MailCity', title: 'Mail City', defaultContent: '', visible: false },
        { data: 'MailState', title: 'Mail State', defaultContent: '', visible: false },
        { data: 'MailZZIP9', title: 'MAIL ZIP/ZIP+4', defaultContent: '', visible: false },
        { data: 'LegalDescription', title: 'Legal Description', defaultContent: '', visible: false },
        { data: 'APNFormatted', title: 'APN Formatted', defaultContent: '', visible: false },
        { data: 'OpportunityZone', title: 'Opportunity Zone', defaultContent: '', visible: false },
        { data: 'Latitude', title: 'Latitude', defaultContent: '', visible: false },
        { data: 'Longitude', title: 'Longitude', defaultContent: '', visible: false },
        { data: 'Subdivision', title: 'Subdivision', defaultContent: '', visible: false },
        { data: 'NeighborhoodName', title: 'Neighborhood Name', defaultContent: '', visible: false },
        { data: 'GrossLivingArea', title: 'Gross Living Area', defaultContent: '', visible: false },
        { data: 'YearBuiltEffective', title: 'Year Built (Effective)', defaultContent: '', visible: false },
        { data: 'SumOfBedRooms', title: 'No. Of BedRooms', defaultContent: '', visible: false },
        { data: 'FullBaths', title: 'Baths/Restrooms (Full)', defaultContent: '', visible: false },
        { data: 'HalfBaths', title: 'Baths/Restrooms (Half)', defaultContent: '', visible: false },
        { data: 'Pool', title: 'Pool', defaultContent: '', visible: false },
        { data: 'GarageType', title: 'Garage Type', defaultContent: '', visible: false },
        { data: 'HomeEquityValue', title: 'Home Equity Value', defaultContent: '', visible: false },
        { data: 'HomeEquityPercentage', title: 'Home Equity Percentage', defaultContent: '', visible: false },
        { data: 'EstimatedValue', title: 'Estimated Value', defaultContent: '', visible: false },
        { data: 'LandUse', title: 'Land Use', defaultContent: '', visible: false },
        { data: 'Zoning', title: 'Zoning', defaultContent: '', visible: false },
        { data: 'ACRES', title: 'Acres', defaultContent: '', visible: false },
        { data: 'TaxYear', title: 'Tax Year', defaultContent: '', visible: false },
        { data: 'ExemptDisabled', title: 'Exempt Disabled', defaultContent: '', visible: false },
        { data: 'ExemptHomestead', title: 'Exempt Homestead', defaultContent: '', visible: false },
        { data: 'ExemptSenior', title: 'ExemptSenior', defaultContent: '', visible: false },
        { data: 'ExemptVeteran', title: 'Exempt Veteran', defaultContent: '', visible: false },
        { data: 'ExemptWidow', title: 'Exempt Widow', defaultContent: '', visible: false },
        { data: 'AssdTotalValue', title: 'Assessed Total Value', defaultContent: '', visible: false },
        { data: 'AssdLandValue', title: 'Assessed Land Value', defaultContent: '', visible: false },
        { data: 'MktTotalValue', title: 'Market Total Value', defaultContent: '', visible: false },
        { data: 'MktLandValue', title: 'Market Land Value', defaultContent: '', visible: false },
        { data: 'PropertyTax', title: 'Property Tax', defaultContent: '', visible: false },
        { data: 'TotalValueTaxable', title: 'Total Value Taxable', defaultContent: '', visible: false },
        { data: 'DelinquentTaxYear', title: 'Delinquent Tax Year', defaultContent: '', visible: false },
        { data: 'ElementarySchool', title: 'Elementary School', defaultContent: '', visible: false },
        { data: 'MiddleSchool', title: 'Middle School', defaultContent: '', visible: false },
        { data: 'HighSchool', title: 'HighSchool', defaultContent: '', visible: false },
        { data: 'LMSSaleDate', title: 'LMS Sale Date', defaultContent: '', visible: false },
        { data: 'LMSRecordingDate', title: 'LMS Recording Date', defaultContent: '', visible: false },
        { data: 'LMSDeedType', title: 'LMS Deed Type', defaultContent: '', visible: false },
        { data: 'LMSFirstMtgAmount', title: 'LMS 1st MTG Amount', defaultContent: '', visible: false },
        { data: 'LMSFirstMtgType', title: 'LMS 1st MTG Type', defaultContent: '', visible: false },
        { data: 'LMSLender', title: 'LMS Lender', defaultContent: '', visible: false },
        { data: 'LMSFirstMtgIntRate', title: 'LMS 1st MTG Int Rate', defaultContent: '', visible: false },
        { data: 'LMSFirstMtgIntRateType', title: 'LMS 1st MTG Int Rate Type', defaultContent: '', visible: false },
        { data: 'LMSSecondMtgAmount', title: 'LMS 2nd MTG Amount', defaultContent: '', visible: false },
        { data: 'LMSSecondMtgType', title: 'LMS 2nd MTG Type', defaultContent: '', visible: false },
        { data: 'OTSaleDate', title: 'OT Sale Date', defaultContent: '', visible: false },
        { data: 'OTRecordingDate', title: 'OT Recording Date', defaultContent: '', visible: false },
        { data: 'OTSalePrice', title: 'OT Sale Price', defaultContent: '', visible: false },
        { data: 'OTDeedType', title: 'OT Deed Type', defaultContent: '', visible: false },
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        const self = this;
        var rowId = data.prop_id;

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

    let prpertyId = $('#' + data.prop_id);
    prpertyId.addClass("selected");

    var rows = $("#prospectTbl").DataTable().rows().nodes();
    var td = $("#" + data.prop_id);
    var chkBox = td.eq(0).find('input');
    var isChecked = $('input[id=' + data.prop_id + ']').prop('checked');

    if (isChecked == true) {
       // excel selected start
    //   this.data.data.map((item)=>{
    //     if(data.prop_id == item.prop_id ){
    //       this.all_rows_selected_excel.push(item)
    //       console.log(this.all_rows_selected_excel,'all_rows_selected_excel')
    //     }
    // })
     // excel selected end
      this.rows_selected.push(data.prop_id);
      this.all_rows_selected_excel.push(data);
      this.rows_selected = [...new Set(this.rows_selected)];
      this.all_rows_selected_excel = [...new Set(this.all_rows_selected_excel)];
      console.log(this.rows_selected)
    } else {
       // excel selected start
    //   this.data.data.map((item)=>{
    //     if(data.prop_id == item.prop_id){
    //       this.all_rows_selected_excel.pop(item)
    //       console.log(this.all_rows_selected_excel,'all_rows_selected_excel')
    //     }
    // })
     // excel selected end
     this.rows_selected = this.rows_selected.filter(function(e) { return e !== data.id })
      // this.rows_selected.pop(data.prop_id);

      for(let i = 0; i < this.all_rows_selected_excel.length; i++) {
        if(this.all_rows_selected_excel[i].prop_id == data.id)
        {
          this.all_rows_selected_excel.splice(i,1);
        }
      }
      // this.all_rows_selected_excel.pop(data);
      this.rows_selected = [...new Set(this.rows_selected)];
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
    this.authService.getAllPurchaseLeads(this.actRouter.params['value'].id)
    // this.authService.getPurchaseRecords( {dataTablesParameters} )
      .subscribe((data) => {
        this.exlTableData = data;
        if(this.rows_selected.length>0){
        // if(this.rows_selected.length>0){
        //   const expData=[]
        //   this.exlTableData.map((item)=>{
        //       if(this.rows_selected.includes(item.prop_id)){
        //         expData.push(item)
        //       }
        //   })
          // this.excelService.exportAsExcelFile(expData, 'PurchaseRecordExport');
          this.excelService.exportAsExcelFile(this.all_rows_selected_excel, 'PurchaseRecordExport');
        } else {
          this.excelService.exportAsExcelFile(this.exlTableData, 'PurchaseRecordExport');
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
      dtInstance.draw(false);
    });
    const tra = { id: parseInt(info.id) }
    this.authService.pushTrash(tra).subscribe((data) => {
      //this.router.navigate(['/customer/trash']);
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
            batchdata.total_amount=batchdata.full_amount.toFixed(2)
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
              batchdata.total_amount=batchdata.full_amount.toFixed(2)
              modalRef.componentInstance.type = 'wallet recharge';
              modalRef.componentInstance.data = batchdata;
              
              // modalRef.result.then((result) => {
              //   if(result === 'Cross click') { this.proceedLoader = false; return; }
              //   this.batchPayment(batchdata,arg2);

              // }, (reason) => {
              //   this.proceedLoader = false;
              //   console.log('reason ', reason);
              // });
            
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
              <p><b>$${batchdata.full_amount.toFixed(2)}</b></p>
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
              <p><b>$${batchdata.full_amount.toFixed(2)}</b></p>
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
        for(let i = 0; i < this.rows_selected.length; i++) {
          if(this.rows_selected[i] == element.prop_id)
          {
            this.rows_selected.splice(i,1);
          }
        }

        for(let i = 0; i < this.all_rows_selected_excel.length; i++) {
          if(this.all_rows_selected_excel[i].prop_id == element.prop_id)
          {
            this.all_rows_selected_excel.splice(i,1);
          }
        }
        console.log(this.rows_selected, 'uncheck all1')
        console.log(this.all_rows_selected_excel, 'uncheck all2')

      })
    } else {

     // $("#hiddenBtn").val("true");
      var rows = $("#prospectTbl").DataTable().rows().nodes();
      $(rows).find('td:first-child input:checkbox').prop("checked", true);
      this.checkText = "Uncheck All";
      this.data.data.forEach((element) => {
        let checkPushedOrNot = this.checkedPropertyId.filter(x => x == element.prop_id);
        if (checkPushedOrNot.length == 0) {
          this.rows_selected.push(element.prop_id);
          this.rows_selected = [...new Set(this.rows_selected)];
          // this.all_rows_selected.push(element.prop_id);
          this.all_rows_selected_excel.push(element);
          this.all_rows_selected_excel = [...new Set(this.all_rows_selected_excel)];
          console.log(this.rows_selected,'rows_selected')
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
        this.authService.emailMarketingData(this.rows_selected.join(),'email', 'datatree').subscribe(data=>{
          const modalRef = this.modal.open(EmailStatusComponent, { size: 'lg' });
          modalRef.componentInstance.data = data.data;
          modalRef.componentInstance.rows = this.rows_selected.join();
        })
      }
      else if(arg==2){
        this.authService.emailMarketingData(this.rows_selected.join(),'phone', 'datatree').subscribe(data=>{
          console.log(data)
          const modalRef = this.modal.open(SmsStatusComponent, { size: 'lg' });
          modalRef.componentInstance.data = data.data;
          modalRef.componentInstance.rows = this.rows_selected.join();
        })
      }
      else if(arg===3){
        this.authService.emailMarketingData(this.rows_selected.join(),'postcard','datatree').subscribe(data=>{
          const modalRef = this.modal.open(PostcardStatusComponent, { size: 'lg' });
          modalRef.componentInstance.data = data.data;
          modalRef.componentInstance.type = 'datatree';
          modalRef.componentInstance.rows = this.rows_selected.join();
        })
      }
    }
    
  }

  resetFilters() {
    this.filter = false;
    this.filterObj.Owner1FirstName = '';
    this.filterObj.OwnerLastname1 = '';
    this.filterObj.SitusCity = '';
    this.filterObj.status = null;  
    this.filterObj.phone = '';
    this.filterObj.email = '';
    this.filterObj.SitusZipCode = '';
    this.filterObj.SitusState = '';
   
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
      this.manageGrid.gridSelect = 11; 
      const gridData={
        gridCol: data.gridCol,
        gridColName:  data.gridColName,
        gridSelect: 11,
        gridsStatus: data.gridsStatus,
        type: 3
      }

      this.authService.setGridList(gridData).subscribe((data)=>{ 
        this.toastr.success("Grids saved successfully", 'Success!');   
      })
      that.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {   
        for( var i:number=0 ; i < 11; i++ ) {
          dtInstance.column(i).visible( true, true );
        }
        dtInstance['colReorder'].order([0,...this.manageGrid.gridCol.concat(this.con)],true);
        for( var i:number=1 ; i < 11; i++ ) {
          dtInstance.column(i).visible( data.gridsStatus[i-1], true );
        }
        dtInstance.columns.adjust().draw( false );    
      });
    } else if(data.type===1){
      const gridDefault=new ManageGrid()
      this.manageGrid.gridsStatus = gridDefault.gridsStatus;
      this.manageGrid.gridCol = gridDefault.gridCol;
      this.manageGrid.gridColName = gridDefault.gridColName; 
      this.manageGrid.gridSelect = 11; 
      const gridData={
        gridCol: gridDefault.gridCol,
        gridColName:  gridDefault.gridColName,
        gridSelect: 11,
        gridsStatus: gridDefault.gridsStatus,
        type: 3
      }

      this.authService.setGridList(gridData).subscribe((data)=>{ 
        this.toastr.success("Grids saved successfully", 'Success!');   
      })
      that.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {   
        for( var i:number=0 ; i < 11; i++ ) {
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
    this.filter = true;
    $('#prospectTbl').DataTable().ajax.reload();
}

}



