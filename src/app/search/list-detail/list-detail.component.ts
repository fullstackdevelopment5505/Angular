import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import {FormBuilder, Validators, FormArray,FormGroup  } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import { error } from 'protractor';
import { AgmCoreModule } from '@agm/core';
import { ToastrService } from 'ngx-toastr';
declare const google: any
declare var $: any;


class PropDetail{
  OWNER_1_FULL_NAME:string;        
  id:number;
  SalePrice:string;
  SITUS_FULL_ADDRESS:string;
  APN_FORMATTED:string;
  MAIL_STATE: string;
  NUMBER_OF_BATHS: string;
  NUMBER_OF_BEDROOMS: string;
  ESTIMATED_ALUE:string;
  LOT_AREA: string;
  status: string;
  for_closue_status: string
  open_lien_status: string
  property_detail_status: string
  tax_status_status: string
  notes: string
  prop_id:number
}

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})



export class ListDetailComponent implements OnInit {
  texto : string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = 0;
  lng: number = 0;
  zoom: number = 15;
  pointsToDeduct:number = 100;
  loader1:boolean=false;
  loader2:boolean=false;
  loader3:boolean=false;
  loader4:boolean=false;

  imageLoading:boolean=true;
  img:string="";
  noteForm:FormGroup;

  imgStatus:number;
  property=new PropDetail();
  submit:boolean=false;
  months:any=[];
  years:any=[];
  depositeForm:FormGroup;
  constructor(private router:ActivatedRoute,private route:Router,private fb:FormBuilder,private authService:AuthService,public sanitizer: DomSanitizer,private toastr: ToastrService) { 
    for (let index = 1; index <= 12; index++) {
      this.months.push(index);
    }
    let year=new Date().getFullYear()
    for (let index = year; index <= (year+25); index++) {
      this.years.push(index);
    }
    this.noteForm=this.fb.group({
      note:['',Validators.required],
      id:['',Validators.required],
    })
    $('#cover-spin').show(0);
    this.authService.searchDetail(this.router.params['value'].id)
    .subscribe((data)=>{
      console.log(data)
      this.property=data.data
      this.imgStatus=data.data.status;

      this.noteForm.patchValue({
        'note':this.property.notes,
        'id':this.property.prop_id,
      })

    },(error)=>{ 
      console.log(error)
    })

    this.authService.getPropertyDetail(this.router.params['value'].id).subscribe((data)=>{
     // console.log(data)   
     $('#cover-spin').hide(0);
      this.lat=data.data.Latitude;
      this.lng=data.data.Longitude  ;
        var fenway = {lat: this.lat, lng: this.lng};
        var map = new google.maps.Map(document.getElementById('map'), {
          center: fenway,
          zoom: 14
        });
        var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
              position: fenway,
              pov: {
                heading: 34,
                pitch: 10
              }
            });
        map.setStreetView(panorama);
    },(error)=>{ 
      console.log(error)
    })
    

  }

  ngOnInit() {// Faq2
   // $('#cover-spin').show(0);
    $("#prop_content_part .accordian .accordian-heading").click(function(){
      $(this).next(".accordian_content").slideToggle();
      $(this).toggleClass("active_accordian");
      $(this).parent().prevAll(".accordian").find(".accordian_content").slideUp();
      $(this).parent().nextAll(".accordian").find(".accordian_content").slideUp();
      $(this).parent().prevAll(".accordian").find(".accordian-heading").removeClass("active_accordian");
      $(this).parent().nextAll(".accordian").find(".accordian-heading").removeClass("active_accordian");
    });


  //   this.authService.getPropertyImage(this.router.params['value'].id)
  //   .subscribe(image=>{
  //     $('#cover-spin').hide(0);
  //     this.img=image.image_url;
  //     this.imageLoading=false;
  //     this.lat=image.lat;
  //     this.lng=image.lng;
  //       var fenway = {lat: this.lat, lng: this.lng};
  //       var map = new google.maps.Map(document.getElementById('map'), {
  //         center: fenway,
  //         zoom: 14
  //       });
  //       var panorama = new google.maps.StreetViewPanorama(
  //           document.getElementById('pano'), {
  //             position: fenway,
  //             pov: {
  //               heading: 34,
  //               pitch: 10
  //             }
  //           });
  //       map.setStreetView(panorama);
  // })
  this.depositeForm=this.fb.group({
    card_no:['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
    cvvNumber:['',[Validators.required,Validators.minLength(3),Validators.maxLength(4)]],
    ccExpiryMonth:['',Validators.required],
    ccExpiryYear:['',Validators.required],
    amount:['',[Validators.required]],    //,Validators.min(10)
  })

  }

photoUrl(){
   return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/place?key=AIzaSyDi5_7zfWTQ-11nxgrQTexz5h88F-CcegI&q='+this.property.SITUS_FULL_ADDRESS)
 }


  bulb(){
    this.imgStatus=this.imgStatus==1? 0 : 1
  } 

  fire(){
    this.imgStatus=this.imgStatus==2? 0 : 2
  }

  submitForm(){
    if(this.noteForm.invalid){
      console.log('error');
      return;
    }
 
    this.authService.saveNote(this.noteForm.value)
    .subscribe(data=>{
      this.toastr.success('Updated Successfully!', 'Success!');
      //alert("Updated Successfully")
    },error=>{
      console.log(error)
    })

  }

  reportDownload(arg){
    if(arg==1){
      this.loader1=true
    }
    else if(arg==2){
      this.loader2=true
    }
    else if(arg==3){
      this.loader3=true
    }
    else{
      this.loader4=true
    }
    const data={property_type:arg,property_id:this.router.params['value'].id}

    this.authService.generateReport(data)
    .subscribe(data=>{
      console.log(data)
      if(data){
        this.loader1=false;
        this.loader2=false;
        this.loader3=false;
        this.loader4=false;
      }
      window.open(data.data.url, "_blank");
      location.reload()
    },error=>{
      this.toastr.error(error, 'Error!');
      //alert(error)
      this.loader1=false;
      this.loader2=false;
      this.loader3=false;
      this.loader4=false;
    })

  }

  chkAvailability(arg){
    if(confirm('$'+ this.pointsToDeduct + " will be deducted from your Wallet if report exist.")) {
      this.authService.getWallet().subscribe(data=>{
         if(data.data.current_points>=this.pointsToDeduct){
           
          const data={property_type:arg,property_id:this.router.params['value'].id};
          this.authService.generateReport(data).subscribe(data=>{
            let tmpData:any = data;
            this.authService.updateWallet(this.pointsToDeduct).subscribe(data=>{              
              console.log(data)
              window.open(tmpData.data.url, "_blank");
              location.reload()
            },error=>{
              console.log(error)
            })           
          },error=>{
            this.toastr.error(error, 'Error!');
            //alert(error)
          })
         } else{
          if(confirm('$'+ this.pointsToDeduct + ' will be required to check availability and download this report. Currently "$'+data.data.current_points+'" available in your wallet. Would you like to add funds?')) {
            this.depositeForm.patchValue({    
              "amount":this.pointsToDeduct-data.data.current_points, 
              }); 
              $('#paymentModal').modal('show');
          } 
        }
      },error=>{
          console.log(error)
      });
    } 
  }
  deposite(){
    $('#cover-spin').show(0);
    this.submit=true;
    if(!this.depositeForm.valid){
      console.log('error')
      $('#cover-spin').hide(0);
      return;
    }
    this.authService.getDeposite(this.depositeForm.value)
    .subscribe((data)=>{
      console.log(data)
      $('#paymentModal').modal('hide');
      this.toastr.success(data.message, 'Success!');
      //alert(data.message)
      this.depositeForm.reset();
      this.submit=false; 
      location.reload();
      $('#cover-spin').hide(0);   
    },(error)=>{
      console.log(error)
      $('#paymentModal').modal('hide');
      $('#cover-spin').hide(0);
      this.toastr.error(error, 'Error!');
      //alert(error)
    })
  }   

}
