import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


interface state{
  val?:string;
  text?:string;
}
interface county{
  val?:string;
  text?:string;
}
interface city{
  val?:string;
  text?:string;
}
interface zipcode{
  val?:string;
  text?:string;
}
interface land{
  val?:string;
  text?:string;
}
interface exemption{
  val?:string;
  text?:string;
}
interface occupancy{
  val?:string;
  text?:string;
}
interface salesFrom{
  year?: number
  month?: number
  day?: number
}
interface salesTo{
  year?: number
  month?: number
  day?: number
}
interface mortgageRecordingFrom{
  year?: number
  month?: number
  day?: number
}
interface mortgageRecordingTo{
  year?: number
  month?: number
  day?: number
}
interface mortgageType{
  val?:string;
  text?:string;
}
interface maxOpenLien{
  val?:string;
  text?:string;
}
interface listingStatus{
  val?:string;
  text?:string;
}
interface forclosureStatus{
  val?:string;
  text?:string;
}
interface forclosureDateFrom{
  year?: number
  month?: number
  day?: number
}
interface forclosureDateTo{
  year?: number
  month?: number
  day?: number
}
interface  salectedResult{
  countySelect?: string;
  saleSelect?:string;
  mortgageAmountSelect?:string;
  mortgageRecordingDate?: string;
  mortgageInterestStatus?: string;
  equityStatus?: string;
  listingPriceStatus?: string;
  forclosureDateStatus?:string;
  forclosureAmountStatus?: string;
  state?:state;
  county?:county[];
  citySelect?:string;
  zipSelect?:string;
  city?:city[];
  zipcode?:zipcode;
  land?:land[];
  exemption?:exemption[];
  occupancy?:occupancy[];
  salesFrom:salesFrom;
  salesTo?:salesTo;
  mortgageAmountFrom?:string
  mortgageAmountTo?:string;
  mortgageRecordingFrom?:mortgageRecordingFrom;
  mortgageRecordingTo?:mortgageRecordingTo;
  mortgageType:mortgageType[];
  mortgageInterestFrom?:string;
  mortgageInterestTo?:string;
  maxOpenLien?:maxOpenLien[];
  equityFrom?:string;
  equityTo?:string;
  listingStatus?:listingStatus[];
  listingPriceFrom?:string;
  listingPriceTo?:string;
  forclosureStatus?:forclosureStatus;
  forclosureDateFrom?:forclosureDateFrom;
  forclosureDateTo?:forclosureDateTo;
  forclosureAmountFrom?:string;
  forclosureAmountTo?:string;
}

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss']
})
export class SearchDetailComponent implements OnInit {
  mainData = { 
    state: {}, 
    county:[],
    city:[],
    land:[],
    exemption:[],
    occupancy:[],
    salesFrom:{},
    salesTo:{},
    mortgageRecordingFrom:{},
    mortgageType:[],
    maxOpenLien:[],
    listingStatus:[],
    forclosureStatus:{},
    forclosureDateFrom:{},
    forclosureDateTo:{}
  } as salectedResult;

  constructor(private activated:ActivatedRoute,private authService:AuthService,private router:Router) { 
    console.log(this.activated.params['value'].id)
    $('#cover-spin').show(0);
    this.authService.getSearchResult(this.activated.params['value'].id)
    .subscribe(data=>{
      console.log(data)
      $('#cover-spin').hide(0);
      this.mainData=data;
      // localStorage.setItem('advanceSearchForm', JSON.stringify(data));
    })
  }

  ngOnInit() {
  }
  getMonthName(mon) {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][mon - 1];
  }
  manageGridReset(){
  
  }
  manageGridInit(){
    
  }
  async searchAgain(){
    
    await localStorage.setItem('advanceSearchForm', JSON.stringify(this.mainData));
    this.router.navigate(['/customer/advance'])
  }
}
