import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

data:any=[]
description:string;
logo:string;
fbURL:string;
instaURL:string;
pinURL:string;
linkedInURL:string
twtURL:string;
youTubeURL:string;
footer_copyright:string;

  constructor(private authService:AuthService) {
    this.authService.getFooterNews()
    .subscribe(data=>{
      console.log(data.data);
      this.data=data.data;
      this.logo = data.footer.footer_logo;
      this.description = data.footer.footer_content;
      this.fbURL = (!data.footer.fb_url || data.footer.fb_url.startsWith("http"))?data.footer.fb_url:'https://'+data.footer.fb_url;
      this.instaURL =(!data.footer.insta_url || data.footer.insta_url.startsWith("http")) ?data.footer.insta_url:'https://'+data.footer.insta_url;
      this.pinURL = (!data.footer.pin_url || data.footer.pin_url.startsWith("http"))?data.footer.pin_url:'https://'+data.footer.pin_url;
      this.linkedInURL= (!data.footer.linkedin_url || data.footer.linkedin_url.startsWith("http"))?data.footer.linkedin_url:'https://'+data.footer.linkedin_url;      
      this.twtURL = (!data.footer.twt_url || data.footer.twt_url.startsWith("http"))?data.footer.twt_url:'https://'+data.footer.twt_url;  
      this.youTubeURL = (!data.footer.youtube_url || data.footer.youtube_url.startsWith("http"))?data.footer.youtube_url:'https://'+data.footer.youtube_url;      
    });   
    this.authService.getFooterCopyCntnt().subscribe(data=>{
      this.footer_copyright = data.footer_copyright;
    });   
   }
  ngOnInit() {
  }

}
