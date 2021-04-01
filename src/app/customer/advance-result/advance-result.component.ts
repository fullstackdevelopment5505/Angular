import { Component, OnInit,ViewChild,AfterViewInit,OnDestroy,ViewEncapsulation} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;
import { Subject } from 'rxjs';
import { SearchdataService } from 'src/app/service/searchdata.service';



class Action {
  id:number;
  status:number;
}


@Component({
  selector: 'app-advance-result',
  templateUrl: './advance-result.component.html',
  styleUrls: ['./advance-result.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AdvanceResultComponent implements AfterViewInit, OnDestroy,OnInit {


  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  dtOptions={}
  action= new Action()
  data:any=[];
  title = 'angulardatatables';
  //message:string;
 // purGrpNm = JSON.parse(localStorage.getItem('purGrpNm')); 
  constructor(private authService:AuthService,private router:Router, private adSrData: SearchdataService){

  }
  //dtOptions: DataTables.Settings = {};
  ngOnInit() {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    var colCount:any =[];    
    for(var i=0;i<77;i++){
      if(i<5){
        continue;
      }
      colCount.push(i);
    }
    // this.adSrData.currentSearchData.subscribe(data =>this.data = data);
    console.log(this.data);
    this.dtOptions = {      
      dom: 'lBfrtip',
      responsive: true,      
      buttons: [      
        {
          extend: 'excel',
          text:'<i class="fa fa-file-excel-o" aria-hidden="true"></i>Export to Excel',
          className: 'btn-xs',
          exportOptions: {
              columns: colCount
          }
        }
      ],
      drawCallback: function() {
        var hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
        $('.dt-buttons')[0].style.display = hasRows ? '' : 'none'
      },
      lengthMenu: [
        [20, 40, 60, 80, 100],
        [20, 40, 60, 80, 100]
      ],        
      //data: this.data,
      ajax: (dataTablesParameters: any, callback) => {
        this.authService.getResult(this.data).subscribe(data=>{
          this.data = data.data.data;
          $('#cover-spin').hide(0);
          callback({
            data: data.data.data
          });
        },error=>{
          console.log(error)
        })
      },
      columns: [
      { 
        data: 'address',
        title:'Address',
        render: function (data, type, row) 
        {
          return '<a class="link-list">'+data+'</a>'
        } 
      }, 
      { 
        data: 'amount',
        title:'Amount', className:'text-right', render: function (data, type, row) {
          return formatter.format(data)
        }
      }, 
      {data:'status',title:'Status', visible:false},
      {
      data: 'status',
      title:'Status',
      width:'30%',
      render: function(data ,type, row)
      {
        let bulb=data==1? 'src="assets/images/bulb2.png"' : 'src="assets/images/bulb.png"'
        let fire=data==2? 'src="assets/images/fire2.png"' : 'src="assets/images/fire.png"'
        return '<ul><li> <button class="btn btn-actions bulb"><img '+bulb+' alt=""></button> </li><li><button class="btn btn-actions fire"><img '+fire+' alt=""></button></li><li><button class="btn btn-actions trash"><img src="assets/images/bin.png" alt=""></button></li></ul>'
      }
      },
      {data: 'date',title:'Date & Time', width:'15%' },
      {data:'Owner1FirstName',title:'Owner1 First Name', defaultContent: '', visible:false},
      {data:'OwnerLastname1',title:'Owner1 Last Name', defaultContent: '', visible:false},
      {data:'Owner1Type',title:'Owner1 Type', defaultContent: '', visible:false},
      {data:'Owner1PropertiesOwned',title:'Owner1 Properties Owned', defaultContent: '', visible:false},                  
      {data:'Owner2FirstName',title:'Owner2 First Name', defaultContent: '', visible:false},
      {data:'OwnerLastname2',title:'Owner2 Last Name', defaultContent: '', visible:false},
      {data:'Owner2Type',title:'Owner2 Type', defaultContent: '', visible:false},                 
      {data:'OwnerRelationshipType',title:'Owner Relationship Type', defaultContent: '', visible:false},
      {data:'OwnerRightsVestingCode',title:'Owner Rights Vesting Code', defaultContent: '', visible:false},
      {data:'OwnerStatus',title:'Owner Status', defaultContent: '', visible:false},  
      {data:'DoNotMail',title:'Do Not Mail', defaultContent: '', visible:false},        
      {data:'County',title:'County', defaultContent: '', visible:false},        
      {data:'MailHouseNumber',title:'Mail House Number', defaultContent: '', visible:false},
      {data:'MailDirection',title:'Mail Direction', defaultContent: '', visible:false},
      {data:'MailPostDirection',title:'Mail Post Direction', defaultContent: '', visible:false},
      {data:'MailStreetName',title:'Mail Street Name', defaultContent: '', visible:false},
      {data:'MailStreetNameSuffix',title:'Mail Street Name Suffix', defaultContent: '', visible:false},        
      {data:'MailUnitNumber',title:'Mail Unit Number', defaultContent: '', visible:false},
      {data:'MailCity',title:'Mail City', defaultContent: '', visible:false},
      {data:'MailState',title:'Mail State', defaultContent: '', visible:false},        
      {data:'MailZZIP9',title:'MAIL ZIP/ZIP+4', defaultContent: '', visible:false}, 
      {data:'LegalDescription',title:'Legal Description', defaultContent: '', visible:false},       
      {data:'APNFormatted',title:'APN Formatted', defaultContent: '', visible:false},
      {data:'OpportunityZone',title:'Opportunity Zone', defaultContent: '', visible:false},
      {data:'Latitude',title:'Latitude', defaultContent: '', visible:false},
      {data:'Longitude',title:'Longitude', defaultContent: '', visible:false},        
      {data:'Subdivision',title:'Subdivision', defaultContent: '', visible:false},
      {data:'NeighborhoodName',title:'Neighborhood Name', defaultContent: '', visible:false},
      {data:'GrossLivingArea',title:'Gross Living Area', defaultContent: '', visible:false},     

      {data:'YearBuiltEffective',title:'Year Built (Effective)', defaultContent: '', visible:false},
      {data:'SumOfBedRooms',title:'No. Of BedRooms', defaultContent: '', visible:false},
      {data:'FullBaths',title:'Baths/Restrooms (Full)', defaultContent: '', visible:false},        
      {data:'HalfBaths',title:'Baths/Restrooms (Half)', defaultContent: '', visible:false},  
      {data:'Pool',title:'Pool', defaultContent: '', visible:false},              
      {data:'GarageType',title:'Garage Type', defaultContent: '', visible:false},
      {data:'HomeEquityValue',title:'Home Equity Value', defaultContent: '', visible:false},
      {data:'HomeEquityPercentage',title:'Home Equity Percentage', defaultContent: '', visible:false},
      {data:'EstimatedValue',title:'Estimated Value', defaultContent: '', visible:false},
      {data:'LandUse',title:'Land Use', defaultContent: '', visible:false},
      {data:'Zoning',title:'Zoning', defaultContent: '', visible:false},
      {data:'ACRES',title:'Acres', defaultContent: '', visible:false},
      {data:'TaxYear',title:'Tax Year', defaultContent: '', visible:false},
      {data:'ExemptDisabled',title:'Exempt Disabled', defaultContent: '', visible:false},
      {data:'ExemptHomestead',title:'Exempt Homestead', defaultContent: '', visible:false},
      {data:'ExemptSenior',title:'ExemptSenior', defaultContent: '', visible:false},
      {data:'ExemptVeteran',title:'Exempt Veteran', defaultContent: '', visible:false},
      {data:'ExemptWidow',title:'Exempt Widow', defaultContent: '', visible:false},  
      {data:'AssdTotalValue',title:'Assessed Total Value', defaultContent: '', visible:false},
      {data:'AssdLandValue',title:'Assessed Land Value', defaultContent: '', visible:false},
      {data:'MktTotalValue',title:'Market Total Value', defaultContent: '', visible:false},
      {data:'MktLandValue',title:'Market Land Value', defaultContent: '', visible:false},
      {data:'PropertyTax',title:'Property Tax', defaultContent: '', visible:false},
      {data:'TotalValueTaxable',title:'Total Value Taxable', defaultContent: '', visible:false},
      {data:'DelinquentTaxYear',title:'Delinquent Tax Year', defaultContent: '', visible:false},
      {data:'ElementarySchool',title:'Elementary School', defaultContent: '', visible:false},
      {data:'MiddleSchool',title:'Middle School', defaultContent: '', visible:false},
      {data:'HighSchool',title:'HighSchool', defaultContent: '', visible:false},
      {data:'LMSSaleDate',title:'LMS Sale Date', defaultContent: '', visible:false},
      {data:'LMSRecordingDate',title:'LMS Recording Date', defaultContent: '', visible:false},
      {data:'LMSSalePrice',title:'LMS Sale Price', defaultContent: '', visible:false},
      {data:'LMSDeedType',title:'LMS Deed Type', defaultContent: '', visible:false},
      {data:'LMSFirstMtgAmount',title:'LMS 1st MTG Amount', defaultContent: '', visible:false},
      {data:'LMSFirstMtgType',title:'LMS 1st MTG Type', defaultContent: '', visible:false},
      {data:'LMSLender',title:'LMS Lender', defaultContent: '', visible:false},
      {data:'LMSFirstMtgIntRate',title:'LMS 1st MTG Int Rate', defaultContent: '', visible:false},
      {data:'LMSFirstMtgIntRateType',title:'LMS 1st MTG Int Rate Type', defaultContent: '', visible:false},
      {data:'LMSSecondMtgAmount',title:'LMS 2nd MTG Amount', defaultContent: '', visible:false},
      {data:'LMSSecondMtgType',title:'LMS 2nd MTG Type', defaultContent: '', visible:false},
      {data:'OTSaleDate',title:'OT Sale Date', defaultContent: '', visible:false},
      {data:'OTRecordingDate',title:'OT Recording Date', defaultContent: '', visible:false},         
      {data:'OTSalePrice',title:'OT Sale Price', defaultContent: '', visible:false},   
      {data:'OTDeedType',title:'OT Deed Type', defaultContent: '', visible:false}
    ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td a.link-list', row).unbind('click');
        $('td a.link-list', row).bind('click', () => {
          self.someClickHandler(data);
        });

        $('td .bulb', row).unbind('click');
        $('td .bulb', row).bind('click', () => {
          self.bulb(data,index);
        });

        $('td .fire', row).unbind('click');
        $('td .fire', row).bind('click', () => {
          self.fire(data,index);
        });  

        $('td .trash', row).unbind('click');
        $('td .trash', row).bind('click', () => {
          if(confirm("Are you sure to remove this property from Purchased Records? If yes, you can recover this from Trash anytime :)")) {
            self.trash(data,index);
          }
        });  

        return row;
      }
    };

}

ngAfterViewInit(): void {
  this.dtTrigger.next();
}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}

trash(info:any,index:number):void{
  console.log(info)
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.row('tr:nth('+index+')').remove();
    dtInstance.draw();
  });
  const tra={id:info.prop_id}
this.authService.pushTrash(tra).subscribe((data)=>{
  console.log(data)
},(error)=>{
  console.log(error)
})

}


someClickHandler(info: any): void {
  this.router.navigate(['/customer/property/',info.property_id])
}

bulb(info: any,index:number): void{
  this.action.id=info.prop_id

  ++index
  if(info.status==1){
    let bulb='assets/images/bulb.png'
    let bulb2='assets/images/bulb2.png'
    let fire='assets/images/fire.png'
    let fire2='assets/images/fire2.png'
    let kutte=$('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src');
    if(kutte=='assets/images/bulb2.png'){
      this.action.status=0
      this.authService.postAction(this.action)
      .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb);
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire);
    }
    else{
      this.action.status=1
      this.authService.postAction(this.action)
      .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb2);
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire);
    }
  }
  else{
    let bulb='assets/images/bulb.png'
    let bulb2='assets/images/bulb2.png'

    let fire='assets/images/fire.png'
    let fire2='assets/images/fire2.png'

    let kutte=$('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src');
    if(kutte=='assets/images/bulb2.png'){
      this.action.status=0
      this.authService.postAction(this.action)
      .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb);
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire);
    }
    else{
      this.action.status=1
      this.authService.postAction(this.action)
      .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb2);
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire);
    }

  }
}

fire(info: any,index:number): void{
  this.action.id=info.prop_id
  ++index
  if(info.status==2){
    let bulb='assets/images/bulb.png'
    let bulb2='assets/images/bulb2.png'
    let fire='assets/images/fire.png'
    let fire2='assets/images/fire2.png'
    let kutte=$('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src');
    if(kutte=='assets/images/fire2.png'){
      this.action.status=0
      this.authService.postAction(this.action)
      .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire);
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb);
    }
    else{
      this.action.status=2
      this.authService.postAction(this.action)
      .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire2);
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb);
    }
  }
  else{
    let bulb='assets/images/bulb.png'
    let bulb2='assets/images/bulb2.png'
    let fire='assets/images/fire.png'
    let fire2='assets/images/fire2.png'
    let kutte=$('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src');
    if(kutte=='assets/images/fire2.png'){
      this.action.status=0
      this.authService.postAction(this.action)
      .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire);
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb);
    }
    else{
      this.action.status=2
      this.authService.postAction(this.action)
      .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire2);
      $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb);
    }

  }
}

}
