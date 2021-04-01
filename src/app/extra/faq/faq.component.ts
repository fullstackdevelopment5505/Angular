import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(private authService:AuthService) { }
  mainData:string;
  ngOnInit() {
    this.authService.getFaq()
    .subscribe((data)=>{
      this.mainData=data.data.faq
      console.log(data)
    })
  }

}
