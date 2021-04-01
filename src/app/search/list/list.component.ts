import { Component, OnInit, ViewEncapsulation,ViewChild,AfterViewInit,OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {FormBuilder, Validators, FormArray,FormGroup  } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { error } from 'protractor';

class Person {
  id: number;
  firstName: string;
  lastName: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


class Action {
  id:number;
  status:number;
}

class SearchCount{
  count:number;
}


class Selection {
  state:any;
  countySelect:string;
  county:any[];
  land:any[];
  exemption:any[];
  occupancy:any[];
  saleSelect:string;
  salesFrom:any;
  salesTo:any;
  mortgageAmountSelect:string;
  mortgageAmountFrom:string;  
  mortgageAmountTo:string;
  mortgageRecordingDate:string;
  mortgageRecordingFrom:any;
  mortgageRecordingTo:any;  
  mortgageType:any[];
  mortgageInterestStatus:string; 
  mortgageInterestFrom:string; 
  mortgageInterestTo:string;
  maxOpenLien:any[]; 
  equityStatus:string;
  equityFrom:string;
  equityTo:string;
  listingStatus:any[];
  listingPriceStatus:string;
  listingPriceFrom:string;
  listingPriceTo:string;
  forclosureStatus:any;
  forclosureDateStatus:string;
  forclosureDateFrom:any;
  forclosureDateTo:any;
  forclosureAmountStatus:string;
  forclosureAmountFrom:string;
  forclosureAmountTo:string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ListComponent implements  OnInit {
  d = new Date();
  maxDate = { year: this.d.getFullYear(), month: (this.d.getMonth()+1), day: this.d.getDate() };
  countError:boolean=false;

  saleDateError:boolean=false
  openAmountError:boolean=false
  openDateError:boolean=false
  openInterestError:boolean=false
  equityError:boolean=false
  listingError:boolean=false
  forDateError:boolean=false
  forAmountError:boolean=false

  myForm:any;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  selection=new Selection();
  SearchCount=new SearchCount();
  dtOptions={}
  data:any=[];
  kicks:any[];
  state:any[];
  county:any[];
  title = 'angulardatatables';
  submit:boolean=false;
  action= new Action()
  model: NgbDateStruct;
  date: {year: number, month: number};


  searchForm:FormGroup;

  constructor(private authService:AuthService,private router:Router,private calendar: NgbCalendar,private fb:FormBuilder,private toastr: ToastrService){

    this.searchForm=this.fb.group({
      county:[''],
      state:[' '],
      land:[''],
      landRValue:[''],
      landCValue:[''],
      ownerEValue:[''],
      ownerOValue:[''],
      salesFrom:[''],
      salesTo:[''],
      OpenAmountFrom:[''],
      OpenAmountTo:[''],
      MortgageFrom:[''],
      MortgageTo:[''],
      MortgageType:[''], 
      MortgageInterestFrom:[''],
      MortgageInterestTo:[''],
      MortgageMax:[''],
      EquityFrom:[''],
      EquityTo:[''],
      ListingStatus:[''],
      ListingAmountFrom:[''],
      ListingAmountTo:[''],
      ForeclosureStatus:[''],
      ForeclosureFrom:[{value:'',disabled:true}],
      ForeclosureTo:[{value:'',disabled:true}],
      ForeclosureAmountFrom:[{value:'',disabled:true}],
      ForeclosureAmountTo:[{value:'',disabled:true}],
    })

    
    this.selection.countySelect='is'
    this.selection.saleSelect='is between'
    this.selection.mortgageAmountSelect='is between'
    this.selection.mortgageRecordingDate='is between'
    this.selection.mortgageInterestStatus='is between'
    this.selection.equityStatus='is between'
    this.selection.listingPriceStatus='is between'
    this.selection.forclosureDateStatus='is between'
    this.selection.forclosureAmountStatus='is between'
    this.SearchCount.count=0;
    this.authService.getState()
    .subscribe(data=>{
        this.state=data.data
    },error=>{

    })

  }

  changeState(arg){
    var indexSel = arg.target.selectedIndex;
    var label = arg.srcElement[indexSel].label;
    var value = arg.srcElement[indexSel].value;
    this.selection.state={val:value,text:label}

    this.authService.getCounty(value)
    .subscribe(data=>{
      this.county=data.data
    })

  }

  changeCounty(arg){
    console.log(arg)
  }
  selectToday() {
    this.model = this.calendar.getToday();
  }

  changeCountySelect(arg){
 
    this.selection.countySelect=arg
  }

  changeSale(arg){
    this.selection.saleSelect=arg
  }

  saleFromDate(arg){
    
    this.selection.salesFrom=arg
    if(this.selection.saleSelect!='is'){
      if(this.selection.salesTo==null){
        this.countError=true;
        this.saleDateError=true;
        return
      }
      else if(!arg.before(this.selection.salesTo)){
        this.countError=true;
        this.saleDateError=true;
        return
      }
    }
    this.countError=false;
    this.saleDateError=false;
  }

  changeMortageStatus(arg){
    this.selection.mortgageAmountSelect=arg
  }

  changeMortgageFrom(arg){
    this.selection.mortgageAmountFrom=arg

    if(this.selection.mortgageAmountSelect!='is'){
      if(this.selection.mortgageAmountTo==null){
        this.countError=true;
        this.openAmountError=true;
        return
      }
      else if(arg>this.selection.mortgageAmountTo){
        this.countError=true;
        this.openAmountError=true;
        return
      }
    }
    this.countError=false;
    this.openAmountError=false;

  }
  changeMortgageTo(arg){
    this.selection.mortgageAmountTo=arg
    if(this.selection.mortgageAmountSelect!='is'){
      if(parseInt(arg)<parseInt(this.selection.mortgageAmountFrom)){
        this.countError=true;
        this.openAmountError=true;
        return
      }
    }
    this.countError=false;
    this.openAmountError=false;
  }
  saleToDate(arg){
    this.selection.salesTo=arg
    if(this.selection.saleSelect!='is'){
      if(!arg.after(this.selection.salesFrom)){
        this.countError=true;
        this.saleDateError=true;
        return
      }
    }
    this.countError=false;
    this.saleDateError=false;
  }

  changeMortageDate(arg){
    this.selection.mortgageRecordingDate=arg
  }

  mortgageDateFrom(arg){
    this.selection.mortgageRecordingFrom=arg
    if(this.selection.mortgageRecordingDate!='is'){
      if(this.selection.mortgageRecordingTo==null){
        this.countError=true;
        this.openDateError=true;
        return
      }
      else if(!arg.before(this.selection.mortgageRecordingTo)){
        this.countError=true;
        this.openDateError=true;
        return
      }
    }
    this.countError=false;
    this.openDateError=false;
  }

  mortgageDateTo(arg){
    this.selection.mortgageRecordingTo=arg
    if(this.selection.mortgageRecordingDate!='is'){
      if(!arg.after(this.selection.mortgageRecordingFrom)){
        this.countError=true;
        this.openDateError=true;
        return
      }
    }
    this.countError=false;
    this.openDateError=false;
  }
  
  mortgageInterest(arg){
    this.selection.mortgageInterestStatus=arg
  }

  mortgageInterestFrom(arg){
    this.selection.mortgageInterestFrom=arg

    if(this.selection.mortgageInterestStatus!='is'){
      if(this.selection.mortgageInterestTo==null){
        this.countError=true;
        this.openInterestError=true;
        return
      }
      else if(arg>this.selection.mortgageInterestTo){
        this.countError=true;
        this.openInterestError=true;
        return
      }
    }
    this.countError=false;
    this.openInterestError=false;


  }
  mortgageInterestTo(arg){
    this.selection.mortgageInterestTo=arg
    if(this.selection.mortgageInterestStatus!='is'){
      if(parseInt(arg)<parseInt(this.selection.mortgageInterestFrom)){
        this.countError=true;
        this.openInterestError=true;
        return
      }
    }
    this.countError=false;
    this.openInterestError=false;
  }  

  equityChange(arg){
    this.selection.equityStatus=arg
  }
  equityChangeFrom(arg){
    this.selection.equityFrom=arg
    if(this.selection.equityStatus!='is'){
      if(this.selection.equityTo==null){
        this.countError=true;
        this.equityError=true;
        return
      }
      else if(arg>this.selection.equityTo){
        this.countError=true;
        this.equityError=true;
        return
      }
    }
    this.countError=false;
    this.equityError=false;
    
  }
  equityChangeTo(arg){
    this.selection.equityTo=arg
    if(this.selection.equityStatus!='is'){
      if(parseInt(arg)<parseInt(this.selection.equityFrom)){
        this.countError=true;
        this.equityError=true;
        return
      }
    }
    this.countError=false;
    this.equityError=false;
  }

  listingPriceChange(arg){
    this.selection.listingPriceStatus=arg
  }

  listingPriceFrom(arg){
    this.selection.listingPriceFrom=arg
    if(this.selection.listingPriceStatus!='is'){
      if(this.selection.listingPriceTo==null){
        this.countError=true;
        this.listingError=true;
        return
      }
      else if(arg>this.selection.listingPriceTo){
        this.countError=true;
        this.listingError=true;
        return
      }
    }
    this.countError=false;
    this.listingError=false;
  }
  listingPriceTo(arg){
    this.selection.listingPriceTo=arg
    if(this.selection.listingPriceStatus!='is'){
      if(parseInt(arg)<parseInt(this.selection.listingPriceFrom)){
        this.countError=true;
        this.listingError=true;
        return
      }
    }
    this.countError=false;
    this.listingError=false;
  }

  forclosureStatusChange(arg){
    var indexSel = arg.target.selectedIndex;
    var label = arg.srcElement[indexSel].label;
    var value = arg.srcElement[indexSel].value;
    this.selection.forclosureStatus={val:value,text:label}
    this.searchForm.controls['ForeclosureFrom'].enable()
    this.searchForm.controls['ForeclosureTo'].enable()
    this.searchForm.controls['ForeclosureAmountFrom'].enable()
    this.searchForm.controls['ForeclosureAmountTo'].enable()
  }

  forclosureDateChange(arg){
    this.selection.forclosureDateStatus=arg
  }

  forclosureDateFrom(arg){
    this.selection.forclosureDateFrom=arg
    if(this.selection.forclosureDateStatus!='is'){
      if(this.selection.forclosureDateTo==null){
        this.countError=true;
        this.forDateError=true;
        return
      }
      else if(!arg.before(this.selection.forclosureDateTo)){
        this.countError=true;
        this.forDateError=true;
        return
      }
    }
    this.countError=false;
    this.forDateError=false;


  }
  forclosureDateTo(arg){
    this.selection.forclosureDateTo=arg

    if(this.selection.forclosureDateStatus!='is'){
      if(!arg.after(this.selection.forclosureDateFrom)){
        this.countError=true;
        this.forDateError=true;
        return
      }
    }
    this.countError=false;
    this.forDateError=false;
  }
  forclosureAmountChange(arg){
    this.selection.forclosureAmountStatus=arg
  }

  forclosureAmountFrom(arg){
    this.selection.forclosureAmountFrom=arg
    if(this.selection.forclosureAmountStatus!='is'){
      if(this.selection.forclosureAmountTo==null){
        this.countError=true;
        this.forAmountError=true;
        return
      }
      else if(arg>this.selection.forclosureAmountTo){
        this.countError=true;
        this.forAmountError=true;
        return
      }
    }
    this.countError=false;
    this.forAmountError=false;
  }
  
  forclosureAmountTo(arg){
    this.selection.forclosureAmountTo=arg
    if(this.selection.forclosureAmountStatus!='is'){
      if(parseInt(arg)<parseInt(this.selection.forclosureAmountFrom)){
        this.countError=true;
        this.forAmountError=true;
        return
      }
    }
    this.countError=false;
    this.forAmountError=false;
  }

  forDis(){
    if(this.selection.forclosureStatus==null){
      return true;
    }
    else{
      return false;
    }
  }

//dtOptions: DataTables.Settings = {};
  ngOnInit() {
    const that=this;

    $('#sss').change(function() { 
       console.log('ss')
    });


    $('#multipleSelectExample').select2().on('change', function (e) {
        const county=[];
        $('#multipleSelectExample option:selected').map(function (index,item ) { 
        const val=$(this).val()
        var n = val.match(/'(.*?)'/g).toString();
        var m = n.replace(/'/g,"");
         county.push({val:m,text:$(this).text()})
        })
        that.selection.county=county;

    })

    $('#multipleSelectExample2').select2().on('change', function () {
      const land=[];
      $('#multipleSelectExample2 option:selected').each(function (index,item ) { 
        const val=$(this).val()
        var n = val.match(/'(.*?)'/g).toString();
        var m = n.replace(/'/g,"");
        land.push({val:m,text:$(this).text()})
      })
      that.selection.land=land;

    })

    $('#multipleSelectExample4').select2().on('change', function () {
      const exemption=[];
      $('#multipleSelectExample4 option:selected').each(function (index,item ) { 
        const val=$(this).val()
        var n = val.match(/'(.*?)'/g).toString();
        var m = n.replace(/'/g,"");
        exemption.push({val:m,text:$(this).text()})
      })
      that.selection.exemption=exemption;

    })

    $('#multipleSelectExample5').select2().on('change', function () {
      const occupancy=[];
      $('#multipleSelectExample5 option:selected').each(function (index,item ) { 
        const val=$(this).val()
        var n = val.match(/'(.*?)'/g).toString();
        var m = n.replace(/'/g,"");
        occupancy.push({val:m,text:$(this).text()})
      })
      that.selection.occupancy=occupancy;

    })

    $('#multipleSelectExample14').select2().on('change', function () {
      const type=[];
      $('#multipleSelectExample14 option:selected').each(function (index,item ) {
        const val=$(this).val()
        var n = val.match(/'(.*?)'/g).toString();
        var m = n.replace(/'/g,"");
        type.push({val:m,text:$(this).text()})
      })
      that.selection.mortgageType=type;

    })


    $('#multipleSelectExample15').select2().on('change', function () {
      const lien=[];
      $('#multipleSelectExample15 option:selected').each(function (index,item ) { 
        const val=$(this).val()
        var n = val.match(/'(.*?)'/g).toString();
        var m = n.replace(/'/g,"");
        lien.push({val:m,text:$(this).text()})
      })
      that.selection.maxOpenLien=lien;

    })
    $('#multipleSelectExample16').select2().on('change', function () {
      const listing=[];
      $('#multipleSelectExample16 option:selected').each(function (index,item ) { 
        const val=$(this).val()
        var n = val.match(/'(.*?)'/g).toString();
        var m = n.replace(/'/g,"");
        listing.push({val:m,text:$(this).text()})
      })
      that.selection.listingStatus=listing;

    })


    $('#multipleSelectExample, #multipleSelectExample2, #multipleSelectExample3, #multipleSelectExample4, #multipleSelectExample5, #multipleSelectExample6').select2();
          $('#multipleSelectExample7, #multipleSelectExample8, #multipleSelectExample9, #multipleSelectExample10, #multipleSelectExample11, #multipleSelectExample12').select2();
          $('#multipleSelectExample13, #multipleSelectExample14, #multipleSelectExample15, #multipleSelectExample16, #multipleSelectExample17, #multipleSelectExample18').select2();
          $('#multipleSelectExample19, #multipleSelectExample20, #multipleSelectExample21, #multipleSelectExample22, #multipleSelectExample23, #multipleSelectExample24, #multipleSelectExample25, #multipleSelectExample26, #multipleSelectExample27').select2();
          $('#multipleSelectExample28, #multipleSelectExample29').select2();

    this.authService.getSearchPage()
    .subscribe((data)=>{
      this.kicks=data.data.kicks
    })

  }


submitForm(){
  if(this.countError){
    this.toastr.error('Please Remove Error First!', 'Error!');
    //alert('Please Remove error First');
    return
  }
  this.submit=true;
  this.authService.getCount(this.selection).subscribe(data=>{
    this.SearchCount.count=data.data.MaxResultsCount
    this.submit=false;
    this.myForm=this.selection;
  },error=>{
    this.toastr.error(error, 'Error!');
    console.log(error)
  })
  //console.log(this.selection)
// this.authService.postSearch(this.searchForm.value)
// .subscribe((data)=>{
//   alert(data.message);
//   this.searchForm.reset()
// },(error)=>{
//   alert(error)
// })
// this.submit=false
}



getResult(){
  this.submit=true;
  if(this.SearchCount.count>0 && this.SearchCount.count<=1000){
    this.authService.getResult(this.myForm)
    .subscribe(data=>{
  
      this.router.navigate(['/account/transactions'])

    },error=>{
      console.log(error)
    })
  }
}

}
