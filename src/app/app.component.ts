import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router,Event,NavigationCancel,NavigationStart,NavigationEnd,NavigationError } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgcCookieConsentService, NgcInitializeEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription ,Observable} from 'rxjs';
import { AutoLogoutService } from './service/autologout.service';
import { GlobalService } from './service/global.service';
import { CommonModalComponent } from './shared/common-modal/common-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  // keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;
  
  loading: boolean = true;
  title = 'equity';
  constructor(private router: Router,
    private ccService: NgcCookieConsentService,
    private autoLogoutService: AutoLogoutService,
    private modalService: NgbModal,
    private globalService: GlobalService,
    ) {
      
     this.ccService.destroy(); //remove previous cookie bar (with default messages)        

    this.router.events.subscribe((event:Event)=>{
      
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
    });

    if(localStorage.getItem('currentUser')) {
        
      this.checkForModal()

    }

  }


  checkForModal(){
    this.checkTerms();
  }

  checkTerms(){
    this.globalService.getTermsAndConditions()
    .subscribe(
      (data: any) => {
        if(data.data && data.data.content) {

          
          const modalRef = this.modalService.open(CommonModalComponent, { 
            backdrop : 'static',
            keyboard : false
          });
          
          modalRef.componentInstance.title = 'Terms and Conditions';
          modalRef.componentInstance.hideCross = true;
          modalRef.componentInstance.data = { btnClass : 'btn-primary' };
          modalRef.componentInstance.content = data.data.content;
          modalRef.componentInstance.btnText = 'Yes, I Agree';

          modalRef.result.then((result) => {
            this.updateTandC("1");
            this.checkPolicy()
            console.log('result ', result);
          }, (reason) => {
            console.log('reason ', reason);
          });
        }else{
          this.checkPolicy()
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  checkPolicy(){
    
    this.globalService.getPrivacy()
    .subscribe(
      (data: any) => {
        console.log(data)
        if(data.data && data.data.content) {
          
          const modalRef1 = this.modalService.open(CommonModalComponent, { 
            backdrop : 'static',
            keyboard : false
          });
          
          modalRef1.componentInstance.title = 'Privacy Policy';
          modalRef1.componentInstance.hideCross = true;
          modalRef1.componentInstance.data = { btnClass : 'btn-primary' };
          modalRef1.componentInstance.content = data.data.content;
          modalRef1.componentInstance.btnText = 'Yes, I Agree';

          modalRef1.result.then((result) => {
            this.updatePrivacy('1');
            console.log('result ', result);
          }, (reason) => {
            console.log('reason ', reason);
          });
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  async ngOnInit() {
    
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log('popupOpen');
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log('popuClose');
        localStorage.setItem( 'cookies', 'cookiesSet' );
      });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log(`initialize: ${JSON.stringify(event)}`);
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log(`statusChange: ${JSON.stringify(event)}`);
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log(`revokeChoice`);
      });

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log(`noCookieLaw: ${JSON.stringify(event)}`);
      });
      
      const cookies = localStorage.getItem('cookies');
      if(!cookies) {
        this.globalService.getSessionCookie()
        .subscribe(
        (data: any) => {
          const cookie = data.data.cookie;
              this.ccService.getConfig().content = this.ccService.getConfig().content || {} ;
              // Override default messages with the translated ones
              // this.ccService.getConfig().content.header = '';
              this.ccService.getConfig().content.message = cookie && cookie.page_content ? cookie.page_content : 
              `<p>This website uses cookies to ensure you get the best experience on our website&nbsp;<a href="https://equityfinderspro.com/privacy">Learn More</a></p>`;
              this.ccService.getConfig().content.dismiss = '';
              this.ccService.getConfig().content.allow = 'Got it!';
              this.ccService.getConfig().content.deny = '';
              this.ccService.getConfig().content.link = '';
              this.ccService.getConfig().content.policy = '';
              // this.ccService.getConfig().content.href = 'http://www.equityfinderspro-dev.com/privacy';
              
              this.ccService.init(this.ccService.getConfig()); // update config with translated messages
          },
          err => {
            console.log(err);
        }
        )
      }
  }

  updateTandC(status) {
    this.globalService.updateTermsAndConditions(status).subscribe(
      data => console.log('update data ', data),
      err => console.log('update err ', err),
    );
  }

  updatePrivacy(status){
    this.globalService.updatePrivacy(status).subscribe(
      data => console.log('update data ', data),
      err => console.log('update err ', err),
    );
  }

  ngOnDestroy(): void {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }
  
}
