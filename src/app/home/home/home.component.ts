import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators, FormArray,FormGroup  } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';  
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {
  counterInit:number=1; 
  loginData:any;
  userLoggedIn:boolean=false;
  trendingProperties:string;
  latestNews:string;
  homeDetails:string;
  home_slider_title:String;
  home_slider_conent:String;
  home_slider_video:SafeUrl;
  home_slider_video_title:String;
  service_title_1_image:String;
  service_title_1:String;
  service_title_1_content:String;
  service_title_2_image:String;
  service_title_2:String;
  service_title_2_content:String;
  service_title_3_image:String;
  service_title_3:String;
  service_title_3_content:String;
  category_section_title:String;
  category_content:String;
  kickstart_section_title:String;
  kickstart_content:String;
  playstore_title:String;
  playstore_content:String;
  play_store_images:any;
  ca_heading:String;
  counter_1:number;
  counter_2:number;
  counter_3:number;
  counter_4:number;
  counter_5:number;
  title_1:String;
  title_2:String;
  title_3:String;
  title_4:String;
  title_5:String;
  sliderImages:any;
  constructor(private router:Router, private authService:AuthService, private fb:FormBuilder, private modalService: NgbModal, private sanitizer: DomSanitizer,private toastr: ToastrService) {
    this.authService.getHomeBanner().subscribe((data)=>{
      this.home_slider_title = data.banner.home_slider_title;
      this.home_slider_conent = data.banner.home_slider_conent;
      this.home_slider_video = this.sanitizer.bypassSecurityTrustResourceUrl((data.banner.home_slider_video).replace('watch?v=','embed/'));
      this.home_slider_video_title = data.banner.home_slider_video_title;
     // this.home_slider_image = data.data.home_slider_image;      
    },(error)=>{
      console.log(error)
    })
    this.loginData=JSON.parse(localStorage.getItem('currentUser'));
    if(this.loginData && this.loginData.token){
      this.userLoggedIn=true;
    }
    if(!this.userLoggedIn){
      this.authService.getKickList()
      .subscribe((user)=>{
        console.log(user)
        this.images=user.data
      })
    }
    else{
      this.authService.getKickListLogin()
      .subscribe((user)=>{        
        console.log(user)
        this.images=user.data
      })  
    }    
   }
   open(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
    // alert('Closed with:' + result)// this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
     // alert('Dismissed with:' + reason)//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  

  subFrom:FormGroup;
  images:any=[];
  submit:boolean=false;  
  ngOnInit() {
    //window.addEventListener('scroll', this.scroll, true); //third parameter

    this.subFrom=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      aliases: this.fb.array([
        this.fb.control('')
      ])
    })
   
    // this.authService.getHomeService().subscribe((data)=>{
    //   this.service_title_1_image = data.data.service_title_1_image;
    //   this.service_title_1 = data.data.service_title_1;
    //   this.service_title_1_content = data.data.service_title_1_content;
    //   this.service_title_2_image = data.data.service_title_2_image;
    //   this.service_title_2 = data.data.service_title_2;
    //   this.service_title_2_content = data.data.service_title_2_content;
    //   this.service_title_3_image = data.data.service_title_3_image;
    //   this.service_title_3 = data.data.service_title_3;
    //   this.service_title_3_content = data.data.service_title_3_content;
    // },(error)=>{
    //   console.log(error)
    // }) 
    // this.authService.getHomeKickstarter().subscribe((data)=>{
    //   this.kickstart_section_title = data.data.kickstart_section_title;
    //   this.kickstart_content = data.data.kickstart_content;
    // },(error)=>{
    //   console.log(error)
    // }) 
    // this.authService.getHomeCounter().subscribe((data)=>{
    //   this.ca_heading = data.data.ca_heading;
    //   this.counter_1 = parseInt(data.data.counter_1);
    //   this.counter_2 = parseInt(data.data.counter_2);
    //   this.counter_3 = parseInt(data.data.counter_3);
    //   this.counter_4 = parseInt(data.data.counter_4);
    //   this.counter_5 = parseInt(data.data.counter_5);
    //   this.title_1 = data.data.title_1;
    //   this.title_2 = data.data.title_2;
    //   this.title_3 = data.data.title_3;
    //   this.title_4 = data.data.title_4;
    //   this.title_5 = data.data.title_5;  
    // },(error)=>{
    //   console.log(error)
    // }) 
    // this.authService.getHomePlaystore().subscribe((data)=>{
    //   this.playstore_title = data.data.playstore_title;
    //   this.playstore_content = data.data.playstore_content;
    //   this.play_store_images = data.play_store_images;
    // },(error)=>{
    //   console.log(error)
    // }) 
    $('#cover-spin').show(0);
    this.authService.getHomeDetails().subscribe((data)=>{
      
      console.log(data)
      this.homeDetails = data.data; 
      this.sliderImages=data.data.home_slider_image;
      this.service_title_1_image = data.data.service_title_1_image;
      this.service_title_1 = data.data.service_title_1;
      this.service_title_1_content = data.data.service_title_1_content;
      this.service_title_2_image = data.data.service_title_2_image;
      this.service_title_2 = data.data.service_title_2;
      this.service_title_2_content = data.data.service_title_2_content;
      this.service_title_3_image = data.data.service_title_3_image;
      this.service_title_3 = data.data.service_title_3;
      this.service_title_3_content = data.data.service_title_3_content;
      this.kickstart_section_title = data.data.kickstart_section_title;
      this.kickstart_content = data.data.kickstart_content;
      this.ca_heading = data.data.ca_heading;
      this.counter_1 = parseInt(data.data.counter_1);
      this.counter_2 = parseInt(data.data.counter_2);
      this.counter_3 = parseInt(data.data.counter_3);
      this.counter_4 = parseInt(data.data.counter_4);
      this.counter_5 = parseInt(data.data.counter_5);
      // this.counter_1 = data.data.counter_1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // this.counter_2 = data.data.counter_2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // this.counter_3 = data.data.counter_3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // this.counter_4 = data.data.counter_4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // this.counter_5 = data.data.counter_5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.title_1 = data.data.title_1;
      this.title_2 = data.data.title_2;
      this.title_3 = data.data.title_3;
      this.title_4 = data.data.title_4;
      this.title_5 = data.data.title_5;  
      this.playstore_title = data.data.playstore_title;
      this.playstore_content = data.data.playstore_content;
      this.play_store_images = data.play_store_images;
      
      this.category_section_title = data.data.category_section_title;
      this.category_content = data.data.category_content;
      this.onAppear([this.counter_1,this.counter_2,this.counter_3,this.counter_4,this.counter_5]); 
      $('#banners').css('background-image', 'url("'+this.sliderImages+'")');
      $('#cover-spin').hide(0);
      this.onAppear([this.counter_1,this.counter_2,this.counter_3,this.counter_4,this.counter_5]); 
    },(error)=>{
      console.log(error)
    })

    this.authService.getTrendingProperties().subscribe((data)=>{
      this.trendingProperties=data.data
    },(error)=>{
      console.log(error)
    })
    this.authService.getNews().subscribe((data)=>{
      this.latestNews=data.recent
      console.log(data)
    },(error)=>{
      console.log(error)
    })   
  } 
  
  // openSearch(){
  //   if(!this.userLoggedIn){
  //     this.router.navigate(['/authentication/register']);
  //   } else{
  //     this.router.navigate(['/customer/advance']);
  //   }
  // }  
  viewHotLeads(){
    if(!this.userLoggedIn){
      this.router.navigate(['/authentication/register']);
    } else{
      this.authService.getProfile().subscribe((data)=>{        
        if(data.data.member){
          if(confirm("50 points will be deduct from Wallet")) {
            this.router.navigate(['/search/hot-leads']);
          }
        } else{
          this.router.navigate(['about/membership/payment']);
        }
      },(error)=>{
        console.log(error)
      })       
    }
  }
  viewLatestListing(){
    if(!this.userLoggedIn){
      this.router.navigate(['/authentication/register']);
    } else{
      this.router.navigate(['/search/explore']);
    }
  }

  onChangeRedirect(){
    if(!this.userLoggedIn){
      this.router.navigate(['/authentication/register']);
    } else{
      this.router.navigate(['/customer/advance']);
    }
  }

  onAppear(arr:any){    
    $('.counter-value').each(function(index) {        
      var $this = $(this),
        //countTo = $this.attr('data-count');
        countTo = arr[index];
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },
        {  
          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text((this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")); 
          },
          done:function(){
            
          }
        });
    });
  }

  scroll(){    
    let a=0
    var oTop = $('#counter').offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
      $('.counter-value').each(function() {        
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
            countNum: countTo
          },
          {  
            duration: 2000,
            easing: 'swing',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text((this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));  
              window.removeEventListener('scroll', this.scroll, true);            
            },
            done:function(){
              window.removeEventListener('scroll', this.scroll, true);
            }
          });
      });
      a = 1;      
    } 
      
  }



  saveLike(arg,id){
    if(!this.userLoggedIn){
      this.router.navigate(['/authentication/login']);
    }
    
    let idData={id:id}
    this.authService.saveLike(idData)
    .subscribe(data=>{
      this.images[arg].status= this.images[arg].status==1? null : 1;
     // console.log(data)
    },error=>{
      console.log(error)
    })

  }

   
  submitForm(){
    this.submit=true;
    if(!this.subFrom.valid){
      console.log('error');
      return;
    }

  
    this.authService.getSubscribe(this.subFrom.value)
    .subscribe((data)=>{
      this.toastr.success(data.message, 'Success!');
      //alert(data.message)
    },
    (error)=>{
      this.toastr.error(error, 'Error!');
      //alert(error)
      this.subFrom.reset
      console.log(error)
    })
    this.submit=false;
    this.subFrom.reset()
  }

}
