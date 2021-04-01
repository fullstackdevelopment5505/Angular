import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
import { NgbDateParserFormatter, NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchdataService } from 'src/app/service/searchdata.service';
import { NgbDateFRParserFormatter } from "../../ngb-date-fr-parser-formatter";
import { ToastrService } from 'ngx-toastr';

import * as filtersConfig from './filters-config.json';

require("inputmask/dist/inputmask/inputmask.numeric.extensions");
var Inputmask = require("inputmask/dist/inputmask/inputmask.date.extensions");
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
  id: number;
  status: number;
}

class SearchCount {
  count: number;
  perPropertyRate: number;
  amountReq() {
    return parseFloat((this.count * this.perPropertyRate).toFixed(2));
  }
}



class Selection {
  state: any;
  countySelect: string;
  county: any[];
  citySelect: string;
  zipSelect: string;
  city: any[];
  zipcode: any;
  zipcodeTo: any;
  landUse: any[];
  exemption: any[];
  occupancy: any[];
  mortgageAmountSelect: string;
  mortgageAmountFrom: string;
  mortgageAmountTo: string;
  mortgageRecordingDate: string;
  mortgageRecordingFrom: any;
  mortgageRecordingTo: any;
  mortgageType: any[];
  mortgageInterestStatus: string;
  mortgageInterestFrom: string;
  mortgageInterestTo: string;
  maxOpenLien: any[];
  listingStatus: any[];
  listingDateStatus: string;
  listingDateFrom: any;
  listingDateTo: any;
  listingPriceStatus: string;
  listingPriceFrom: string;
  listingPriceTo: string;
  foreclosureStatus: any;
  foreclosureDateStatus: string;
  foreclosureDateFrom: any;
  foreclosureDateTo: any;
  foreclosureRecordedDateStatus: string;
  foreclosureRecordedDateFrom: any;
  foreclosureRecordedDateTo: any;
  foreclosureAmountStatus: string;
  foreclosureAmountFrom: string;
  foreclosureAmountTo: string;
  savedTitle: string;
  purchaseGroupName: string;
  ownerFirstNamesSelect: string;
  ownerLastNamesSelect: string;
  ownerNamesSelect: string;
  ownerFirstNames: string;
  ownerLastNames: string;
  ownerNames: string;
  ethnicity: any[];
  corporateOwned: any[];
  doNotMail: any[];
  siteInfluence: any[];
  streetNumberSelect: string;
  streetNumberFrom: string;
  streetNumberTo: string;
  streetDir: any[];
  streetNamesSelect: string;
  streetNames: any[];
  streetTypes: any[];
  streetPostDir: any[];
  unitSelect: string;
  unitFrom: string;
  unitTo: string;
  countyUseCode: string;
  zoningCodeSelect: string;
  zoningCodeFrom: string;
  zoningCodeTo: string;
  yearBuiltSelect: string;
  yearBuiltFrom: string;
  yearBuiltTo: string;
  buildingAreaSquareFeetSelect: string;
  buildingAreaSquareFeetFrom: string;
  buildingAreaSquareFeetTo: string;
  totalNumberOfBedroomsSelect: string;
  totalNumberOfBedroomsFrom: string;
  totalNumberOfBedroomsTo: string;
  totalNumberOfBathroomsSelect: string;
  totalNumberOfBathroomsFrom: string;
  totalNumberOfBathroomsTo: string;
  totalNumberOfRoomsSelect: string;
  totalNumberOfRoomsFrom: string;
  totalNumberOfRoomsTo: string;
  lotAreaSelect: string;
  lotAreaFrom: string;
  lotAreaTo: string;
  lotAcreageSelect: string;
  lotAcreageFrom: string;
  lotAcreageTo: string;
  numberOfStoriesSelect: string;
  numberOfStoriesFrom: string;
  numberOfStoriesTo: string;
  numberOfGarageSpacesSelect: string;
  numberOfGarageSpacesFrom: string;
  numberOfGarageSpacesTo: string;
  numberOfUnitsSelect: string;
  numberOfUnitsFrom: string;
  numberOfUnitsTo: string;
  poolOption: any[];
  transactionType: any[];
  salePriceType: any[];
  recordingMonth: any[];
  salePriceSelect: string;
  salePriceFrom: string;
  salePriceTo: string;
  saleDateSelect: string;
  saleDateFrom: any;
  saleDateTo: any;
  marketSaleRecordingDateSelect: string;
  marketSaleRecordingDateFrom: any;
  marketSaleRecordingDateTo: any;
  sellerNameSelect: string;
  sellerName: string;
  deedType: any[];
  sellerCarryBack: any[];
  financingDeedType: any[];
  interstRateType: any[];
  homeEquityValue: string;
  homeEquityValueFrom: string;
  homeEquityValueTo: string;
  homeEquityPercentage: string;
  homeEquityPercentageFrom: string;
  homeEquityPercentageTo: string;
  assdTotalValue: string;
  assdTotalValueFrom: string;
  assdTotalValueTo: string;
  assdLandValue: string;
  assdLandValueFrom: string;
  assdLandValueTo: string;
  mktTotalValue: string;
  mktTotalValueFrom: string;
  mktTotalValueTo: string;
  mktLandValue: string;
  mktLandValueFrom: string;
  mktLandValueTo: string;
  apprTotalValue: string;
  apprTotalValueFrom: string;
  apprTotalValueTo: string;
  apprLandValue: string;
  apprLandValueFrom: string;
  apprLandValueTo: string;
  apprImprovementValue: string;
  apprImprovementValueFrom: string;
  apprImprovementValueTo: string;
  apprImprovementPercentage: string;
  apprImprovementPercentageFrom: string;
  apprImprovementPercentageTo: string;
  estimatedValue: string;
  estimatedValueFrom: string;
  estimatedValueTo: string;

}
class SelectDefault {
  county: any[];
  city: any[];
  landUse: any[];
  // landRValue:any[];
  // landCValue:any[];
  exemption: any[];
  occupancy: any[];
  mortgageType: any[];
  maxOpenLien: any[];
  listingStatus: any[];
  ethnicity: any[];
  corporateOwned: any[];
  doNotMail: any[];
  siteInfluence: any[];
  streetDir: any[];
  streetNames: any[];
  streetTypes: any[];
  streetPostDir: any[];
  poolOption: any[];
  transactionType: any[];
  salePriceType: any[];
  recordingMonth: any[];
  deedType: any[];
  sellerCarryBack: any[];
  financingDeedType: any[];
  interstRateType: any[];
}
@Component({
  selector: 'app-advance-customer',
  templateUrl: './advance-customer.component.html',
  styleUrls: ['./advance-customer.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class AdvanceCustomerComponent implements OnInit {
  load:number=1;
  selectedCounty = [];
  selectedCity = [];
  selectedLandUse = [];
  selectedExemption = [];
  selectedOccupancy = [];
  selectedMortgageType = [];
  selectedMaxOpenLien = [];
  selectedListingStatus = [];
  selectedEthnicity = [];
  selectedCorporateOwned = [];
  selectedDoNotMail = [];
  selectedStreetDir = [];
  selectedStreetTypes = [];
  selectedStreetPostDir = [];
  selectedSiteInfluence = [];
  selectedPoolOption = [];
  selectedTransactionType = [];
  selectedSalePriceType = [];
  selectedRecordingMonth = [];
  selectedDeedType = [];
  selectedSellerCarryBack = [];
  selectedFinancingDeedType = [];
  selectedInterstRateType = [];

  countyLoading: boolean = false;
  cityLoading: boolean = false;
  advanceSearchFilledForm = JSON.parse(localStorage.getItem('advanceSearchForm'));
  //advanceSearchFilledForm:any = null;
  d = new Date();

  minDate = { year: 1900, month: 1, day: 1 };
  maxDate = {};
  zipError: boolean = false;
  zipToError: boolean = false;
  countError: boolean = false;
  existingMember: boolean;
  modalTitle: string;
  modalContent: string;
  reqAmountInWalletToPur: boolean;
  confirmBoxContent: string;
  confirmBoxTblAmt: any = [50, 100, 200, 500, 1000, 2000];
  confirmBoxReqAmt: number;

  saleDateError: boolean = false
  openAmountError: boolean = false
  openDateError: boolean = false
  openInterestError: boolean = false
  openHomeEquityValueError: boolean = false
  openHomeEquityPercentageError: boolean = false
  listingError: boolean = false
  listingDateError: boolean = false
  forDateError: boolean = false
  foreclosureRecordedDateError: boolean = false
  forAmountError: boolean = false
  openStreetNumberError: boolean = false
  openUnitError: boolean = false
  openZipToError: boolean = false
  openZoningCodeToError: boolean = false
  openYearBuiltToError: boolean = false
  openBuildingAreaSquareFeetToError: boolean = false
  openTotalNumberOfBedroomsToError: boolean = false
  openTotalNumberOfBathroomsToError: boolean = false
  openTotalNumberOfRoomsToError: boolean = false
  openLotAreaToError: boolean = false
  openLotAcreageToError: boolean = false
  openNumberOfStoriesToError: boolean = false
  openNumberOfGarageSpacesToError: boolean = false
  openNumberOfUnitsToError: boolean = false
  openSalePriceToError: boolean = false
  openSaleDateToError: boolean = false
  openMarketSaleRecordingDateToError: boolean = false
  openAssdTotalValueError: boolean = false
  openAssdLandValueError: boolean = false
  openMktTotalValueError: boolean = false
  openMktLandValueError: boolean = false
  openApprTotalValueError: boolean = false
  openApprLandValueError: boolean = false
  openApprImprovementValueError: boolean = false
  openApprImprovementPercentageError: boolean = false
  openEstimatedValueError: boolean = false

  myForm: any;
  selection = new Selection();
  selectDefault = new SelectDefault();
  SearchCount = new SearchCount();

  data: any = [];
  kicks: any[];
  state: any[];
  county: any[];
  city: any[];
  title = 'angulardatatables';
  submit: boolean = false;
  action = new Action()
  model: NgbDateStruct;
  date: { year: number, month: number };

  submitSave: boolean = false;
  closeResult:string
  searchForm: FormGroup;
  saveSearchForm: FormGroup;
  checkForm: FormGroup;
  savedsearchFlag: boolean = false;
  months: any = [];
  years: any = [];
  submitWallet: boolean = false;

  availableEthnicity = filtersConfig.ethnicity;
  availableCorporateOwned = filtersConfig.corporateOwned;
  availableDoNotMail = filtersConfig.doNotMail;
  availableExemption = filtersConfig.exemption;
  availableOwnerOccupied = filtersConfig.ownerOccupied;
  availableStreetDir = filtersConfig.streetDir;
  availableStreetTypes = filtersConfig.streetTypes;
  availableLandUse = filtersConfig.landUse;
  availableSiteInfluence = filtersConfig.siteInfluence;
  availableSalePriceType = filtersConfig.salePriceType;
  availableRecordingMonth = filtersConfig.recordingMonth;
  availableDeedType = filtersConfig.deedType;
  availableMortgageType = filtersConfig.mortgageType;
  availableFinancingDeedType = filtersConfig.financingDeedType;
  availableInterstRateType = filtersConfig.interstRateType;
  availableSellerCarryBack = filtersConfig.sellerCarryBack;


  // result:any=[]
  currentBalance: number;
  depositeForm: FormGroup;
  dtTriggerWallet: Subject<any> = new Subject();
  @ViewChild('content2',{static:false}) private content2;
  constructor(private authService: AuthService, private router: Router, private calendar: NgbCalendar, private fb: FormBuilder, private modalService: NgbModal, private adSrData: SearchdataService, private elRef: ElementRef, private toastr: ToastrService) {

    const yesterday= new Date()
    yesterday.setDate(yesterday.getDate() - 1);
    this.maxDate= {year: this.d.getFullYear(), month: (this.d.getMonth() + 1), day: yesterday.getDate() }

    for (let index = 1; index <= 12; index++) {
      this.months.push(index);
    }
    let year = new Date().getFullYear()
    for (let index = year; index <= (year + 25); index++) {
      this.years.push(index);
    }
    this.searchForm = this.fb.group({
      state: [null],
      countySelect: ['is'],
      county: [''],
      citySelect: ['is'],
      zipSelect: ['is'],
      city: [''],
      zipcode: ['', [Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      zipcodeTo: ['', [Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      landUse: [''],
      // landRValue:[''],
      // landCValue:[''],
      exemption: [''],
      occupancy: [''],
      mortgageAmountSelect: ['is between'],
      mortgageAmountFrom: [''],
      mortgageAmountTo: [''],
      mortgageRecordingDate: ['is between'],
      mortgageRecordingFrom: [''],
      mortgageRecordingTo: [''],
      mortgageType: [''],
      mortgageInterestStatus: ['is between'],
      mortgageInterestFrom: [''],
      mortgageInterestTo: [''],
      maxOpenLien: [''],
      listingStatus: [''],
      listingDateStatus: ['is between'],
      listingDateFrom: [''],
      listingDateTo: [''],
      listingPriceStatus: ['is between'],
      listingPriceFrom: [''],
      listingPriceTo: [''],
      foreclosureStatus: [null],
      foreclosureDateStatus: ['is between'],
      foreclosureDateFrom: [{ value: '', disabled: true }],
      foreclosureDateTo: [{ value: '', disabled: true }],
      foreclosureRecordedDateStatus: ['is between'],
      foreclosureRecordedDateFrom: [{ value: '', disabled: true }],
      foreclosureRecordedDateTo: [{ value: '', disabled: true }],
      foreclosureAmountStatus: ['is between'],
      foreclosureAmountFrom: [{ value: '', disabled: true }],
      foreclosureAmountTo: [{ value: '', disabled: true }],
      savedTitle: [''],
      purchaseGroupName: [''],
      ownerFirstNamesSelect: ['contains'],
      ownerLastNamesSelect: ['is'],
      ownerNamesSelect: ['contains'],
      ownerFirstNames: [''],
      ownerLastNames: [''],
      ownerNames: [''],
      ethnicity: [''],
      corporateOwned: [''],
      doNotMail: [''],
      streetNumberSelect: ['is'],
      streetNumberFrom: [''],
      streetNumberTo: [''],
      streetDir: [''],
      streetNamesSelect: ['is'],
      streetNames: [''],
      streetTypes: [''],
      streetPostDir: [''],
      unitSelect: ['is'],
      unitFrom: [''],
      unitTo: [''],
      siteInfluence: [''],
      countyUseCode: [''],
      zoningCodeSelect: ['is between'],
      zoningCodeFrom: [''],
      zoningCodeTo: [''],
      yearBuiltSelect: ['is between'],
      yearBuiltFrom: [''],
      yearBuiltTo: [''],
      buildingAreaSquareFeetSelect: ['is between'],
      buildingAreaSquareFeetFrom: [''],
      buildingAreaSquareFeetTo: [''],
      totalNumberOfBedroomsSelect: ['is between'],
      totalNumberOfBedroomsFrom: [''],
      totalNumberOfBedroomsTo: [''],
      totalNumberOfBathroomsSelect: ['is between'],
      totalNumberOfBathroomsFrom: [''],
      totalNumberOfBathroomsTo: [''],
      totalNumberOfRoomsSelect: ['is between'],
      totalNumberOfRoomsFrom: [''],
      totalNumberOfRoomsTo: [''],
      lotAreaSelect: ['is between'],
      lotAreaFrom: [''],
      lotAreaTo: [''],
      lotAcreageSelect: ['is between'],
      lotAcreageFrom: [''],
      lotAcreageTo: [''],
      numberOfStoriesSelect: ['is between'],
      numberOfStoriesFrom: [''],
      numberOfStoriesTo: [''],
      numberOfGarageSpacesSelect: ['is between'],
      numberOfGarageSpacesFrom: [''],
      numberOfGarageSpacesTo: [''],
      numberOfUnitsSelect: ['is between'],
      numberOfUnitsFrom: [''],
      numberOfUnitsTo: [''],
      poolOption: [''],
      transactionType: [''],
      salePriceType: [''],
      recordingMonth: [''],
      salePriceSelect: ['is between'],
      salePriceFrom: [''],
      salePriceTo: [''],
      saleDateSelect: ['is between'],
      saleDateFrom: [''],
      saleDateTo: [''],
      marketSaleRecordingDateSelect: ['is between'],
      marketSaleRecordingDateFrom: [''],
      marketSaleRecordingDateTo: [''],
      sellerNameSelect: ['is'],
      sellerName: [''],
      deedType: [''],
      sellerCarryBack: [''],
      financingDeedType: [''],
      interstRateType: [''],
      homeEquityValue: ['is between'],
      homeEquityValueFrom: [''],
      homeEquityValueTo: [''],
      homeEquityPercentage: ['is between'],
      homeEquityPercentageFrom: [''],
      homeEquityPercentageTo: [''],
      assdTotalValue: ['is between'],
      assdTotalValueFrom: [''],
      assdTotalValueTo: [''],
      assdLandValue: ['is between'],
      assdLandValueFrom: [''],
      assdLandValueTo: [''],
      mktTotalValue: ['is between'],
      mktTotalValueFrom: [''],
      mktTotalValueTo: [''],
      mktLandValue: ['is between'],
      mktLandValueFrom: [''],
      mktLandValueTo: [''],
      apprTotalValue: ['is between'],
      apprTotalValueFrom: [''],
      apprTotalValueTo: [''],
      apprLandValue: ['is between'],
      apprLandValueFrom: [''],
      apprLandValueTo: [''],
      apprImprovementValue: ['is between'],
      apprImprovementValueFrom: [''],
      apprImprovementValueTo: [''],
      apprImprovementPercentage: ['is between'],
      apprImprovementPercentageFrom: [''],
      apprImprovementPercentageTo: [''],
      estimatedValue: ['is between'],
      estimatedValueFrom: [''],
      estimatedValueTo: [''],
    })

    this.saveSearchForm = this.fb.group({
      savedTitle: ['', [Validators.maxLength(25)]],
      purchaseGroupName: ['', [Validators.pattern('^([-a-zA-Z0-9_ ])+$'), Validators.maxLength(25)]]
    })

    this.checkForm = this.fb.group({
      saved: ['', [Validators.required]]
    })

    this.selection.countySelect = 'is'
    this.selection.citySelect = 'is'
    this.selection.zipSelect = 'is'
    this.selection.mortgageAmountSelect = 'is between'
    this.selection.mortgageRecordingDate = 'is between'
    this.selection.mortgageInterestStatus = 'is between'
    this.selection.listingDateStatus = 'is between'
    this.selection.listingPriceStatus = 'is between'
    this.selection.foreclosureDateStatus = 'is between'
    this.selection.foreclosureRecordedDateStatus = 'is between'
    this.selection.foreclosureAmountStatus = 'is between'

    this.selection.ownerFirstNamesSelect = 'contains'
    this.selection.ownerLastNamesSelect = 'is'
    this.selection.ownerNamesSelect = 'contains'
    this.selection.streetNumberSelect = 'is'
    this.selection.streetNamesSelect = 'is'
    this.selection.unitSelect = 'is'
    this.selection.zoningCodeSelect = 'is between'
    this.selection.yearBuiltSelect = 'is between'
    this.selection.buildingAreaSquareFeetSelect = 'is between'
    this.selection.totalNumberOfBedroomsSelect = 'is between'
    this.selection.totalNumberOfBathroomsSelect = 'is between'
    this.selection.totalNumberOfRoomsSelect = 'is between'
    this.selection.lotAreaSelect = 'is between'
    this.selection.lotAcreageSelect = 'is between'
    this.selection.numberOfStoriesSelect = 'is between'
    this.selection.numberOfGarageSpacesSelect = 'is between'
    this.selection.numberOfUnitsSelect = 'is between'
    this.selection.salePriceSelect = 'is between'
    this.selection.saleDateSelect = 'is between'
    this.selection.marketSaleRecordingDateSelect = 'is between'
    this.selection.sellerNameSelect = 'is'
    this.selection.homeEquityValue = 'is between'
    this.selection.homeEquityPercentage = 'is between'
    this.selection.assdTotalValue = 'is between'
    this.selection.assdLandValue = 'is between'
    this.selection.mktTotalValue = 'is between'
    this.selection.mktLandValue = 'is between'
    this.selection.apprTotalValue = 'is between'
    this.selection.apprLandValue = 'is between'
    this.selection.apprImprovementValue = 'is between'
    this.selection.apprImprovementPercentage = 'is between'
    this.selection.estimatedValue = 'is between'

    this.SearchCount.count = 0;
    this.authService.getState()
      .subscribe(data => {
        this.state = data.data
      }, error => {

      })
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      // alert('Closed with:' + result)// this.closeResult = `Closed with: ${result}`;
      if (result == 'Submit') {
        this.submitSave = true;
        if (this.saveSearchForm.status == 'VALID') {
          this.savedsearchFlag = true;
        }
        this.submitSave = false;
        this.saveSearchForm.reset();
      }
    }, (reason) => {
      this.submitSave = false;
      this.saveSearchForm.reset();
    });
    /* if(content._def.references.hasOwnProperty('confirmModal')){
       this.getResult();
     }*/
  }

  changeState(arg) {
    this.countyLoading = true;
    this.cityLoading = true;
    $('[formControlName="county"]').addClass('selectLoading');
    $('[formControlName="city"]').addClass('selectLoading');
    var indexSel = arg.target.selectedIndex;
    var label = arg.srcElement[indexSel].label;
    var value = arg.srcElement[indexSel].value;
    this.selection.state = { val: value, text: label };
    this.selectedCounty = [];
    this.selection.county = [];
    this.setCounty(value);
    this.selectedCity = [];
    this.selection.city = [];
    this.city = undefined;
    this.setCity(value);
  }

  setCounty(value) {
    this.authService.getCounty(value)
      .subscribe(data => {
        this.county = data.data;
        this.countyLoading = false;
        $('[formControlName="county"]').removeClass('selectLoading');
      })
  }
  setCity(value) {
    this.authService.getCity(value).subscribe(data => {
      this.city = data.data;
      this.cityLoading = false;
      $('[formControlName="city"]').removeClass('selectLoading');
      $('#cover-spin').hide(0);
    })
  }
  setCityByCounty(value) {
    this.authService.getCityByCounty(this.selection.state.val + ',' + value).subscribe(data => {
      this.city = data.data;
      this.cityLoading = false;
      $('[formControlName="city"]').removeClass('selectLoading');
    },error=>{
      $('[formControlName="city"]').removeClass('selectLoading');
      this.cityLoading = false;
    })
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  changeCounty(arg) {
    //console.log(arg)
    this.cityLoading = true;
    $('[formControlName="city"]').addClass('selectLoading');
    const county = [];
    let arr: any = [];
    for (let i: number = 0; i < arg.length; i++) {
      county.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
      arr.push(arg[i].split(/_(.+)/)[1]);
    }
    this.selection.county = county;
    this.selectedCity = [];
    this.selection.city = [];
    this.city = undefined;
    this.setCityByCounty(arr.toString());
  }
  changeCity(arg) {
    //console.log(arg)
    const city = [];
    for (let i: number = 0; i < arg.length; i++) {
      city.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }
    this.selection.city = city;
  }
  changeZip(arg) {
    this.zipError = false;
    var num = arg.replace(/\D/g, "");
    if (num.length == 9) {
      arg = num.substr(0, 5) + '-' + num.substr(5);
      this.searchForm.patchValue({ 'zipcode': arg });
    }
    // if(num.length==10){
    //   arg = num.substr(0,5)+','+num.substr(5);
    //   this.searchForm.patchValue({ 'zipcode': arg});
    // }
    // if(num.length>10){
    //   arg = num.substr(0,5)+'-'+num.substr(5,4)+','+num.substr(10);
    //   this.searchForm.patchValue({ 'zipcode': arg});
    // }
    this.selection.zipcode = arg;

    if (this.selection.zipSelect == 'is between') {
      if (!this.validateAmount(this.selection.zipcode, this.selection.zipcodeTo)) {
        this.countError = true;
        this.openZipToError = true;
        return;
      }
    }

    this.countError = false;
    this.openZipToError = false;
  }
  changeZipTo(arg) {
    this.zipToError = false;
    var num = arg.replace(/\D/g, "");
    if (num.length == 9) {
      arg = num.substr(0, 5) + '-' + num.substr(5);
      this.searchForm.patchValue({ 'zipcodeTo': arg });
    }

    this.selection.zipcodeTo = arg;

    if (this.selection.zipSelect == 'is between') {
      if (!this.validateAmount(this.selection.zipcode, this.selection.zipcodeTo)) {
        this.countError = true;
        this.openZipToError = true;
        return;
      }
    }

    this.countError = false;
    this.openZipToError = false;
  }
  changeLandUse(arg) {
    const landUse = [];
    for (let i: number = 0; i < arg.length; i++) {
      landUse.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }
    this.selection.landUse = landUse;
  }
  changeExemption(arg) {
    const exemption = [];
    for (let i: number = 0; i < arg.length; i++) {
      exemption.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }
    this.selection.exemption = exemption;

  }
  changeOccupancy(arg) {

    const occupancy = [];
    for (let i: number = 0; i < arg.length; i++) {
      occupancy.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }
    this.selection.occupancy = occupancy;
  }

  changeMortgageType(arg) {

    const mortgageType = [];
    for (let i: number = 0; i < arg.length; i++) {
      mortgageType.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }
    this.selection.mortgageType = mortgageType;
  }

  changeMortgageMax(arg) {

    const mortgageMax = [];
    for (let i: number = 0; i < arg.length; i++) {
      mortgageMax.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }
    this.selection.maxOpenLien = mortgageMax;
  }

  changeListingStatus(arg) {
    const listingStatus = [];
    for (let i: number = 0; i < arg.length; i++) {
      listingStatus.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }
    this.selection.listingStatus = listingStatus;
  }
  selectToday() {
    this.model = this.calendar.getToday();
  }

  changeCountySelect(arg) {

    this.selection.countySelect = arg
  }

  changeCitySelect(arg) {

    this.selection.citySelect = arg
  }
  changeZipSelect(arg) {

    this.selection.zipSelect = arg
  }

  changeMortageStatus(arg) {
    this.selection.mortgageAmountSelect = arg
  }

  changeMortgageFrom(arg) {
    this.selection.mortgageAmountFrom = arg

    if (this.selection.mortgageAmountSelect != 'is') {
      if (!this.validateAmount(this.selection.mortgageAmountFrom, this.selection.mortgageAmountTo)) {
        this.countError = true;
        this.openAmountError = true;
        return;
      }
    }
    this.countError = false;
    this.openAmountError = false;

  }
  changeMortgageTo(arg) {
    this.selection.mortgageAmountTo = arg
    if (this.selection.mortgageAmountSelect != 'is') {
      if (!this.validateAmount(this.selection.mortgageAmountFrom, this.selection.mortgageAmountTo)) {
        this.countError = true;
        this.openAmountError = true;
        return;
      }
    }
    this.countError = false;
    this.openAmountError = false;
  }
  changeMortageDate(arg) {
    this.selection.mortgageRecordingDate = arg
  }

  mortgageDateFrom(arg) {
    if (typeof arg == 'object') {
        this.selection.mortgageRecordingFrom = arg;
    } else {
        const date = new Date(arg);
        this.selection.mortgageRecordingFrom = {year: date.getFullYear(), month: (date.getMonth() + 1), day: date.getDate()};
    }

    if (this.selection.mortgageRecordingDate == 'is between') {
      if (!this.validateDate(arg, this.selection.mortgageRecordingTo)) {
        this.countError = true;
        this.openDateError = true;
        return;
      }
    }
    this.countError = false;
    this.openDateError = false;
  }

  mortgageDateTo(arg) {
    if (typeof arg == 'object') {
        this.selection.mortgageRecordingTo = arg;
    } else {
        const date = new Date(arg);
        this.selection.mortgageRecordingTo = {year: date.getFullYear(), month: (date.getMonth() + 1), day: date.getDate()};
    }

    if (this.selection.mortgageRecordingDate == 'is between') {
      if (!this.validateDate(this.selection.mortgageRecordingFrom, arg)) {
        this.countError = true;
        this.openDateError = true;
        return;
      }
    }
    this.countError = false;
    this.openDateError = false;
  }

  mortgageInterest(arg) {
    this.selection.mortgageInterestStatus = arg
  }

  changeMortgageInterestFrom(arg) {
    this.selection.mortgageInterestFrom = arg

    if (this.selection.mortgageInterestStatus != 'is') {
      if (!this.validateAmount(this.selection.mortgageInterestFrom, this.selection.mortgageInterestTo)) {
        this.countError = true;
        this.openInterestError = true;
        return;
      }
    }
    this.countError = false;
    this.openInterestError = false;


  }
  changeMortgageInterestTo(arg) {
    this.selection.mortgageInterestTo = arg
    if (this.selection.mortgageInterestStatus != 'is') {
      if (!this.validateAmount(this.selection.mortgageInterestFrom, this.selection.mortgageInterestTo)) {
        this.countError = true;
        this.openInterestError = true;
        return;
      }
    }
    this.countError = false;
    this.openInterestError = false;
  }

  listingDateChange(arg) {
    this.selection.listingDateStatus = arg
  }

  listingDateChangeFrom(arg) {
    this.selection.listingDateFrom = arg
    if (this.selection.listingDateStatus != 'is') {
      if (!this.validateDate(arg, this.selection.listingDateTo)) {
        this.countError = true;
        this.listingDateError = true;
        return;
      }
    }
    this.countError = false;
    this.listingDateError = false;


  }
  listingDateChangeTo(arg) {
    this.selection.listingDateTo = arg

    if (this.selection.listingDateStatus != 'is') {
      if (!this.validateDate(this.selection.listingDateFrom, arg)) {
        this.countError = true;
        this.listingDateError = true;
        return;
      }
    }
    this.countError = false;
    this.listingDateError = false;
  }

  listingPriceChange(arg) {
    this.selection.listingPriceStatus = arg
  }

  listingPriceChangeFrom(arg) {
    this.selection.listingPriceFrom = arg
    if (this.selection.listingPriceStatus != 'is') {
      if (!this.validateAmount(this.selection.listingPriceFrom, this.selection.listingPriceTo)) {
        this.countError = true;
        this.listingError = true;
        return;
      }
    }
    this.countError = false;
    this.listingError = false;
  }
  listingPriceChangeTo(arg) {
    this.selection.listingPriceTo = arg
    if (this.selection.listingPriceStatus != 'is') {
      if (!this.validateAmount(this.selection.listingPriceFrom, this.selection.listingPriceTo)) {
        this.countError = true;
        this.listingError = true;
        return;
      }
    }
    this.countError = false;
    this.listingError = false;
  }

  foreclosureStatusChange(arg) {
    var indexSel = arg.target.selectedIndex;
    if (indexSel == 0) {
      this.selection.foreclosureStatus = null
      this.searchForm.patchValue({
        foreclosureDateFrom: [''],
        foreclosureDateTo: [''],
        foreclosureRecordedDateFrom: [''],
        foreclosureRecordedDateTo: [''],
        foreclosureAmountFrom: [''],
        foreclosureAmountTo: ['']
      })
      this.selection.foreclosureDateFrom = ''
      this.selection.foreclosureDateTo = ''
      this.selection.foreclosureRecordedDateFrom = ''
      this.selection.foreclosureRecordedDateTo = ''
      this.selection.foreclosureAmountFrom = ''
      this.selection.foreclosureAmountTo = ''
      this.searchForm.controls['foreclosureDateFrom'].disable()
      this.searchForm.controls['foreclosureDateTo'].disable()
      this.searchForm.controls['foreclosureRecordedDateFrom'].disable()
      this.searchForm.controls['foreclosureRecordedDateTo'].disable()
      this.searchForm.controls['foreclosureAmountFrom'].disable()
      this.searchForm.controls['foreclosureAmountTo'].disable()
    } else {
      var label = arg.srcElement[indexSel].label;
      var value = arg.srcElement[indexSel].value;
      this.selection.foreclosureStatus = { val: value, text: label }
      this.searchForm.controls['foreclosureDateFrom'].enable()
      this.searchForm.controls['foreclosureDateTo'].enable()
      this.searchForm.controls['foreclosureRecordedDateFrom'].enable()
      this.searchForm.controls['foreclosureRecordedDateTo'].enable()
      this.searchForm.controls['foreclosureAmountFrom'].enable()
      this.searchForm.controls['foreclosureAmountTo'].enable()
    }
  }

  foreclosureDateChange(arg) {
    this.selection.foreclosureDateStatus = arg
  }

  foreclosureDateChangeFrom(arg) {
    this.selection.foreclosureDateFrom = arg
    if (this.selection.foreclosureDateStatus != 'is') {
      if (!this.validateDate(arg, this.selection.foreclosureDateTo)) {
        this.countError = true;
        this.forDateError = true;
        return;
      }
    }
    this.countError = false;
    this.forDateError = false;


  }

  foreclosureDateChangeTo(arg) {
    this.selection.foreclosureDateTo = arg

    if (this.selection.foreclosureDateStatus != 'is') {
      if (!this.validateDate(this.selection.foreclosureDateFrom, arg)) {
        this.countError = true;
        this.forDateError = true;
        return;
      }
    }
    this.countError = false;
    this.forDateError = false;
  }

  foreclosureRecordedDateChange(arg) {
    this.selection.foreclosureRecordedDateStatus = arg
  }

  foreclosureRecordedDateChangeFrom(arg) {
    this.selection.foreclosureRecordedDateFrom = arg
    if (this.selection.foreclosureRecordedDateStatus != 'is') {
      if (!this.validateDate(arg, this.selection.foreclosureRecordedDateTo)) {
        this.countError = true;
        this.foreclosureRecordedDateError = true;
        return;
      }
    }
    this.countError = false;
    this.foreclosureRecordedDateError = false;


  }

  foreclosureRecordedDateChangeTo(arg) {
    this.selection.foreclosureRecordedDateTo = arg

    if (this.selection.foreclosureRecordedDateStatus != 'is') {
      if (!this.validateDate(this.selection.foreclosureRecordedDateFrom, arg)) {
        this.countError = true;
        this.foreclosureRecordedDateError = true;
        return;
      }
    }
    this.countError = false;
    this.foreclosureRecordedDateError = false;
  }

  foreclosureAmountChange(arg) {
    this.selection.foreclosureAmountStatus = arg
  }

  foreclosureAmountChangeFrom(arg) {
    this.selection.foreclosureAmountFrom = arg
    if (this.selection.foreclosureAmountStatus != 'is') {
      if (!this.validateAmount(this.selection.foreclosureAmountFrom, this.selection.foreclosureAmountTo)) {
        this.countError = true;
        this.forAmountError = true;
        return;
      }
    }
    this.countError = false;
    this.forAmountError = false;
  }

  foreclosureAmountChangeTo(arg) {
    this.selection.foreclosureAmountTo = arg
    if (this.selection.foreclosureAmountStatus != 'is') {
      if (!this.validateAmount(this.selection.foreclosureAmountFrom, this.selection.foreclosureAmountTo)) {
        this.countError = true;
        this.forAmountError = true;
        return;
      }
    }
    this.countError = false;
    this.forAmountError = false;
  }

  forDis() {
    if (this.selection.foreclosureStatus == null) {
      return true;
    }
    else {
      return false;
    }
  }





  ngOnInit() {
    Inputmask({ autoUnmask: true }).mask(document.querySelectorAll("input"));
    if (this.advanceSearchFilledForm) {
      $('#cover-spin').show(0);
      this.selection = this.advanceSearchFilledForm;
      this.searchForm.patchValue({
        state: this.advanceSearchFilledForm.state.val,
        countySelect: this.advanceSearchFilledForm.countySelect,
        // county:[''],
        //city:[''],
        citySelect: this.advanceSearchFilledForm.citySelect,
        zipSelect: this.advanceSearchFilledForm.zipSelect,
        zipcode: this.advanceSearchFilledForm.zipcode,
        zipcodeTo: this.advanceSearchFilledForm.zipcodeTo,
        // land:[''],
        //  landRValue:[''],
        //  landCValue:[''],
        // exemption:[''],
        // occupancy:[''],
        mortgageAmountSelect: this.advanceSearchFilledForm.mortgageAmountSelect,
        mortgageAmountFrom: this.advanceSearchFilledForm.mortgageAmountFrom,
        mortgageAmountTo: this.advanceSearchFilledForm.mortgageAmountTo,
        mortgageRecordingDate: this.advanceSearchFilledForm.mortgageRecordingDate,
        mortgageRecordingFrom: this.convertDatefromat(this.advanceSearchFilledForm.mortgageRecordingFrom),
        mortgageRecordingTo: this.convertDatefromat(this.advanceSearchFilledForm.mortgageRecordingTo),
        //  mortgageType:[''],
        mortgageInterestStatus: this.advanceSearchFilledForm.mortgageInterestStatus,
        mortgageInterestFrom: this.advanceSearchFilledForm.mortgageInterestFrom,
        mortgageInterestTo: this.advanceSearchFilledForm.mortgageInterestTo,
        //   maxOpenLien:[''],

        //  listingStatus:[''],
        listingDateStatus: this.advanceSearchFilledForm.listingDateStatus,
        listingDateFrom: this.convertDatefromat(this.advanceSearchFilledForm.listingDateFrom),
        listingDateTo: this.convertDatefromat(this.advanceSearchFilledForm.listingDateTo),
        listingPriceStatus: this.advanceSearchFilledForm.listingPriceStatus,
        listingPriceFrom: this.advanceSearchFilledForm.listingPriceFrom,
        listingPriceTo: this.advanceSearchFilledForm.listingPriceTo,
        foreclosureStatus: this.advanceSearchFilledForm.foreclosureStatus,
        foreclosureDateStatus: this.advanceSearchFilledForm.foreclosureDateStatus,
        foreclosureDateFrom: this.convertDatefromat(this.advanceSearchFilledForm.foreclosureDateFrom),
        foreclosureDateTo: this.convertDatefromat(this.advanceSearchFilledForm.foreclosureDateTo),
        foreclosureRecordedDateStatus: this.advanceSearchFilledForm.foreclosureRecordedDateStatus,
        foreclosureRecordedDateFrom: this.convertDatefromat(this.advanceSearchFilledForm.foreclosureRecordedDateFrom),
        foreclosureRecordedDateTo: this.convertDatefromat(this.advanceSearchFilledForm.foreclosureRecordedDateTo),
        foreclosureAmountStatus: this.advanceSearchFilledForm.foreclosureAmountStatus,
        foreclosureAmountFrom: this.advanceSearchFilledForm.foreclosureAmountFrom,
        foreclosureAmountTo: this.advanceSearchFilledForm.foreclosureAmountTo,
        // savedTitle:this.advanceSearchFilledForm.savedTitle,
        // purchaseGroupName:this.advanceSearchFilledForm.purchaseGroupName
        ownerFirstNamesSelect: this.advanceSearchFilledForm.ownerFirstNamesSelect,
        ownerLastNamesSelect: this.advanceSearchFilledForm.ownerLastNamesSelect,
        ownerNamesSelect: this.advanceSearchFilledForm.ownerNamesSelect,
        ownerFirstNames: this.advanceSearchFilledForm.ownerFirstNames,
        ownerLastNames: this.advanceSearchFilledForm.ownerLastNames,
        ownerNames: this.advanceSearchFilledForm.ownerNames,
        streetNumberSelect: this.advanceSearchFilledForm.streetNumberSelect,
        streetNumberFrom: this.advanceSearchFilledForm.streetNumberFrom,
        streetNumberTo: this.advanceSearchFilledForm.streetNumberTo,
        streetDir: this.advanceSearchFilledForm.streetDir,
        streetNamesSelect: this.advanceSearchFilledForm.streetNamesSelect,
        streetNames: this.advanceSearchFilledForm.streetNames,
        streetTypes: this.advanceSearchFilledForm.streetTypes,
        streetPostDir: this.advanceSearchFilledForm.streetPostDir,
        unitSelect: this.advanceSearchFilledForm.unitSelect,
        unitFrom: this.advanceSearchFilledForm.unitFrom,
        unitTo: this.advanceSearchFilledForm.unitTo,
        countyUseCode: this.advanceSearchFilledForm.countyUseCode,
        zoningCodeSelect: this.advanceSearchFilledForm.zoningCodeSelect,
        zoningCodeFrom: this.advanceSearchFilledForm.zoningCodeFrom,
        zoningCodeTo: this.advanceSearchFilledForm.zoningCodeTo,
        yearBuiltSelect: this.advanceSearchFilledForm.yearBuiltSelect,
        yearBuiltFrom: this.advanceSearchFilledForm.yearBuiltFrom,
        yearBuiltTo: this.advanceSearchFilledForm.yearBuiltTo,
        buildingAreaSquareFeetSelect: this.advanceSearchFilledForm.buildingAreaSquareFeetSelect,
        buildingAreaSquareFeetFrom: this.advanceSearchFilledForm.buildingAreaSquareFeetFrom,
        buildingAreaSquareFeetTo: this.advanceSearchFilledForm.buildingAreaSquareFeetTo,
        totalNumberOfBedroomsSelect: this.advanceSearchFilledForm.totalNumberOfBedroomsSelect,
        totalNumberOfBedroomsFrom: this.advanceSearchFilledForm.totalNumberOfBedroomsFrom,
        totalNumberOfBedroomsTo: this.advanceSearchFilledForm.totalNumberOfBedroomsTo,
        totalNumberOfBathroomsSelect: this.advanceSearchFilledForm.totalNumberOfBathroomsSelect,
        totalNumberOfBathroomsFrom: this.advanceSearchFilledForm.totalNumberOfBathroomsFrom,
        totalNumberOfBathroomsTo: this.advanceSearchFilledForm.totalNumberOfBathroomsTo,
        totalNumberOfRoomsSelect: this.advanceSearchFilledForm.totalNumberOfRoomsSelect,
        totalNumberOfRoomsFrom: this.advanceSearchFilledForm.totalNumberOfRoomsFrom,
        totalNumberOfRoomsTo: this.advanceSearchFilledForm.totalNumberOfRoomsTo,
        lotAreaSelect: this.advanceSearchFilledForm.lotAreaSelect,
        lotAreaFrom: this.advanceSearchFilledForm.lotAreaFrom,
        lotAreaTo: this.advanceSearchFilledForm.lotAreaTo,
        lotAcreageSelect: this.advanceSearchFilledForm.lotAcreageSelect,
        lotAcreageFrom: this.advanceSearchFilledForm.lotAcreageFrom,
        lotAcreageTo: this.advanceSearchFilledForm.lotAcreageTo,
        numberOfStoriesSelect: this.advanceSearchFilledForm.numberOfStoriesSelect,
        numberOfStoriesFrom: this.advanceSearchFilledForm.numberOfStoriesFrom,
        numberOfStoriesTo: this.advanceSearchFilledForm.numberOfStoriesTo,
        numberOfGarageSpacesSelect: this.advanceSearchFilledForm.numberOfGarageSpacesSelect,
        numberOfGarageSpacesFrom: this.advanceSearchFilledForm.numberOfGarageSpacesFrom,
        numberOfGarageSpacesTo: this.advanceSearchFilledForm.numberOfGarageSpacesTo,
        numberOfUnitsSelect: this.advanceSearchFilledForm.numberOfUnitsSelect,
        numberOfUnitsFrom: this.advanceSearchFilledForm.numberOfUnitsFrom,
        numberOfUnitsTo: this.advanceSearchFilledForm.numberOfUnitsTo,
        salePriceSelect: this.advanceSearchFilledForm.salePriceSelect,
        salePriceFrom: this.advanceSearchFilledForm.salePriceFrom,
        salePriceTo: this.advanceSearchFilledForm.salePriceTo,
        saleDateSelect: this.advanceSearchFilledForm.saleDateSelect,
        saleDateFrom: this.convertDatefromat(this.advanceSearchFilledForm.saleDateFrom),
        saleDateTo: this.convertDatefromat(this.advanceSearchFilledForm.saleDateTo),
        marketSaleRecordingDateSelect: this.advanceSearchFilledForm.marketSaleRecordingDateSelect,
        marketSaleRecordingDateFrom: this.convertDatefromat(this.advanceSearchFilledForm.marketSaleRecordingDateFrom),
        marketSaleRecordingDateTo: this.convertDatefromat(this.advanceSearchFilledForm.marketSaleRecordingDateTo),
        sellerNameSelect: this.advanceSearchFilledForm.sellerNameSelect,
        sellerName: this.advanceSearchFilledForm.sellerName,
        homeEquityValue: this.advanceSearchFilledForm.homeEquityValue,
        homeEquityValueFrom: this.advanceSearchFilledForm.homeEquityValueFrom,
        homeEquityValueTo: this.advanceSearchFilledForm.homeEquityValueTo,
        homeEquityPercentage: this.advanceSearchFilledForm.homeEquityPercentage,
        homeEquityPercentageFrom: this.advanceSearchFilledForm.homeEquityPercentageFrom,
        homeEquityPercentageTo: this.advanceSearchFilledForm.homeEquityPercentageTo,
        assdTotalValue: this.advanceSearchFilledForm.assdTotalValue,
        assdTotalValueFrom: this.advanceSearchFilledForm.assdTotalValueFrom,
        assdTotalValueTo: this.advanceSearchFilledForm.assdTotalValueTo,
        assdLandValue: this.advanceSearchFilledForm.assdLandValue,
        assdLandValueFrom: this.advanceSearchFilledForm.assdLandValueFrom,
        assdLandValueTo: this.advanceSearchFilledForm.assdLandValueTo,
        mktTotalValue: this.advanceSearchFilledForm.mktTotalValue,
        mktTotalValueFrom: this.advanceSearchFilledForm.mktTotalValueFrom,
        mktTotalValueTo: this.advanceSearchFilledForm.mktTotalValueTo,
        mktLandValue: this.advanceSearchFilledForm.mktLandValue,
        mktLandValueFrom: this.advanceSearchFilledForm.mktLandValueFrom,
        mktLandValueTo: this.advanceSearchFilledForm.mktLandValueTo,
        apprTotalValue: this.advanceSearchFilledForm.apprTotalValue,
        apprTotalValueFrom: this.advanceSearchFilledForm.apprTotalValueFrom,
        apprTotalValueTo: this.advanceSearchFilledForm.apprTotalValueTo,
        apprLandValue: this.advanceSearchFilledForm.apprLandValue,
        apprLandValueFrom: this.advanceSearchFilledForm.apprLandValueFrom,
        apprLandValueTo: this.advanceSearchFilledForm.apprLandValueTo,
        apprImprovementValue: this.advanceSearchFilledForm.apprImprovementValue,
        apprImprovementValueFrom: this.advanceSearchFilledForm.apprImprovementValueFrom,
        apprImprovementValueTo: this.advanceSearchFilledForm.apprImprovementValueTo,
        apprImprovementPercentage: this.advanceSearchFilledForm.apprImprovementPercentage,
        apprImprovementPercentageFrom: this.advanceSearchFilledForm.apprImprovementPercentageFrom,
        apprImprovementPercentageTo: this.advanceSearchFilledForm.apprImprovementPercentageTo,
        estimatedValue: this.advanceSearchFilledForm.estimatedValue,
        estimatedValueFrom: this.advanceSearchFilledForm.estimatedValueFrom,
        estimatedValueTo: this.advanceSearchFilledForm.estimatedValueTo,

      });
      if (this.advanceSearchFilledForm.state) {
        this.setCounty(this.advanceSearchFilledForm.state.val);
        this.setCity(this.advanceSearchFilledForm.state.val);
      }
      if (this.advanceSearchFilledForm.county) {
        this.selectedCounty = [];
        let tmpCountyArr: any = [];
        this.advanceSearchFilledForm.county.forEach(arr => {
          this.selectedCounty.push(arr.val + '_' + arr.text);
          tmpCountyArr.push(arr.text);
        });
        this.setCityByCounty(tmpCountyArr.toString());
      }
      if (this.advanceSearchFilledForm.city) {
        this.selectedCity = [];
        this.advanceSearchFilledForm.city.forEach(arr => { this.selectedCity.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.landUse) {
        this.selectedLandUse = [];
        this.advanceSearchFilledForm.landUse.forEach(arr => { this.selectedLandUse.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.exemption) {
        this.selectedExemption = [];
        this.advanceSearchFilledForm.exemption.forEach(arr => { this.selectedExemption.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.occupancy) {
        this.selectedOccupancy = [];
        this.advanceSearchFilledForm.occupancy.forEach(arr => { this.selectedOccupancy.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.mortgageType) {
        this.selectedMortgageType = [];
        this.advanceSearchFilledForm.mortgageType.forEach(arr => { this.selectedMortgageType.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.maxOpenLien) {
        this.selectedMaxOpenLien = [];
        this.advanceSearchFilledForm.maxOpenLien.forEach(arr => { this.selectedMaxOpenLien.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.listingStatus) {
        this.selectedListingStatus = [];
        this.advanceSearchFilledForm.listingStatus.forEach(arr => { this.selectedListingStatus.push(arr.val + '_' + arr.text); });
      }

      if (this.advanceSearchFilledForm.ethnicity) {
        this.selectedEthnicity = [];
        this.advanceSearchFilledForm.ethnicity.forEach(arr => { this.selectedEthnicity.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.corporateOwned) {
        this.selectedCorporateOwned = [];
        this.advanceSearchFilledForm.corporateOwned.forEach(arr => { this.selectedCorporateOwned.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.doNotMail) {
        this.selectedDoNotMail = [];
        this.advanceSearchFilledForm.doNotMail.forEach(arr => { this.selectedDoNotMail.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.selectedStreetDir) {
        this.selectedStreetDir = [];
        this.advanceSearchFilledForm.selectedStreetDir.forEach(arr => { this.selectedStreetDir.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.selectedStreetTypes) {
        this.selectedStreetTypes = [];
        this.advanceSearchFilledForm.selectedStreetTypes.forEach(arr => { this.selectedStreetTypes.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.selectedStreetPostDir) {
        this.selectedStreetPostDir = [];
        this.advanceSearchFilledForm.selectedStreetPostDir.forEach(arr => { this.selectedStreetPostDir.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.siteInfluence) {
        this.selectedSiteInfluence = [];
        this.advanceSearchFilledForm.siteInfluence.forEach(arr => { this.selectedSiteInfluence.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.poolOption) {
        this.selectedPoolOption = [];
        this.advanceSearchFilledForm.poolOption.forEach(arr => { this.selectedPoolOption.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.transactionType) {
        this.selectedTransactionType = [];
        this.advanceSearchFilledForm.transactionType.forEach(arr => { this.selectedTransactionType.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.salePriceType) {
        this.selectedSalePriceType = [];
        this.advanceSearchFilledForm.salePriceType.forEach(arr => { this.selectedSalePriceType.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.recordingMonth) {
        this.selectedRecordingMonth = [];
        this.advanceSearchFilledForm.recordingMonth.forEach(arr => { this.selectedRecordingMonth.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.deedType) {
        this.selectedDeedType = [];
        this.advanceSearchFilledForm.deedType.forEach(arr => { this.selectedDeedType.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.sellerCarryBack) {
        this.selectedSellerCarryBack = [];
        this.advanceSearchFilledForm.sellerCarryBack.forEach(arr => { this.selectedSellerCarryBack.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.financingDeedType) {
        this.selectedFinancingDeedType = [];
        this.advanceSearchFilledForm.financingDeedType.forEach(arr => { this.selectedFinancingDeedType.push(arr.val + '_' + arr.text); });
      }
      if (this.advanceSearchFilledForm.interstRateType) {
        this.selectedInterstRateType = [];
        this.advanceSearchFilledForm.interstRateType.forEach(arr => { this.selectedInterstRateType.push(arr.val + '_' + arr.text); });
      }

      if (!this.advanceSearchFilledForm.city) {
        $('#cover-spin').hide(0);
      }
      //$('#cover-spin').hide(0);
    }
    //$('.money').mask("#,##0.00", {reverse: true});
    // $("#zipcode").keypress(function(e){
    //   var keyCode = e.which;
    //   if ( !(keyCode >= 48 && keyCode <= 57) && keyCode != 8 && keyCode != 32 && keyCode != 45) {// && keyCode != 44
    //     e.preventDefault();
    //   }
    // });

    this.depositeForm = this.fb.group({
      amount: [{value: ''}, [Validators.required]],
    })
    const that = this;
    // this.adSrData.currentSearchData.subscribe(data => this.data = data);
    // this.authService.getProfile().subscribe((data)=>{
    //   if(data.data.member){
    //     this.existingMember = true;
    //   } else{
    //     this.existingMember = false;
    //     this.authService.getBecomeMemberPopupCntnt().subscribe((data)=>{
    //       console.log(data)
    //       this.modalTitle = data.become_member_popup_title;
    //       this.modalContent = data.become_member_popup_content;
    //     },(error)=>{
    //       console.log(error)
    //     })
    //   }

    //   console.log(data)
    // },(error)=>{
    //   console.log(error)
    // });

    if (localStorage.getItem('paidMember')) {
      this.existingMember = true;
    } else {
      this.existingMember = false;
      this.authService.getBecomeMemberPopupCntnt().subscribe((data) => {
        console.log(data)
        this.modalTitle = data.become_member_popup_title;
        this.modalContent = data.become_member_popup_content;
      }, (error) => {
        console.log(error)
      })
    }
    $('#sss').change(function () {
      console.log('ss')
    });

    // $('#multipleSelectExample').select2().on('change', function (e) {
    //     const county=[];
    //     //alert($(this).val())
    //     $('#multipleSelectExample option:selected').map(function (index,item ) {
    //     const val=$(this).val()
    //     var n = val.match(/'(.*?)'/g).toString();
    //     var m = n.replace(/'/g,"");
    //      county.push({val:m,text:$(this).text()})
    //     })
    //     that.selection.county=county;
    //     let arr:any =[];
    //     for(let i:number=0; i<county.length; i++) {
    //         arr.push(county[i].text);
    //     }
    //    // this.setCity(arr.toString());
    // });
    interface AfterViewInit {
      ngAfterViewInit(): void

    }

    // $('#multipleSelectExample3').select2().on('change', function (e) {
    //   const city=[];
    //   $('#multipleSelectExample3 option:selected').map(function (index,item ) {
    //   const val=$(this).val()
    //   var n = val.match(/'(.*?)'/g).toString();
    //   var m = n.replace(/'/g,"");
    //    city.push({val:m,text:$(this).text()})
    //   })
    //   that.selection.city=city;
    // });

    // $('#multipleSelectExample2').select2().on('change', function () {
    //   const land=[];
    //   $('#multipleSelectExample2 option:selected').each(function (index,item ) {
    //     const val=$(this).val()
    //     var n = val.match(/'(.*?)'/g).toString();
    //     var m = n.replace(/'/g,"");
    //     land.push({val:m,text:$(this).text()})
    //   })
    //   that.selection.land=land;

    // })

    // $('#multipleSelectExample4').select2().on('change', function () {
    //   const exemption=[];
    //   $('#multipleSelectExample4 option:selected').each(function (index,item ) {
    //     const val=$(this).val()
    //     var n = val.match(/'(.*?)'/g).toString();
    //     var m = n.replace(/'/g,"");
    //     exemption.push({val:m,text:$(this).text()})
    //   })
    //   that.selection.exemption=exemption;

    // })

    // $('#multipleSelectExample5').select2().on('change', function () {
    //   const occupancy=[];
    //   $('#multipleSelectExample5 option:selected').each(function (index,item ) {
    //     const val=$(this).val()
    //     var n = val.match(/'(.*?)'/g).toString();
    //     var m = n.replace(/'/g,"");
    //     occupancy.push({val:m,text:$(this).text()})
    //   })
    //   that.selection.occupancy=occupancy;

    // })

    // $('#multipleSelectExample14').select2().on('change', function () {
    //   const type=[];
    //   $('#multipleSelectExample14 option:selected').each(function (index,item ) {
    //     const val=$(this).val()
    //     var n = val.match(/'(.*?)'/g).toString();
    //     var m = n.replace(/'/g,"");
    //     type.push({val:m,text:$(this).text()})
    //   })
    //   that.selection.mortgageType=type;

    // })


    // $('#multipleSelectExample15').select2().on('change', function () {
    //   const lien=[];
    //   $('#multipleSelectExample15 option:selected').each(function (index,item ) {
    //     const val=$(this).val()
    //     var n = val.match(/'(.*?)'/g).toString();
    //     var m = n.replace(/'/g,"");
    //     lien.push({val:m,text:$(this).text()})
    //   })
    //   that.selection.maxOpenLien=lien;

    // })
    // $('#multipleSelectExample16').select2().on('change', function () {
    //   const listing=[];
    //   $('#multipleSelectExample16 option:selected').each(function (index,item ) {
    //     const val=$(this).val()
    //     var n = val.match(/'(.*?)'/g).toString();
    //     var m = n.replace(/'/g,"");
    //     listing.push({val:m,text:$(this).text()})
    //   })
    //   that.selection.listingStatus=listing;

    // })




    this.authService.getSearchPage()
      .subscribe((data) => {
        this.kicks = data.data.kicks
      })

  }
  submitSearchForm() {
    if (!this.saveSearchForm.valid) {
      console.log('error')
      return;
    }
    this.savedsearchFlag = true;
  }

  getMonthName(mon) {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][mon - 1];
  }
  submitForm() {
    if (this.searchForm.value["state"] == null) {
      this.toastr.error('State filed is mandatory.', 'Error!');
      return;
    }
    this.savedsearchFlag = false;
    if (this.searchForm.controls.zipcode.errors) {
      this.zipError = true;
      this.toastr.error('Please Remove Error First!', 'Error!');
      return;
    }
    if (this.searchForm.controls.zipcodeTo.errors) {
      this.zipToError = true;
      this.toastr.error('Please Remove Error First!', 'Error!');
      return;
    }
    if (this.countError) {
      //alert('Please Remove error First');
      this.toastr.error('Please Remove Error First!', 'Error!');
      return
    }
    this.submit = true;
    this.authService.getCount(this.selection).subscribe(data => {
      this.SearchCount.count = data.data.MaxResultsCount
      //////
      // let tmp:any =this.authService.getWalletPintsToDeduct(this.SearchCount.count);
      // this.SearchCount.perPropertyRate = parseInt(tmp);
      // console.log(this.selection);
      ////////
      this.submit = false;
      this.myForm = this.selection;
    }, error => {
      console.log(error)
      this.toastr.error(error, 'Error!');
      this.submit = false;
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

  onModal(arg) {

    this.depositeForm.patchValue({
      "amount": arg<50? 50 :arg
    });
    this.depositeForm.get('amount').setValidators([Validators.min(this.minAmount())]);

    if(this.saveSearchForm.value && this.saveSearchForm.value.purchaseGroupName) {

      this.authService.checkPurchaseGroupNameDuplicate({ purchase_group_name: this.saveSearchForm.value.purchaseGroupName})
      .subscribe(
        (data: any) => {
          $('#myModal').modal('show');
        },
        (err: any) => {
          this.toastr.error(err, 'Error!');
        }
      )

    } else {
      $('#myModal').modal('show');
    }

  }

  deposite() {
    $('#cover-spin').show(0);
    this.submitWallet = true;
    if (!this.depositeForm.valid) {
      console.log('error')
      $('#cover-spin').hide(0);
      return;
    }
    this.authService.walletRecharge(this.depositeForm.value)
      .subscribe((data) => {
        console.log(data)
        //alert(data.message);
        $('#cover-spin').hide(0);
        this.toastr.success('Wallet Recharged Successfully!', 'Success!');
        //alert('')
        this.getDeductionToPur();
        this.depositeForm.reset();
        this.submitWallet = false;
        $('#myModal').modal('hide');
        $('#myConfirmModal').modal('hide');

      }, (error) => {
        console.log(error)
        $('#myModal').modal('hide');
        $('#cover-spin').hide(0);
        this.toastr.error(error, 'Error!');
        //alert(error)
      })
  }
  getResult(e) {
    // console.log('test')
    $('#cover-spin').show(0);
    this.confirmBoxContent = '';
    this.saveSearchForm.reset();
    if (this.existingMember) {
      localStorage.removeItem('advanceSearchForm');
      this.submit = true;
      this.authService.getWallet().subscribe(data => {
        this.currentBalance = parseFloat(data.data.current_points);
        this.SearchCount.perPropertyRate = data.data.perPropertyRate;
        console.log(this.SearchCount.amountReq())
        console.log(this.currentBalance.toFixed(2))
        if (parseFloat(this.currentBalance.toFixed(2)) >= this.SearchCount.amountReq()) {
          this.reqAmountInWalletToPur = false;
          this.confirmBoxContent = this.SearchCount.amountReq() + " will be deduct from " + this.currentBalance + " in Wallet."
          this.submit = false;
          $('#cover-spin').hide(0);
          console.log('if');
        } else {
          this.reqAmountInWalletToPur = true;
          this.depositeForm.patchValue({
            'currentBalance': this.currentBalance,
            'perPropertyRate': this.SearchCount.perPropertyRate,
            'recordCount': this.SearchCount.count
          });
          this.confirmBoxContent = "You don't have sufficient balance. Please recharge your wallet. " + this.SearchCount.amountReq() + " will be required to purchase these records. "
          this.confirmBoxReqAmt = this.SearchCount.amountReq();
          if (this.currentBalance > 0) {
            this.confirmBoxContent += "Currently you have " + this.currentBalance + " in Wallet. "
            this.confirmBoxReqAmt = this.confirmBoxReqAmt - this.currentBalance;
          }
          this.confirmBoxContent += this.SearchCount.amountReq() + " will be automacically debited once you recharge Wallet."
          this.submit = false;
          $('#cover-spin').hide(0);
        }
      }, error => {
        this.submit = false;
        console.log(error)
        $('#cover-spin').hide(0);
        this.toastr.error(error, 'Error!');
        this.confirmBoxContent += "No deduction occurred as we are unable to fetch records at the moment. Try again after sometime."
        //alert(error)
      });
    } else {
      this.load=0;
      localStorage.setItem('advanceSearchForm', JSON.stringify(this.selection));
      // this.confirmBoxContent = this.modalContent;
      $('#cover-spin').hide(0);
      e.stopPropagation();
    }
  }

  getDeductionToPur() {
    if (!this.saveSearchForm.valid) {
      return;
    }

    if(this.saveSearchForm.value && this.saveSearchForm.value.purchaseGroupName) {

      this.authService.checkPurchaseGroupNameDuplicate({ purchase_group_name: this.saveSearchForm.value.purchaseGroupName})
      .subscribe(
        (data: any) => {
          this.getDeductionToPur2();
        },
        (err: any) => {
          this.toastr.error(err, 'Error!');
        }
      )

    } else {
      this.getDeductionToPur2();
    }

  }

  getDeductionToPur2() {
    $('#myConfirmModal').modal('hide');
    $('#cover-spin').show(0);
    this.selection.savedTitle = this.saveSearchForm.value.savedTitle;
    this.selection.purchaseGroupName = this.saveSearchForm.value.purchaseGroupName;

    $('#cover-spin').hide(0);
    this.modalService.open(this.content2, { size: 'md' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      $('#cover-spin').show(0);
      // this.authService.saveSearch(this.myForm).subscribe(data => {
        if (!this.reqAmountInWalletToPur) {//|| this.currentBalance > 0
          const reqAmt = (this.SearchCount.amountReq() > this.currentBalance) ? this.currentBalance : this.SearchCount.amountReq();
          // this.authService.updateWallet(reqAmt).subscribe(data => {
          //   this.toastr.success('Records Purchased Successfully!', 'Success!');

          // }, error => {
          //   console.log(error)
          //   this.toastr.error(error, 'Error!');
          //   //alert(error)
          // })
          this.myForm.maxResultCount=this.SearchCount.count
          this.authService.getResult(this.myForm).subscribe(data => {
            this.router.navigate(['/customer/purchased-list/' + encodeURIComponent(data.data.purchase_group_name)]);
            $('#cover-spin').hide(0);
          }, error => {
            $('#cover-spin').hide(0);
            console.log(error)
            this.toastr.error(error, 'Error!');
            //alert(error)
          })


        } else {
          this.toastr.success('Records Purchased Successfully!', 'Success!');
          this.myForm.maxResultCount=this.SearchCount.count
          this.authService.getResult(this.myForm).subscribe(data => {
            this.router.navigate(['/customer/purchased-list/' + encodeURIComponent(data.data.purchase_group_name)]);
            $('#cover-spin').hide(0);
          }, error => {
            $('#cover-spin').hide(0);
            console.log(error)
            this.toastr.error(error, 'Error!');
            //alert(error)
          })
        }
      // }, error => {
      //   $('#cover-spin').hide(0);
      //   console.log(error)
      //   this.toastr.error(error, 'Error!');
      //   //alert(error)
      // })

    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }


  validateDate(fDate, tDate) {
    if (fDate && tDate) {
      let fromDate = new Date(fDate.year, fDate.month - 1, fDate.day);
      let toDate = new Date(tDate.year, tDate.month - 1, tDate.day);
      if (fromDate > toDate) {
        return false;
      }
    }
    if (!fDate && tDate || fDate && !tDate) {
      return false;
    }
    return true;
  }
  validateAmount(fAmount, tAmount) {
    if (fAmount && tAmount) {
      if (parseInt(fAmount) > parseInt(tAmount)) {
        return false;
      }
    }
    if (!fAmount && tAmount || fAmount && !tAmount) {
      return false;
    }
    return true;
  }
  remove(key: string, item: any, type: string, key2: string) {
    //alert(item);
    if (key == 'state') {
      this.selection.state = null;
      this.selectedCounty = [];
      this.selection.county = [];
      this.county = undefined;
      this.selectedCity = [];
      this.selection.city = [];
      this.city = undefined;
      this.searchForm.patchValue({ 'state': null });
    }
    else if (type == 'multySelect') {
      let selectedArr = 'selected' + key.charAt(0).toUpperCase() + key.slice(1);
      const index: number = this[selectedArr].indexOf(item.val + '_' + item.text);
      $('[formcontrolname="' + key + '"] .ng-value-container .ng-value:eq(' + index + ') .ng-value-icon.left').click();
    }
    else if (type == 'singleSelect') {
      this.searchForm.get(key).setValue('');
      this.selection[key] = '';
    }
    else if (type == 'txtInput') {
      this.searchForm.get(key).setValue('');
      this.selection[key] = '';
    }
    else if (type == 'txtInput2') {
      this.searchForm.get(key).setValue('');
      this.searchForm.get(key2).setValue('');
      this.selection[key] = '';
      this.selection[key2] = '';
    }
    else if (type == 'dateInput') {
      this.searchForm.get(key).setValue('');
    }
    else if (type == 'dateInput2') {
      this.searchForm.get(key).setValue('');
      this.searchForm.get(key2).setValue('');
    }
    else if (key == 'foreclosureStatus') {
      this.searchForm.patchValue({ 'foreclosureStatus': null });
      this.selection.foreclosureStatus = null
      this.searchForm.patchValue({
        foreclosureDateFrom: [''],
        foreclosureDateTo: [''],
        foreclosureRecordedDateFrom: [''],
        foreclosureRecordedDateTo: [''],
        foreclosureAmountFrom: [''],
        foreclosureAmountTo: ['']
      })
      this.selection.foreclosureDateFrom = ''
      this.selection.foreclosureDateTo = ''
      this.selection.foreclosureRecordedDateFrom = ''
      this.selection.foreclosureRecordedDateTo = ''
      this.selection.foreclosureAmountFrom = ''
      this.selection.foreclosureAmountTo = ''
      this.searchForm.controls['foreclosureDateFrom'].disable()
      this.searchForm.controls['foreclosureDateTo'].disable()
      this.searchForm.controls['foreclosureRecordedDateFrom'].disable()
      this.searchForm.controls['foreclosureRecordedDateTo'].disable()
      this.searchForm.controls['foreclosureAmountFrom'].disable()
      this.searchForm.controls['foreclosureAmountTo'].disable()
    }
  }
  convertDatefromat(data) {
    if (data) {
      data.year = parseInt(data.year)
      data.month = parseInt(data.month)
      data.day = parseInt(data.day)
    }
    return data;
  }


  minAmount() {

    if((this.SearchCount.amountReq() - this.currentBalance) >= 50)
      return this.SearchCount.amountReq() - this.currentBalance;
    else return 50;
  }

  changeOwnerFirstNamesSelect(arg) {
    this.selection.ownerFirstNamesSelect = arg
  }

  changeOwnerLastNamesSelect(arg) {
    this.selection.ownerLastNamesSelect = arg
  }

  changeOwnerNamesSelect(arg) {
    this.selection.ownerNamesSelect = arg
  }

  changeOwnerFirstNames (arg) {
      this.selection.ownerFirstNames = arg;
  }

  changeOwnerLastNames (arg) {
      this.selection.ownerLastNames = arg;
  }

  changeOwnerNames (arg) {
      this.selection.ownerNames = arg;
  }

  changeEthnicity (arg) {
    const ethnicity = [];
    for (let i: number = 0; i < arg.length; i++) {
      ethnicity.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }
    this.selection.ethnicity = ethnicity;
  }

  changeCorporateOwned (arg) {
    // const corporateOwned = [];
    // for (let i: number = 0; i < arg.length; i++) {
    //   corporateOwned.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    // }
    this.selection.corporateOwned = [{ val: arg.split(/_(.+)/)[0], text: arg.split(/_(.+)/)[1] }];
  }

  changeDoNotMail (arg) {
    // const doNotMail = [];
    // for (let i: number = 0; i < arg.length; i++) {
    //   doNotMail.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    // }
    this.selection.doNotMail = [{ val: arg.split(/_(.+)/)[0], text: arg.split(/_(.+)/)[1] }];
  }

  changeStreetNumberSelect(arg) {
    this.selection.streetNumberSelect = arg
  }

  changeStreetNumberFrom(arg) {
    this.selection.streetNumberFrom = arg

    if (this.selection.streetNumberSelect == 'is between') {
      if (!this.validateAmount(this.selection.streetNumberFrom, this.selection.streetNumberTo)) {
        this.countError = true;
        this.openStreetNumberError = true;
        return;
      }
    }
    this.countError = false;
    this.openStreetNumberError = false;
  }

  changeStreetNumberTo(arg) {
    this.selection.streetNumberTo = arg

    if (this.selection.streetNumberSelect == 'is between') {
      if (!this.validateAmount(this.selection.streetNumberFrom, this.selection.streetNumberTo)) {
        this.countError = true;
        this.openStreetNumberError = true;
        return;
      }
    }
    this.countError = false;
    this.openStreetNumberError = false;
  }

  changeStreetDir (arg) {
    const streetDir = [];
    for (let i: number = 0; i < arg.length; i++) {
      streetDir.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }

    this.selection.streetDir = streetDir;
  }

  changeStreetNamesSelect(arg) {
    this.selection.streetNamesSelect = arg
  }

  changeStreetNames(arg) {
    this.selection.streetNames = arg
  }

  changeStreetTypes (arg) {
    const streetTypes = [];
    for (let i: number = 0; i < arg.length; i++) {
      streetTypes.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }

    this.selection.streetTypes = streetTypes;
  }

  changeStreetPostDir (arg) {
    const streetPostDir = [];
    for (let i: number = 0; i < arg.length; i++) {
      streetPostDir.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }

    this.selection.streetPostDir = streetPostDir;
  }

  changeUnitSelect(arg) {
    this.selection.unitSelect = arg
  }

  changeUnitFrom(arg) {
    this.selection.unitFrom = arg

    if (this.selection.unitSelect == 'is between') {
      if (!this.validateAmount(this.selection.unitFrom, this.selection.unitTo)) {
        this.countError = true;
        this.openUnitError = true;
        return;
      }
    }
    this.countError = false;
    this.openUnitError = false;
  }

  changeUnitTo(arg) {
    this.selection.unitTo = arg

    if (this.selection.unitSelect == 'is between') {
      if (!this.validateAmount(this.selection.unitFrom, this.selection.unitTo)) {
        this.countError = true;
        this.openUnitError = true;
        return;
      }
    }
    this.countError = false;
    this.openUnitError = false;
  }

  changeCountyUseCode(arg) {
    this.selection.countyUseCode = arg
  }

  changeSiteInfluence(arg) {
    const siteInfluence = [];
    for (let i: number = 0; i < arg.length; i++) {
      siteInfluence.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }
    this.selection.siteInfluence = siteInfluence;
  }

  changeZoningCodeSelect(arg) {
    this.selection.zoningCodeSelect = arg
  }

  changeZoningCodeFrom(arg) {
    this.selection.zoningCodeFrom = arg

    if (this.selection.zoningCodeSelect == 'is between') {
      if (!this.validateAmount(this.selection.zoningCodeFrom, this.selection.zoningCodeTo)) {
        this.countError = true;
        this.openZoningCodeToError = true;
        return;
      }
    }
    this.countError = false;
    this.openZoningCodeToError = false;
  }

  changeZoningCodeTo(arg) {
    this.selection.zoningCodeTo = arg

    if (this.selection.zoningCodeSelect == 'is between') {
      if (!this.validateAmount(this.selection.zoningCodeFrom, this.selection.zoningCodeTo)) {
        this.countError = true;
        this.openZoningCodeToError = true;
        return;
      }
    }
    this.countError = false;
    this.openZoningCodeToError = false;
  }

  changeYearBuiltSelect(arg) {
    this.selection.yearBuiltSelect = arg
  }

  changeYearBuiltFrom(arg) {
    this.selection.yearBuiltFrom = arg

    if (this.selection.yearBuiltSelect == 'is between') {
      if (!this.validateAmount(this.selection.yearBuiltFrom, this.selection.yearBuiltTo)) {
        this.countError = true;
        this.openYearBuiltToError = true;
        return;
      }
    }
    this.countError = false;
    this.openYearBuiltToError = false;
  }

  changeYearBuiltTo(arg) {
    this.selection.yearBuiltTo = arg

    if (this.selection.yearBuiltSelect == 'is between') {
      if (!this.validateAmount(this.selection.yearBuiltFrom, this.selection.yearBuiltTo)) {
        this.countError = true;
        this.openYearBuiltToError = true;
        return;
      }
    }
    this.countError = false;
    this.openYearBuiltToError = false;
  }

  changeBuildingAreaSquareFeetSelect(arg) {
    this.selection.buildingAreaSquareFeetSelect = arg
  }

  changeBuildingAreaSquareFeetFrom(arg) {
    this.selection.buildingAreaSquareFeetFrom = arg

    if (this.selection.buildingAreaSquareFeetSelect == 'is between') {
      if (!this.validateAmount(this.selection.buildingAreaSquareFeetFrom, this.selection.buildingAreaSquareFeetTo)) {
        this.countError = true;
        this.openBuildingAreaSquareFeetToError = true;
        return;
      }
    }
    this.countError = false;
    this.openBuildingAreaSquareFeetToError = false;
  }

  changeBuildingAreaSquareFeetTo(arg) {
    this.selection.buildingAreaSquareFeetTo = arg

    if (this.selection.buildingAreaSquareFeetSelect == 'is between') {
      if (!this.validateAmount(this.selection.buildingAreaSquareFeetFrom, this.selection.buildingAreaSquareFeetTo)) {
        this.countError = true;
        this.openBuildingAreaSquareFeetToError = true;
        return;
      }
    }
    this.countError = false;
    this.openBuildingAreaSquareFeetToError = false;
  }

  changeTotalNumberOfBedroomsSelect(arg) {
    this.selection.totalNumberOfBedroomsSelect = arg
  }

  changeTotalNumberOfBedroomsFrom(arg) {
    this.selection.totalNumberOfBedroomsFrom = arg

    if (this.selection.totalNumberOfBedroomsSelect == 'is between') {
      if (!this.validateAmount(this.selection.totalNumberOfBedroomsFrom, this.selection.totalNumberOfBedroomsTo)) {
        this.countError = true;
        this.openTotalNumberOfBedroomsToError = true;
        return;
      }
    }
    this.countError = false;
    this.openTotalNumberOfBedroomsToError = false;
  }

  changeTotalNumberOfBedroomsTo(arg) {
    this.selection.totalNumberOfBedroomsTo = arg

    if (this.selection.totalNumberOfBedroomsSelect == 'is between') {
      if (!this.validateAmount(this.selection.totalNumberOfBedroomsFrom, this.selection.totalNumberOfBedroomsTo)) {
        this.countError = true;
        this.openTotalNumberOfBedroomsToError = true;
        return;
      }
    }
    this.countError = false;
    this.openTotalNumberOfBedroomsToError = false;
  }

  changeTotalNumberOfBathroomsSelect(arg) {
    this.selection.totalNumberOfBathroomsSelect = arg
  }

  changeTotalNumberOfBathroomsFrom(arg) {
    this.selection.totalNumberOfBathroomsFrom = arg

    if (this.selection.totalNumberOfBathroomsSelect == 'is between') {
      if (!this.validateAmount(this.selection.totalNumberOfBathroomsFrom, this.selection.totalNumberOfBathroomsTo)) {
        this.countError = true;
        this.openTotalNumberOfBathroomsToError = true;
        return;
      }
    }
    this.countError = false;
    this.openTotalNumberOfBathroomsToError = false;
  }

  changeTotalNumberOfBathroomsTo(arg) {
    this.selection.totalNumberOfBathroomsTo = arg

    if (this.selection.totalNumberOfBathroomsSelect == 'is between') {
      if (!this.validateAmount(this.selection.totalNumberOfBathroomsFrom, this.selection.totalNumberOfBathroomsTo)) {
        this.countError = true;
        this.openTotalNumberOfBathroomsToError = true;
        return;
      }
    }
    this.countError = false;
    this.openTotalNumberOfBathroomsToError = false;
  }

  changeTotalNumberOfRoomsSelect(arg) {
    this.selection.totalNumberOfRoomsSelect = arg
  }

  changeTotalNumberOfRoomsFrom(arg) {
    this.selection.totalNumberOfRoomsFrom = arg

    if (this.selection.totalNumberOfRoomsSelect == 'is between') {
      if (!this.validateAmount(this.selection.totalNumberOfRoomsFrom, this.selection.totalNumberOfRoomsTo)) {
        this.countError = true;
        this.openTotalNumberOfRoomsToError = true;
        return;
      }
    }
    this.countError = false;
    this.openTotalNumberOfRoomsToError = false;
  }

  changeTotalNumberOfRoomsTo(arg) {
    this.selection.totalNumberOfRoomsTo = arg

    if (this.selection.totalNumberOfRoomsSelect == 'is between') {
      if (!this.validateAmount(this.selection.totalNumberOfRoomsFrom, this.selection.totalNumberOfRoomsTo)) {
        this.countError = true;
        this.openTotalNumberOfRoomsToError = true;
        return;
      }
    }
    this.countError = false;
    this.openTotalNumberOfRoomsToError = false;
  }

  changeLotAreaSelect(arg) {
    this.selection.lotAreaSelect = arg
  }

  changeLotAreaFrom(arg) {
    this.selection.lotAreaFrom = arg

    if (this.selection.lotAreaSelect == 'is between') {
      if (!this.validateAmount(this.selection.lotAreaFrom, this.selection.lotAreaTo)) {
        this.countError = true;
        this.openLotAreaToError = true;
        return;
      }
    }
    this.countError = false;
    this.openLotAreaToError = false;
  }

  changeLotAreaTo(arg) {
    this.selection.lotAreaTo = arg

    if (this.selection.lotAreaSelect == 'is between') {
      if (!this.validateAmount(this.selection.lotAreaFrom, this.selection.lotAreaTo)) {
        this.countError = true;
        this.openLotAreaToError = true;
        return;
      }
    }
    this.countError = false;
    this.openLotAreaToError = false;
  }

  changeLotAcreageSelect(arg) {
    this.selection.lotAcreageSelect = arg
  }

  changeLotAcreageFrom(arg) {
    this.selection.lotAcreageFrom = arg

    if (this.selection.lotAcreageSelect == 'is between') {
      if (!this.validateAmount(this.selection.lotAcreageFrom, this.selection.lotAcreageTo)) {
        this.countError = true;
        this.openLotAcreageToError = true;
        return;
      }
    }
    this.countError = false;
    this.openLotAcreageToError = false;
  }

  changeLotAcreageTo(arg) {
    this.selection.lotAcreageTo = arg

    if (this.selection.unitSelect == 'is between') {
      if (!this.validateAmount(this.selection.lotAcreageFrom, this.selection.lotAcreageTo)) {
        this.countError = true;
        this.openLotAcreageToError = true;
        return;
      }
    }
    this.countError = false;
    this.openLotAcreageToError = false;
  }

  changeNumberOfStoriesSelect(arg) {
    this.selection.numberOfStoriesSelect = arg
  }

  changeNumberOfStoriesFrom(arg) {
    this.selection.numberOfStoriesFrom = arg

    if (this.selection.numberOfStoriesSelect == 'is between') {
      if (!this.validateAmount(this.selection.numberOfStoriesFrom, this.selection.numberOfStoriesTo)) {
        this.countError = true;
        this.openNumberOfStoriesToError = true;
        return;
      }
    }
    this.countError = false;
    this.openNumberOfStoriesToError = false;
  }

  changeNumberOfStoriesTo(arg) {
    this.selection.numberOfStoriesTo = arg

    if (this.selection.numberOfStoriesSelect == 'is between') {
      if (!this.validateAmount(this.selection.numberOfStoriesFrom, this.selection.numberOfStoriesTo)) {
        this.countError = true;
        this.openNumberOfStoriesToError = true;
        return;
      }
    }
    this.countError = false;
    this.openNumberOfStoriesToError = false;
  }

  changeNumberOfGarageSpacesSelect(arg) {
    this.selection.numberOfGarageSpacesSelect = arg
  }

  changeNumberOfGarageSpacesFrom(arg) {
    this.selection.numberOfGarageSpacesFrom = arg

    if (this.selection.numberOfGarageSpacesSelect == 'is between') {
      if (!this.validateAmount(this.selection.numberOfGarageSpacesFrom, this.selection.numberOfGarageSpacesTo)) {
        this.countError = true;
        this.openNumberOfGarageSpacesToError = true;
        return;
      }
    }
    this.countError = false;
    this.openNumberOfGarageSpacesToError = false;
  }

  changeNumberOfGarageSpacesTo(arg) {
    this.selection.numberOfGarageSpacesTo = arg

    if (this.selection.numberOfGarageSpacesSelect == 'is between') {
      if (!this.validateAmount(this.selection.numberOfGarageSpacesFrom, this.selection.numberOfGarageSpacesTo)) {
        this.countError = true;
        this.openNumberOfGarageSpacesToError = true;
        return;
      }
    }
    this.countError = false;
    this.openNumberOfGarageSpacesToError = false;
  }

  changeNumberOfUnitsSelect(arg) {
    this.selection.numberOfUnitsSelect = arg
  }

  changeNumberOfUnitsFrom(arg) {
    this.selection.numberOfUnitsFrom = arg

    if (this.selection.numberOfUnitsSelect == 'is between') {
      if (!this.validateAmount(this.selection.numberOfUnitsFrom, this.selection.numberOfUnitsTo)) {
        this.countError = true;
        this.openNumberOfUnitsToError = true;
        return;
      }
    }
    this.countError = false;
    this.openNumberOfUnitsToError = false;
  }

  changeNumberOfUnitsTo(arg) {
    this.selection.numberOfUnitsTo = arg

    if (this.selection.numberOfUnitsSelect == 'is between') {
      if (!this.validateAmount(this.selection.numberOfUnitsFrom, this.selection.numberOfUnitsTo)) {
        this.countError = true;
        this.openNumberOfUnitsToError = true;
        return;
      }
    }
    this.countError = false;
    this.openNumberOfUnitsToError = false;
  }

  changePoolOption(arg) {
    const poolOption = [];

    poolOption.push({ val: arg.split(/_(.+)/)[0], text: arg.split(/_(.+)/)[1] });

    this.selection.poolOption = poolOption;
  }

  changeTransactionType(arg) {
    const transactionType = [];

    transactionType.push({ val: arg.split(/_(.+)/)[0], text: arg.split(/_(.+)/)[1] });

    this.selection.transactionType = transactionType;
  }

  changeSalePriceType(arg) {
    const salePriceType = [];

    for (let i: number = 0; i < arg.length; i++) {
      salePriceType.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }

    this.selection.salePriceType = salePriceType;
  }

  changeRecordingMonth(arg) {
    const recordingMonth = [];

    recordingMonth.push({ val: arg.split(/_(.+)/)[0], text: arg.split(/_(.+)/)[1] });

    this.selection.recordingMonth = recordingMonth;
  }

  changeSalePriceSelect(arg) {
    this.selection.salePriceSelect = arg
  }

  changeSalePriceFrom(arg) {
    this.selection.salePriceFrom = arg

    if (this.selection.salePriceSelect == 'is between') {
      if (!this.validateAmount(this.selection.salePriceFrom, this.selection.salePriceTo)) {
        this.countError = true;
        this.openSalePriceToError = true;
        return;
      }
    }
    this.countError = false;
    this.openSalePriceToError = false;
  }

  changeSalePriceTo(arg) {
    this.selection.salePriceTo = arg

    if (this.selection.salePriceSelect == 'is between') {
      if (!this.validateAmount(this.selection.salePriceFrom, this.selection.salePriceTo)) {
        this.countError = true;
        this.openSalePriceToError = true;
        return;
      }
    }
    this.countError = false;
    this.openSalePriceToError = false;
  }

  changeSaleDate(arg) {
    this.selection.saleDateSelect = arg
  }

  changeSaleDateFrom(arg) {
    if (typeof arg == 'object') {
        this.selection.saleDateFrom = arg;
    } else {
        const date = new Date(arg);
        this.selection.saleDateFrom = {year: date.getFullYear(), month: (date.getMonth() + 1), day: date.getDate()};
    }

    if (this.selection.saleDateSelect == 'is between') {
      if (!this.validateDate(arg, this.selection.saleDateTo)) {
        this.countError = true;
        this.openSaleDateToError = true;
        return;
      }
    }

    this.countError = false;
    this.openSaleDateToError = false;
  }

  changeSaleDateTo(arg) {
    if (typeof arg == 'object') {
        this.selection.saleDateTo = arg;
    } else {
        const date = new Date(arg);
        this.selection.saleDateTo = {year: date.getFullYear(), month: (date.getMonth() + 1), day: date.getDate()};
    }

    if (this.selection.saleDateSelect == 'is between') {
      if (!this.validateDate(this.selection.saleDateFrom, arg)) {
        this.countError = true;
        this.openSaleDateToError = true;
        return;
      }
    }
    this.countError = false;
    this.openSaleDateToError = false;
  }

  changeMarketSaleRecordingDate(arg) {
    this.selection.marketSaleRecordingDateSelect = arg
  }

  changeMarketSaleRecordingDateFrom(arg) {
    if (typeof arg == 'object') {
        this.selection.marketSaleRecordingDateFrom = arg;
    } else {
        const date = new Date(arg);
        this.selection.marketSaleRecordingDateFrom = {year: date.getFullYear(), month: (date.getMonth() + 1), day: date.getDate()};
    }

    if (this.selection.marketSaleRecordingDateSelect == 'is between') {
      if (!this.validateDate(arg, this.selection.marketSaleRecordingDateTo)) {
        this.countError = true;
        this.openMarketSaleRecordingDateToError = true;
        return;
      }
    }

    this.countError = false;
    this.openMarketSaleRecordingDateToError = false;
  }

  changeMarketSaleRecordingDateTo(arg) {
    if (typeof arg == 'object') {
        this.selection.marketSaleRecordingDateTo = arg;
    } else {
        const date = new Date(arg);
        this.selection.marketSaleRecordingDateTo = {year: date.getFullYear(), month: (date.getMonth() + 1), day: date.getDate()};
    }

    if (this.selection.marketSaleRecordingDateSelect == 'is between') {
      if (!this.validateDate(this.selection.marketSaleRecordingDateFrom, arg)) {
        this.countError = true;
        this.openMarketSaleRecordingDateToError = true;
        return;
      }
    }
    this.countError = false;
    this.openMarketSaleRecordingDateToError = false;
  }

  changeSellerNameSelect(arg) {
    this.selection.sellerNameSelect = arg
  }

  changeSellerName(arg) {
    this.selection.sellerName = arg;
  }

  changeDeedType(arg) {
    const deedType = [];

    for (let i: number = 0; i < arg.length; i++) {
      deedType.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }

    this.selection.deedType = deedType;
  }

  changeSellerCarryBack(arg) {
    const sellerCarryBack = [];

    sellerCarryBack.push({ val: arg.split(/_(.+)/)[0], text: arg.split(/_(.+)/)[1] });

    this.selection.sellerCarryBack = sellerCarryBack;
  }

  changeFinancingDeedType(arg) {
    const financingDeedType = [];

    for (let i: number = 0; i < arg.length; i++) {
      financingDeedType.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }

    this.selection.financingDeedType = financingDeedType;
  }

  changeInterstRateType(arg) {
    const interstRateType = [];

    for (let i: number = 0; i < arg.length; i++) {
      interstRateType.push({ val: arg[i].split(/_(.+)/)[0], text: arg[i].split(/_(.+)/)[1] });
    }

    this.selection.interstRateType = interstRateType;
  }

  changeHomeEquityValueSelect(arg) {
    this.selection.homeEquityValue = arg
  }

  changeHomeEquityValueFrom(arg) {
    this.selection.homeEquityValueFrom = arg
    if (this.selection.homeEquityValue == 'is between') {
      if (!this.validateAmount(this.selection.homeEquityValueFrom, this.selection.homeEquityValueTo)) {
        this.countError = true;
        this.openHomeEquityValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openHomeEquityValueError = false;

  }

  changeHomeEquityValueTo(arg) {
    this.selection.homeEquityValueTo = arg
    if (this.selection.homeEquityValue == 'is between') {
      if (!this.validateAmount(this.selection.homeEquityValueFrom, this.selection.homeEquityValueTo)) {
        this.countError = true;
        this.openHomeEquityValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openHomeEquityValueError = false;
  }

  changeHomeEquityPercentageSelect(arg) {
    this.selection.homeEquityPercentage = arg
  }

  changeHomeEquityPercentageFrom(arg) {
    this.selection.homeEquityPercentageFrom = arg
    if (this.selection.homeEquityPercentage == 'is between') {
      if (!this.validateAmount(this.selection.homeEquityPercentageFrom, this.selection.homeEquityPercentageTo)) {
        this.countError = true;
        this.openHomeEquityPercentageError = true;
        return;
      }
    }
    this.countError = false;
    this.openHomeEquityPercentageError = false;

  }

  changeHomeEquityPercentageTo(arg) {
    this.selection.homeEquityPercentageTo = arg
    if (this.selection.homeEquityPercentage == 'is between') {
      if (!this.validateAmount(this.selection.homeEquityPercentageFrom, this.selection.homeEquityPercentageTo)) {
        this.countError = true;
        this.openHomeEquityPercentageError = true;
        return;
      }
    }
    this.countError = false;
    this.openHomeEquityPercentageError = false;
  }

  changeAssdTotalValueSelect(arg) {
    this.selection.assdTotalValue = arg
  }

  changeAssdTotalValueFrom(arg) {
    this.selection.assdTotalValueFrom = arg
    if (this.selection.assdTotalValue == 'is between') {
      if (!this.validateAmount(this.selection.assdTotalValueFrom, this.selection.assdTotalValueTo)) {
        this.countError = true;
        this.openAssdTotalValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openAssdTotalValueError = false;

  }

  changeAssdTotalValueTo(arg) {
    this.selection.assdTotalValueTo = arg
    if (this.selection.assdTotalValue == 'is between') {
      if (!this.validateAmount(this.selection.assdTotalValueFrom, this.selection.assdTotalValueTo)) {
        this.countError = true;
        this.openAssdTotalValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openAssdTotalValueError = false;
  }

  changeAssdLandValueSelect(arg) {
    this.selection.assdLandValue = arg
  }

  changeAssdLandValueFrom(arg) {
    this.selection.assdLandValueFrom = arg
    if (this.selection.assdLandValue == 'is between') {
      if (!this.validateAmount(this.selection.assdLandValueFrom, this.selection.assdLandValueTo)) {
        this.countError = true;
        this.openAssdLandValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openAssdLandValueError = false;

  }

  changeAssdLandValueTo(arg) {
    this.selection.assdLandValueTo = arg
    if (this.selection.assdLandValue == 'is between') {
      if (!this.validateAmount(this.selection.assdLandValueFrom, this.selection.assdLandValueTo)) {
        this.countError = true;
        this.openAssdLandValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openAssdLandValueError = false;
  }

  changeMktTotalValueSelect(arg) {
    this.selection.mktTotalValue = arg
  }

  changeMktTotalValueFrom(arg) {
    this.selection.mktTotalValueFrom = arg
    if (this.selection.mktTotalValue == 'is between') {
      if (!this.validateAmount(this.selection.mktTotalValueFrom, this.selection.mktTotalValueTo)) {
        this.countError = true;
        this.openMktTotalValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openMktTotalValueError = false;

  }

  changeMktTotalValueTo(arg) {
    this.selection.mktTotalValueTo = arg
    if (this.selection.mktTotalValue == 'is between') {
      if (!this.validateAmount(this.selection.mktTotalValueFrom, this.selection.mktTotalValueTo)) {
        this.countError = true;
        this.openMktTotalValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openMktTotalValueError = false;
  }

  changeMktLandValueSelect(arg) {
    this.selection.mktLandValue = arg
  }

  changeMktLandValueFrom(arg) {
    this.selection.mktLandValueFrom = arg
    if (this.selection.mktLandValue == 'is between') {
      if (!this.validateAmount(this.selection.mktLandValueFrom, this.selection.mktLandValueTo)) {
        this.countError = true;
        this.openMktLandValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openMktLandValueError = false;

  }

  changeMktLandValueTo(arg) {
    this.selection.mktLandValueTo = arg
    if (this.selection.mktLandValue == 'is between') {
      if (!this.validateAmount(this.selection.mktLandValueFrom, this.selection.mktLandValueTo)) {
        this.countError = true;
        this.openMktLandValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openMktLandValueError = false;
  }

  changeApprTotalValueSelect(arg) {
    this.selection.apprTotalValue = arg
  }

  changeApprTotalValueFrom(arg) {
    this.selection.apprTotalValueFrom = arg
    if (this.selection.apprTotalValue == 'is between') {
      if (!this.validateAmount(this.selection.apprTotalValueFrom, this.selection.apprTotalValueTo)) {
        this.countError = true;
        this.openApprTotalValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openApprTotalValueError = false;

  }

  changeApprTotalValueTo(arg) {
    this.selection.apprTotalValueTo = arg
    if (this.selection.apprTotalValue == 'is between') {
      if (!this.validateAmount(this.selection.apprTotalValueFrom, this.selection.apprTotalValueTo)) {
        this.countError = true;
        this.openApprTotalValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openApprTotalValueError = false;
  }

  changeApprLandValueSelect(arg) {
    this.selection.apprLandValue = arg
  }

  changeApprLandValueFrom(arg) {
    this.selection.apprLandValueFrom = arg
    if (this.selection.apprLandValue == 'is between') {
      if (!this.validateAmount(this.selection.apprLandValueFrom, this.selection.apprLandValueTo)) {
        this.countError = true;
        this.openApprLandValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openApprLandValueError = false;

  }

  changeApprLandValueTo(arg) {
    this.selection.apprLandValueTo = arg
    if (this.selection.apprLandValue == 'is between') {
      if (!this.validateAmount(this.selection.apprLandValueFrom, this.selection.apprLandValueTo)) {
        this.countError = true;
        this.openApprLandValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openApprLandValueError = false;
  }

  changeApprImprovementValueSelect(arg) {
    this.selection.apprImprovementValue = arg
  }

  changeApprImprovementValueFrom(arg) {
    this.selection.apprImprovementValueFrom = arg
    if (this.selection.apprImprovementValue == 'is between') {
      if (!this.validateAmount(this.selection.apprImprovementValueFrom, this.selection.apprImprovementValueTo)) {
        this.countError = true;
        this.openApprImprovementValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openApprImprovementValueError = false;

  }

  changeApprImprovementValueTo(arg) {
    this.selection.apprImprovementValueTo = arg
    if (this.selection.apprImprovementValue == 'is between') {
      if (!this.validateAmount(this.selection.apprImprovementValueFrom, this.selection.apprImprovementValueTo)) {
        this.countError = true;
        this.openApprImprovementValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openApprImprovementValueError = false;
  }

  changeApprImprovementPercentageSelect(arg) {
    this.selection.apprImprovementPercentage = arg
  }

  changeApprImprovementPercentageFrom(arg) {
    this.selection.apprImprovementPercentageFrom = arg
    if (this.selection.apprImprovementPercentage == 'is between') {
      if (!this.validateAmount(this.selection.apprImprovementPercentageFrom, this.selection.apprImprovementPercentageTo)) {
        this.countError = true;
        this.openApprImprovementPercentageError = true;
        return;
      }
    }
    this.countError = false;
    this.openApprImprovementPercentageError = false;

  }

  changeApprImprovementPercentageTo(arg) {
    this.selection.apprImprovementPercentageTo = arg
    if (this.selection.apprImprovementPercentage == 'is between') {
      if (!this.validateAmount(this.selection.apprImprovementPercentageFrom, this.selection.apprImprovementPercentageTo)) {
        this.countError = true;
        this.openApprImprovementPercentageError = true;
        return;
      }
    }
    this.countError = false;
    this.openApprImprovementPercentageError = false;
  }

  changeEstimatedValueSelect(arg) {
    this.selection.estimatedValue = arg
  }

  changeEstimatedValueFrom(arg) {
    this.selection.estimatedValueFrom = arg
    if (this.selection.estimatedValue == 'is between') {
      if (!this.validateAmount(this.selection.estimatedValueFrom, this.selection.estimatedValueTo)) {
        this.countError = true;
        this.openEstimatedValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openEstimatedValueError = false;

  }

  changeEstimatedValueTo(arg) {
    this.selection.estimatedValueTo = arg
    if (this.selection.estimatedValue == 'is between') {
      if (!this.validateAmount(this.selection.estimatedValueFrom, this.selection.estimatedValueTo)) {
        this.countError = true;
        this.openEstimatedValueError = true;
        return;
      }
    }
    this.countError = false;
    this.openEstimatedValueError = false;
  }
}
