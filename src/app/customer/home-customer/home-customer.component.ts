import { Component, OnInit, ViewChild, Renderer, ElementRef, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { data } from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConlactLogComponent } from '../property/conlact-log/conlact-log.component';
import { BnNgIdleService } from 'bn-ng-idle';
import * as _ from 'lodash';

import { AppState } from './../../app.state';
import { User } from './../../models/user.model';
import { Store } from '@ngrx/store';


declare var $: any;

class Filters {
  zip: string;
  city: string;
  state: string;
}

class Action {
  id: number;
  status: number;
}
class ManageGrid {
  gridSelect:number = 8;
  gridsStatus:any = [false, false, false, false, false, false, false, false, false];
  gridCol:any = [0,1,2,3,4,5,6,7,8];
  gridColName:any=['First Name', 'Last Name', 'Address', 'City', 'State', 'Zip Code', 'Market Value', 'Status', 'Action'];
  
}

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [BnNgIdleService]
})
export class HomeCustomerComponent implements OnInit {
  //@ViewChild(DataTableDirective, { static: false })
 // dtElement: DataTableDirective;
 // dtTrigger = new Subject();
  //action = new Action();
  //exlTableData: any = [];
  userIsMember: boolean = false;
  purchase: number = 0;
  intrested: number = 0;
  highly: number = 0;
  search: number = 0;
  highlyData: any = [];
  instData: any = [];
  sideBarIsOpened = false;
  cookiesContent:any="";
  sessionExpire:any="";
  showCookiesDialog:boolean=true;
  showSessionDialog:boolean=false;
  user:Observable<User>;
  load:number=0
  constructor(private authService: AuthService, private actRouter: ActivatedRoute,private bnIdle: BnNgIdleService,private toastr: ToastrService, private router: Router, elementRef: ElementRef, private renderer: Renderer, private modal: NgbModal,
    private store: Store<AppState>) {
      this.user=store.select('user')
  }


  ngOnInit() {
    this.user.subscribe(x=>{
      this.load=x.user
    })
    if(this.load==0){
      this.purchase = 2;
      this.intrested = 2;
      this.highly = 2;
      this.search = 2;
      
      $('#cover-spin').hide(0);
    }
    else{

  $('#cover-spin').show(0);
   this.authService.getcookies().subscribe((data)=>{
  let isSetCookies=localStorage.getItem("cookies");
  this.showCookiesDialog=isSetCookies ? false :true;
  this.cookiesContent=data.data.cookie.page_content;
   this.sessionExpire=data.data.session.page_content;
  })



    this.authService.getProfile().subscribe((data) => {
      if (data.data.member) {
        this.userIsMember = true;
      }
    }, (error) => {
      console.log(error)
    });
   
    this.authService.dashboard()
      .subscribe(data => {
        $('#cover-spin').hide(0);
        console.log(data)
        this.purchase = data.reportCount
        this.intrested = data.intrestedCount
        this.highly = data.highlyCount
        this.search = parseInt(data.searchCount) > 5 ? 5 : data.searchCount
        this.instData = data.intrestedData
        this.highlyData = data.highlyData
      })


    }
 
  }
  toggleSideBar(shouldOpen: boolean) {
    this.sideBarIsOpened = !this.sideBarIsOpened;
  }
  acceptCookies(){
    this.showCookiesDialog=false;
    localStorage.setItem("cookies","cookiesSet");
    this.bnIdle.startWatching(600).subscribe((res) => {
      if(res) {
        this.showSessionDialog=true; 
      }
    })
  }
  declineCookies(){
   this.showCookiesDialog=false;
  }

}
