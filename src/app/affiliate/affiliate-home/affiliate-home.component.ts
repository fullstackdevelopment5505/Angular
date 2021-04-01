import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';  

@Component({
  selector: 'app-affiliate-home',
  templateUrl: './affiliate-home.component.html',
  styleUrls: ['./affiliate-home.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AffiliateHomeComponent implements OnInit {

  constructor(private authService:AuthService) { }
  banner_title:string;
  banner_content:string;
  become_affiliate_button:string;  
  title:string;
  description:string;
  title_1:string;
  title_2:string;
  title_3:string;
  content_1:string;
  content_2:string;
  content_3:string;
  titleNxt:string;
  descriptionNxt:string;
  titleNxt_1:string;
  titleNxt_2:string;
  titleNxt_3:string;
  titleNxt_4:string;
  titleNxt_5:string;
  titleNxt_6:string;
  contentNxt_1:string;
  contentNxt_2:string;
  contentNxt_3:string;
  contentNxt_4:string;
  contentNxt_5:string;
  contentNxt_6:string;
  progBenTitle:string; 
  progBenDescription:string;
  faqs:any=[];

  
  loginData:any;
  username:string;
  userLoggedIn:boolean=false;
  paidMember:boolean=true;
  ngOnInit() {
    $('#cover-spin').show(0);
    this.loginData=JSON.parse(localStorage.getItem('currentUser'));
    if(this.loginData && this.loginData.token){
      this.username=this.loginData.username;
      this.userLoggedIn=true;
      this.authService.getProfile().subscribe((data)=>{        
        if(data.data.member){
          this.paidMember = true;
        } else{
          this.paidMember = false;
        }
      },(error)=>{
        console.log(error)
      })
    }else{
      this.paidMember = false;
    }
    this.authService.getAffiliateCntnt().subscribe((data)=>{  
      //console.log(data)
      $('#cover-spin').hide(0);
      this.banner_title = data.banner.banner_title;
      this.banner_content = data.banner.banner_content;
      this.become_affiliate_button = data.become_affiliate_button;
      this.title = data.get_started.title;
      this.description = data.get_started.description;
      this.title_1 = data.get_started.box.title_1;
      this.title_2 = data.get_started.box.title_2;
      this.title_3 = data.get_started.box.title_3;
      this.content_1 = data.get_started.box.content_1;
      this.content_2 = data.get_started.box.content_2;
      this.content_3 = data.get_started.box.content_3;
      this.titleNxt = data.after_getstarted.title;
      this.descriptionNxt = data.after_getstarted.description;
      this.titleNxt_1 = data.after_getstarted.box.title_1;
      this.titleNxt_2 = data.after_getstarted.box.title_2;
      this.titleNxt_3 = data.after_getstarted.box.title_3;
      this.titleNxt_4 = data.after_getstarted.box.title_4;
      this.titleNxt_5 = data.after_getstarted.box.title_5;
      this.titleNxt_6 = data.after_getstarted.box.title_6;
      this.contentNxt_1 = data.after_getstarted.box.content_1;
      this.contentNxt_2 = data.after_getstarted.box.content_2;
      this.contentNxt_3 = data.after_getstarted.box.content_3;
      this.contentNxt_4 = data.after_getstarted.box.content_4;
      this.contentNxt_5 = data.after_getstarted.box.content_5;
      this.contentNxt_6 = data.after_getstarted.box.content_6;
      this.progBenTitle = data.program_benefits.title;
      this.progBenDescription = data.program_benefits.description;
     // this.
    },(error)=>{
      console.log(error)
    })
    this.authService.getAffiliateFaqs().subscribe((data)=>{  
      console.log(data)
      this.faqs = data;
    },(error)=>{
      console.log(error)
    })
  }

}
