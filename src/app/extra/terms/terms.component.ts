import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(private authService:AuthService) { }
  pageTitle:string;
  pageCntnt:string;
  ngOnInit() {
    $('#cover-spin').show(0);
    this.authService.getTerms()
    .subscribe((data)=>{
      $('#cover-spin').hide(0);
      this.pageTitle = data.data.page_title;
      this.pageCntnt = data.data.page_content;
      console.log(data)
    })
  }

}
