import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class CareerComponent implements OnInit {
  mainData:string;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.getCareer().subscribe((data)=>{
      this.mainData=data.data.career
      console.log(data)
    },(error)=>{

    })
  }

}
