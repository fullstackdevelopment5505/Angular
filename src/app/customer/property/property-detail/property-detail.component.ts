import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { error } from 'protractor';
import { AgmCoreModule } from '@agm/core';
import { ConlactLogComponent } from '../../property/conlact-log/conlact-log.component';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../customer.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { EmailStatusComponent } from 'src/app/shared/email-status/email-status.component';
import { SmsStatusComponent } from 'src/app/shared/sms-status/sms-status.component';
import { CommonModalComponent } from 'src/app/shared/common-modal/common-modal.component';
import { walletReachargeComponent } from 'src/app/shared/wallet-reacharge-modal/wallet-reacharge-modal.component';
import { RecordNameComponent } from 'src/app/shared/record-name/record-name.component';
import { RecordNameChangeComponent } from 'src/app/shared/record-name-change/record-name-change.component';
import { SetReminderComponent } from 'src/app/shared/set-reminder/set-reminder.component';
declare const google: any
declare var $: any;
require("inputmask/dist/inputmask/inputmask.numeric.extensions");
var Inputmask = require("inputmask/dist/inputmask/inputmask.date.extensions");

class PropDetail {
  Owner: string;
  OwnerFirstName_MI1: string;
  Owner1FirstName: string;
  OwnerLastname1: string;
  id: number;
  LMSSalePrice: string;
  Address: string;
  SitusHouseNumber: string;
  SitusStreetName: string;
  SitusMode: string;
  County: string;
  APN_FORMATTED: string;
  ElementarySchool: string;
  City: string;
  SitusCity: string;
  State: string;
  Zip: string;
  SitusZipCode: string;
  SitusState: string;
  Bathrooms: string;
  BathroomsNew: string;
  Bedrooms: string;
  SumOfBedRooms: string;
  NeighborhoodName: string;
  ESTIMATED_ALUE: string;
  LotSize: string;
  UsableLotSize: string;
  status: number;
  for_closue_status: string
  open_lien_status: string
  property_detail_status: string
  tax_status_status: string
  total_view_report_flag?:any
  transaction_hostory_report_flag?:any
  sales_comparable_report_flag?:any
  title_chain_lien_report_flag?:any
  hoa_lien_report_flag?:any
  pace_lien_report_flag?:any
  notes: string
  prop_id: number
  oppurtunity_status: number
  opportunity_status: number
  // new fields are added
  NumberOfDiningRooms: number
  DiningRooms: number
  NumberOfFamilyRooms: number
  FamilyRooms: number
  email: any
  phone: any
  phone2: any
  YearBuilt: any
  OwnerRelationshipType: any
  Subdivision: any
  ACRES: any
  LandSquareFootage: any
  BuildingAreaSqft: any
  GrossLivingArea: any
  LegalLot: any
  TaxYear: any
  AssessedYear: any
  AssdLandValue: any
  HomeEquityPercentage: any
  HomeEquityValue: any
  email_search_flag: any
  phone_search_flag: any
  batch_search_email_flag: any
  batch_search_phone_flag: any
  MktTotalValue: any
  SitusDirection: any
  SitusPostDirection: any
  SitusUnitNumber: any
  APNFormatted: any
  OpportunityZone: any
  Owner1PropertiesOwned: any
  MedianHouseholdIncome: any
  EstimatedHouseholdIncome: any
  Investing: any
  CharitableDonations: any
  alternate_email1: any
  email2: any
  MailHouseNumber: any
  MailHouseNumber2: any
  MailDirection: any
  MailStreetName: any
  MailStreetNameSuffix: any
  MailPostDirection: any
  MailUnitNumber: any
  MailCity: any
  AlternateMailingCity: any
  MailState: any
  MailZZIP9: any
  LandUse: any
  SumOfAboveLivingSquareFootage: any
  FullBaths: any
  HalfBaths: any
  GarageType: any
  ConstructionType: any
  Foundation: any
  ParkingType: any
  Pool: any
  SumOfGroundFloorSquareFeet: any
  Condition: any
  SchoolDistrict1: any
  MiddleSchool: any
  HighSchool: any
  LMSLender: any
  LMSFirstMtgAmount: any
  LMSTitleCompany: any
  LMSSecondMtgAmount: any
  AssdTotalValue: any
  MktLandValue: any
  TotalValueTaxable: any
  Gender: any
  DOB: any
  Occupation: any
  PresenceOfChildren: any
  Education: any
  MaritalStatusInHousehold: any
  HomeOwnerRenter: any
  Religion: any
  alternate_email2: any
  AlternateSitusCity: any
  AlternateAPN: any
  PropertyTax: any
}

class Action {
  id: number;
  status: number;
}

class iResults{
  '#NormalizedRawScore': string
  '#RawMatchCodes': string
  '#RawScore': string
  '#WeightedScore': string
  Address?: string
  City?: string
  FirstName?: string
  LastName?: string
  SOHOIndicator?: string
  State?: string
  TimeStamp?: string
  Zip?: string
  DOB?:string
  AgeRange?: string
  EthnicGroup?: string
  SingleParent?: string
  SeniorAdultInHousehold?: string
  YoungAdultInHousehold?: string
  BusinessOwner?: string
  Language?: string
  Religion?: string
  NumberOfChildren?: string
  MaritalStatusInHousehold?: string
  HomeOwnerRenter?: string
  Education?: string
  Occupation?: string
  OccupationDetail?:string
  Gender?: string
  PresenceOfChildren?: string
}

// interface iData{
//   results:Array<iResults>
// }

// class Demograph{
//   datafinder:iData
// }
@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  postOppurtunityModel = {};
  demographData=new iResults()
  OppStatus : any ;
  OppStatusImg: any ;
  type1 : any;
  rows_selected: any = [];

  proceedLoader: boolean = false;

  checkedText: boolean = false;
  checkedEmail: boolean = false;
  checkedPost: boolean = false;
  currentBalance: number = 0;
  texto: string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = 0;
  lng: number = 0;
  zoom: number = 15;
  amountToDeduct: number;
  currentAmount: number;
  reportData: any;
  loader1: boolean = false;
  loader2: boolean = false;
  loader3: boolean = false;
  loader4: boolean = false;
  loader5: boolean = false;
  loader6: boolean = false;
  loader7: boolean = false;
  loader8: boolean = false;
  loader9: boolean = false;
  loader10: boolean = false;


  imageLoading: boolean = true;
  img: string = "";
  defaultImg: boolean = false;
  defaultNote: boolean = false;
  noteForm: FormGroup;
  currentStep:number = 1
  imgStatus: number;
  property = new PropDetail();
  submit: boolean = false;
  months: any = [];
  years: any = [];
  depositeForm: FormGroup;
  action = new Action();
  constructor( private modal: NgbModal, private customerService: CustomerService, private router: ActivatedRoute, private route: Router, private fb: FormBuilder, private authService: AuthService, public sanitizer: DomSanitizer, private toastr: ToastrService) {
    //this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    for (let index = 1; index <= 12; index++) {
      this.months.push(index);
    }
    let year = new Date().getFullYear()
    for (let index = year; index <= (year + 25); index++) {
      this.years.push(index);
    }
    this.noteForm = this.fb.group({
      note: ['', Validators.required],
      id: ['', Validators.required],
    })
    $('#cover-spin').show(0);
    this.authService.searchDetail(this.router.params['value'].id)
      .subscribe((data) => {
        console.log(data, 'searchdetail')
        this.property = data.data
        this.property.phone2 = this.property.phone2 === '' ? [] : JSON.parse(this.property.phone2);
        this.OppStatus = data.data.opportunity_status;
        this.imgStatus = data.data.status;
        let status = this.OppStatus;
        switch(status){
          case 0:
            this.OppStatusImg = 'assets/images/nostatus.png'
            break;
          case 1:
            this.OppStatusImg = 'assets/images/pros.png'
            break;
          case 2:
            this.OppStatusImg = 'assets/images/qulification.png'
            break;
          case 3:
            this.OppStatusImg = 'assets/images/analysis.png'
            break;
          case 4:
            this.OppStatusImg = 'assets/images/value-proposition.png'
            break;
          case 5:
            this.OppStatusImg = 'assets/images/dec-make.png'
            break;
          case 6:
            this.OppStatusImg = 'assets/images/per-analysis.png'
            break;
          case 7:
            this.OppStatusImg = 'assets/images/proposal.png'
            break;
          case 8:
            this.OppStatusImg = 'assets/images/negotion.png'
            break;
          case 9:
            this.OppStatusImg = 'assets/images/closed-won.png'
            break;
          case 10:
            this.OppStatusImg = 'assets/images/lost.png'
            break;
        }

        this.noteForm.patchValue({
          'note': this.property.notes,
          'id': this.property.prop_id,
        })

      }, (error) => {
        console.log(error)
      })
      $('#cover-spin').hide(0);

    this.authService.getDemograph(this.router.params['value'].id).subscribe((data) => {
      console.log(data)
      $('#cover-spin').hide(0);
      this.demographData=data.data.data
      console.log(this.demographData)
      console.log(data, 'demograph')
    }, (error) => {
      console.log(error)
    })
    this.authService.getPropertyDetail(this.router.params['value'].id).subscribe((data) => {
      console.log(data)
      $('#cover-spin').hide(0);
      if (data.data.Latitude) {
        this.lat = parseFloat(data.data.Latitude);
        this.lng = parseFloat(data.data.Longitude);
        this.drawMap(this.lat, this.lng);
      } else {
        this.authService.getPropertyImage(this.router.params['value'].id).subscribe(image => {
          console.log(image);
          if (image.lat == 0 && image.lng == 0) {
            this.defaultImg = true;
            $('#pano').hide();
            $('#googleMap').hide();
            return;
          }
          this.lat = parseFloat(image.lat);
          this.lng = parseFloat(image.lng);
          this.drawMap(this.lat, this.lng);
          this.defaultNote = true;
        });
      }
    }, (error) => {
      console.log(error)
    })
  }

  changeGrid(arg:number):void {
    this.currentStep=arg
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

  ngOnInit() {// Faq2
    // $('#cover-spin').show(0);
    Inputmask({ autoUnmask: true }).mask(document.querySelectorAll("input"));
    this.authService.getWallet().subscribe(data => {
      this.amountToDeduct = data.data.perReportRate;
      this.currentAmount = data.data.current_points;
    }, error => {
      console.log(error)
    });
    $('body.modal-open #paymentModal').on('click', function (event) {
      alert('dgdfh')
      event.preventDefault();
    });
    $("#prop_content_part .accordian .accordian-heading").click(function () {
      $(this).next(".accordian_content").slideToggle();
      $(this).toggleClass("active_accordian");
      $(this).parent().prevAll(".accordian").find(".accordian_content").slideUp();
      $(this).parent().nextAll(".accordian").find(".accordian_content").slideUp();
      $(this).parent().prevAll(".accordian").find(".accordian-heading").removeClass("active_accordian");
      $(this).parent().nextAll(".accordian").find(".accordian-heading").removeClass("active_accordian");
    });
    this.depositeForm = this.fb.group({
      amount: ['', [Validators.required]],
      // currentBalance: ['', [Validators.required]],
      // perReportRate: ['', [Validators.required]],
      // recordCount: [1, [Validators.required]]
    })
  }

  photoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/place?key=AIzaSyDi5_7zfWTQ-11nxgrQTexz5h88F-CcegI&q=' + this.property.Address)
  }

  public onOpenFlyout = (info) =>
  this.openFlyout(info);
 private openFlyout(info)
 {
   const modalRef = this.modal.open(ConlactLogComponent, { windowClass: 'flyout-right' });
   modalRef.componentInstance.info = info;
 }
  contactlog(){
    this.onOpenFlyout(this.property.id)
  }

  setOppurtunity(value) {
    if (this.property.prop_id) {
    //  $('#cover-spin').show(0);
     this.postOppurtunityModel['Property_id'] = [this.property.prop_id]
     this.postOppurtunityModel['opportunity_status_value'] = value;
     this.authService.saveOppurtunity(this.postOppurtunityModel).subscribe((data) => {
      //  $('#prospectTbl').DataTable().clear();
      //  $('#prospectTbl').DataTable().ajax.reload();
      //  $('#cover-spin').hide(0);
      console.log(data, 'saveoppurt')
       this.OppStatus =  this.property.opportunity_status;
       this.imgStatus = this.property.status;
       let status = this.OppStatus;
       switch(status){
         case 0:
           this.OppStatusImg = 'assets/images/nostatus.png'
           break;
         case 1:
           this.OppStatusImg = 'assets/images/pros.png'
           break;
         case 2:
           this.OppStatusImg = 'assets/images/qulification.png'
           break;
         case 3:
           this.OppStatusImg = 'assets/images/analysis.png'
           break;
         case 4:
           this.OppStatusImg = 'assets/images/value-proposition.png'
           break;
         case 5:
           this.OppStatusImg = 'assets/images/dec-make.png'
           break;
         case 6:
           this.OppStatusImg = 'assets/images/per-analysis.png'
           break;
         case 7:
           this.OppStatusImg = 'assets/images/proposal.png'
           break;
         case 8:
           this.OppStatusImg = 'assets/images/negotion.png'
           break;
         case 9:
           this.OppStatusImg = 'assets/images/closed-won.png'
           break;
         case 10:
           this.OppStatusImg = 'assets/images/lost.png'
           break;
       }
      // location.reload();
      this.toastr.success(data.message,'success');
     }, (error) => {
       $('#cover-spin').hide(0);
     });
   }
 else {
     this.toastr.error('Please select at least one record');
   }
 }
  bulb() {
    this.imgStatus = this.imgStatus == 1 ? 0 : 1
    this.action.id = this.property.prop_id;
    this.action.status = this.imgStatus;
    this.authService.postAction(this.action).subscribe((data) => {
      console.log(data)
    }, (error) => {
      console.log(error)
    })
  }

  fire() {
    this.imgStatus = this.imgStatus == 2 ? 0 : 2
    this.action.id = this.property.prop_id;
    this.action.status = this.imgStatus;
    this.authService.postAction(this.action).subscribe((data) => {
      console.log(data)
    }, (error) => {
      console.log(error)
    })
  }

  reminder(){
    this.authService.getReminderById(this.property.prop_id).subscribe(data=>{
      const modalRef = this.modal.open(SetReminderComponent,{size:'xl'})
      modalRef.componentInstance.property_id=this.property.prop_id
      modalRef.componentInstance.reminders=data.data
      modalRef.result.then((result) => {
        console.log(result)
        if(result!==1){
          this.authService.setReminder(result).subscribe(data=>{
            this.toastr.success('Reminder set successfully!', 'Success!');
          })
        }
      }, (reason) => {
        console.log('reason ', reason);
      })

    })
  }

  trash() {
    let prospect = this.imgStatus == 2 ? "Hot Prospects" : "Warm Prospects"
    if (confirm("Are you sure to remove this property from " + prospect + " ? If yes, you can recover this from Trash anytime :)")) {
      const tra = { id: this.property.prop_id }
      this.authService.pushTrash(tra).subscribe((data) => {
        console.log(data)
        this.route.navigate(['/customer/trash']);
      }, (error) => {
        console.log(error)
      });
    }
  }
  submitForm() {
    if (this.noteForm.invalid) {
      console.log('error');
      return;
    }

    this.authService.saveNote(this.noteForm.value)
      .subscribe(data => {
        // alert("Updated Successfully")
        this.toastr.success('Updated Successfully!', 'Success!');
      }, error => {
        console.log(error)
      })

  }
  addSMSEmailToProspects(type1: any): void {
    let rows_selected = this.property.prop_id ;
    let type = type1;
    this.checkedText = true;
    if (type == 'phone'){
      this.checkedText = true;
      this.checkedEmail = false;
      this.checkedPost = false;
    }
    else if (type == 'email'){
      this.checkedText = false;
      this.checkedEmail = true;
      this.checkedPost = false;
    }
    if (type == 'postcard'){
      this.checkedText = false;
      this.checkedEmail = false;
      this.checkedPost = true;
    }

          this.customerService.getBatchPaymentDetails(rows_selected, type)
          .subscribe(
            (data: any) => {
              let batchdata = data.data;

              console.log(batchdata, 'batch data')
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
                this.checkWallet(batchdata,msg);
              } else {
                this.checkWallet(batchdata,null);
              }

          }, err => {
            this.toastr.error(err, 'Error!');
          }
    )


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
addSMSEmailToProspects2() {
    let rows_selected = this.property.prop_id ;
    if(this.checkedEmail)
    this.authService.postBatchProcessEmail(rows_selected,'').subscribe(data=>{
      console.log(data, 'email data')
      this.checkedPost = false;
    })

    if(this.checkedText)
    this.authService.postBatchProcessPhone(rows_selected,'').subscribe(data=>{
      console.log(data, 'phone data')
      this.checkedPost = false;
    })

    if(this.checkedPost){
      $('#wallet_success').modal('hide');
      localStorage.setItem('postCardMember', JSON.stringify(this.property.prop_id));
      // this.router.navigate(['/customer/postcard'])
    }


}
  reportDownload(arg) {
    if (arg == 1) {
      this.loader1 = true
    }
    else if (arg == 2) {
      this.loader2 = true
    }
    else if (arg == 3) {
      this.loader3 = true
    }
    else if (arg == 4) {
      this.loader4 = true
    }
    else if (arg == 5) {
      this.loader5 = true
    }
    else if (arg == 6) {
      this.loader6 = true
    }
    else if (arg == 7) {
      this.loader7 = true
    }
    else if (arg == 8) {
      this.loader8 = true
    }
    else if (arg == 9) {
      this.loader9 = true
    }
    else {
      this.loader10 = true
    }
    const data = { property_type: arg, property_id: this.router.params['value'].id }

    this.authService.generateReport(data)
      .subscribe(data => {
        console.log(data)
        if (data) {
          this.loader1 = false;
          this.loader2 = false;
          this.loader3 = false;
          this.loader4 = false;
          this.loader5 = false;
      this.loader6 = false;
      this.loader7 = false;
      this.loader8 = false;
      this.loader9 = false;
      this.loader10 = false;
        }
        window.open(data.data.url, "_blank");
        //location.reload()
      }, error => {
        this.toastr.error(error, 'Error!');
        //alert(error)
        this.loader1 = false;
        this.loader2 = false;
        this.loader3 = false;
        this.loader4 = false;
        this.loader5 = false;
      this.loader6 = false;
      this.loader7 = false;
      this.loader8 = false;
      this.loader9 = false;
      this.loader10 = false;
      })

  }

  chkAvailability(arg) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    if (this.amountToDeduct) {
      if (confirm(formatter.format(this.amountToDeduct) + " will be deducted from your Wallet if report exist.")) {
        this.reportData = { property_type: arg, property_id: this.router.params['value'].id };
        if (arg == 1) {
          this.loader1 = true
        }
        else if (arg == 2) {
          this.loader2 = true
        }
        else if (arg == 3) {
          this.loader3 = true
        }
        else if (arg == 4) {
          this.loader4 = true
        }
        else if (arg == 5) {
          this.loader5 = true
        }
        else if (arg == 6) {
          this.loader6 = true
        }
        else if (arg == 7) {
          this.loader7 = true
        }
        else if (arg == 8) {
          this.loader8 = true
        }
        else if (arg == 9) {
          this.loader9 = true
        }
        else {
          this.loader10 = true
        }
        if (this.currentAmount >= this.amountToDeduct) {
          this.downloadReport(this.reportData);
        } else {
          // if(confirm('$'+ this.amountToDeduct + ' will be required to check availability and download this report. Currently "$'+this.currentAmount+'" available in your wallet. Would you like to add funds?')) {
          this.depositeForm.patchValue({
            'amount': this.amountToDeduct - this.currentAmount,
            // 'currentBalance': this.currentAmount,
            // 'perReportRate': this.amountToDeduct
          });
          console.log(this.amountToDeduct - this.currentAmount)
          this.depositeForm.get('amount').setValidators([Validators.min(this.minAmount())])
          $('#paymentModal').modal({ backdrop: 'static', keyboard: false }).show();
          // }
        }
      }
    }

  }
  closeDepositeForm() {
    this.submit = false;
    this.loader1 = false;
    this.loader2 = false;
    this.loader3 = false;
    this.loader4 = false;
    this.loader5 = false;
      this.loader6 = false;
      this.loader7 = false;
      this.loader8 = false;
      this.loader9 = false;
      this.loader10 = false;
    this.depositeForm.reset();
    this.depositeForm.patchValue({
      "amount": this.amountToDeduct - this.currentAmount,
    });
  }
  deposite() {
    console.log(this.depositeForm.value)
    // if (Number(parseFloat(this.depositeForm.get('amount').value).toFixed(2)) < .50) {
    //   this.depositeForm.get('amount').setValue(.5)
    //   alert('Please deposit at least $.50');
    //   return;
    // }
    $('#cover-spin').show(0);
    this.submit = true;
    if (!this.depositeForm.valid) {
      console.log('error')
      $('#cover-spin').hide(0);
      return;
    }
    this.authService.walletRecharge(this.depositeForm.value)
      .subscribe((data) => {
        console.log(data)
        $('#paymentModal').modal('hide');
        this.toastr.success(data.message, 'Success!');
        //alert(data.message)
        this.depositeForm.reset();
        this.submit = false;
        this.downloadReport(Object.assign(this.reportData, data.data));
        $('#cover-spin').hide(0);
      }, (error) => {
        console.log(error)
        $('#paymentModal').modal('hide');
        $('#cover-spin').hide(0);
        this.toastr.error(error, 'Error!');
        this.loader1 = false;
        this.loader2 = false;
        this.loader3 = false;
        this.loader4 = false;
        this.loader5 = false;
      this.loader6 = false;
      this.loader7 = false;
      this.loader8 = false;
      this.loader9 = false;
      this.loader10 = false;
        //alert(error)
      })
  }
  downloadReport(data) {
    let propType = data.property_type;
    this.authService.generateReport(data).subscribe(data => {
      let tmpData: any = data;
      window.open(tmpData.data.url, "_blank");
      //location.reload()
      if (propType == 1) {
        this.property.for_closue_status = '1';
      } else if (propType == 2) {
        this.property.open_lien_status = '1';
      } else if (propType == 3) {
        this.property.property_detail_status = '1';
      } else if (propType == 4) {
        this.property.tax_status_status = '1';
      }else if (propType == 5) {
        this.property.total_view_report_flag = '1';
      }else if (propType == 6) {
        this.property.transaction_hostory_report_flag = '1';
      }else if (propType == 7) {
        this.property.sales_comparable_report_flag = '1';
      }else if (propType == 8) {
        this.property.title_chain_lien_report_flag = '1';
      }else if (propType == 9) {
        this.property.hoa_lien_report_flag = '1';
      }else if (propType == 10) {
        this.property.pace_lien_report_flag = '1';
      }
      this.loader1 = false;
      this.loader2 = false;
      this.loader3 = false;
      this.loader4 = false;
      this.loader5 = false;
      this.loader6 = false;
      this.loader7 = false;
      this.loader8 = false;
      this.loader9 = false;
      this.loader10 = false;
    }, error => {
      this.toastr.error(error, 'Error!');
      this.loader1 = false;
      this.loader2 = false;
      this.loader3 = false;
      this.loader4 = false;
      this.loader5 = false;
      this.loader6 = false;
      this.loader7 = false;
      this.loader8 = false;
      this.loader9 = false;
      this.loader10 = false;
      //alert(error)
    })
  }
  drawMap(la, lo) {


    var map;
    var panorama;
    var berkeley = { lat: la, lng: lo };
    var sv = new google.maps.StreetViewService();

    panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

    // Set up the map.
    map = new google.maps.Map(document.getElementById('map'), {
      center: berkeley,
      zoom: 16,
      streetViewControl: false
    });

    // Set the initial Street View camera to the center of the map
    sv.getPanorama({ location: berkeley, radius: 50 }, processSVData);

    // Look for a nearby Street View panorama when the map is clicked.
    // getPanorama will return the nearest pano when the given
    // radius is 50 meters or less.
    map.addListener('click', function (event) {
      sv.getPanorama({ location: event.latLng, radius: 50 }, processSVData);
    });


    function processSVData(data, status) {
      if (status === 'OK') {
        var marker = new google.maps.Marker({
          position: data.location.latLng,
          map: map,
          title: data.location.description
        });

        panorama.setPano(data.location.pano);
        panorama.setPov({
          heading: 270,
          pitch: 0
        });
        panorama.setVisible(true);

        marker.addListener('click', function () {
          var markerPanoID = data.location.pano;
          // Set the Pano to use the passed panoID.
          panorama.setPano(markerPanoID);
          panorama.setPov({
            heading: 270,
            pitch: 0
          });
          panorama.setVisible(true);
        });
      } else {
        console.error('Street View data not found for this location.');
        $('#pano').hide();
        $('#googleMap').addClass('col-12');
      }
    }
  }
  sendMarketing(arg){
    this.rows_selected.push(this.property.prop_id);
      if(arg=='email'){
        this.authService.emailMarketingData(this.rows_selected.join(),'email' , 'datatree').subscribe(data=>{
          const modalRef = this.modal.open(RecordNameComponent, { size: 'lg' });
          modalRef.componentInstance.data = data.data;
          modalRef.componentInstance.rows = this.rows_selected.join();
          modalRef.componentInstance.type = 'email';
          modalRef.result.then((result) => {
            if(result===1){
              const modalRef = this.modal.open(RecordNameChangeComponent, { size: 'lg' });
              modalRef.componentInstance.data = data.data;
              modalRef.componentInstance.rows = this.rows_selected.join();
              modalRef.componentInstance.type = 'email';
            }
            else if(result===2){
              const modalRef = this.modal.open(EmailStatusComponent, { size: 'lg' });
              modalRef.componentInstance.data = data.data;
              modalRef.componentInstance.rows = this.rows_selected.join();
            }

          })
        })
      }
      else if(arg=='phone'){
        this.authService.emailMarketingData(this.rows_selected.join(),'phone', 'datatree').subscribe(data=>{
          console.log(data)
          const modalRef = this.modal.open(RecordNameComponent, { size: 'lg' });
          modalRef.componentInstance.data = data.data;
          modalRef.componentInstance.rows = this.rows_selected.join();
          modalRef.componentInstance.type = 'phone';
          modalRef.result.then((result) => {
            if(result===1){
              const modalRef = this.modal.open(RecordNameChangeComponent, { size: 'lg' });
              modalRef.componentInstance.data = data.data;
              modalRef.componentInstance.rows = this.rows_selected.join();
              modalRef.componentInstance.type = 'phone';
            }
            else if(result===2){
              const modalRef = this.modal.open(SmsStatusComponent, { size: 'lg' });
              modalRef.componentInstance.data = data.data;
              modalRef.componentInstance.rows = this.rows_selected.join();
            }

          })
        })
      }
      else if(arg=='postcard'){
        localStorage.setItem('postCardMember',this.rows_selected.join());
        this.route.navigate(['/customer/postcard/create'])
      }

  }

  minAmount(){
    if((this.amountToDeduct - this.currentAmount) >= 50)
      return this.amountToDeduct - this.currentAmount;
    else return 50;
  }

  // get pencilButton(){
  //   return this.property.phone ? true: true
  // }

}
