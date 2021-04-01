import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { CommonModalComponent } from '../shared/common-modal/common-modal.component';
import { GlobalService } from './global.service';

const MINUTES_UNITL_AUTO_LOGOUT = 10 // in mins
const CHECK_INTERVAL = 5000 // in ms
const STORE_KEY =  'lastAction';

@Injectable({ providedIn: 'root' })
export class AutoLogoutService {
  val: any;
  modalShow: boolean = false;

  constructor(private router: Router,
    private modalService: NgbModal,
    private globalService: GlobalService,
    private ccService: NgcCookieConsentService
    ) {
    localStorage.setItem(STORE_KEY, Date.now().toString());
    this.check();
    this.initListener();
    this.initInterval();
  }

 public getLastAction() {
   return parseInt(localStorage.getItem(STORE_KEY));
 }

 public setLastAction(lastAction: number) {
  localStorage.setItem(STORE_KEY, lastAction.toString());
 }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover',()=> this.reset());
    document.body.addEventListener('mouseout',() => this.reset());
    document.body.addEventListener('keydown',() => this.reset());
    document.body.addEventListener('keyup',() => this.reset());
    document.body.addEventListener('keypress',() => this.reset());
     window.addEventListener("storage",() => this.storageEvt());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    // console.log('difference', diff);

    const isTimeout = diff < 0;

    if (localStorage.getItem('currentUser') && isTimeout && !this.modalShow)  {
      
      localStorage.removeItem('currentUser');
      localStorage.removeItem('paidMember');
      localStorage.removeItem('user');

      //this.router.navigate(['/authentication/login']);
      this.modalShow = true;

      this.globalService.getSessionCookie()
      .subscribe(
      (data: any) => {
        const sessionData = data.data.session;
        const modalRef = this.modalService.open(CommonModalComponent);
        modalRef.componentInstance.title = sessionData && sessionData.page_title ? sessionData.page_title : 'User Session Message"';
        modalRef.componentInstance.data = { btnClass : 'btn-outline-dark' };
        modalRef.componentInstance.content = sessionData && sessionData.page_content ? sessionData.page_content : 'Your session has expired. Click OK to return to the login page.';
        modalRef.componentInstance.btnText = 'OK';
        modalRef.result.then((result) => {
          // localStorage.clear();
          this.modalShow = false;

          this.router.navigate(['/authentication/login'])
          .then(() => {
            window.location.reload();
          }); 

        }, (reason) => {

          this.router.navigate(['/authentication/login'])
          .then(() => {
           window.location.reload();
          }); 

          this.modalShow = false;
          console.log('reason ', reason);
        });
        this.ccService.destroy();
        
        },
        err => {
          console.log(err);
      }
      )
      
    }
  }

  storageEvt() {
    this.val = localStorage.getItem(STORE_KEY);
  }
}

