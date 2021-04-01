import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(private authService:AuthService) { }
  pageTitle:string;
  pageCntnt:string;
  ngOnInit() {
    $('#cover-spin').show(0);
    this.authService.getPrivacy()
    .subscribe((data)=>{
      $('#cover-spin').hide(0);
      this.pageTitle = data.data.page_title;
      this.pageCntnt = data.data.page_content;      
      console.log(data)
    })
  }

}
