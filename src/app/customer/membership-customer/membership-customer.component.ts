import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-membership-customer',
  templateUrl: './membership-customer.component.html',
  styleUrls: ['./membership-customer.component.scss']
  
})
export class MembershipCustomerComponent implements OnInit {
  userData:any;
  userDetail:any;
  userName:string;
  day:number;
  pointRate:number;
  membership:number;
  membershipAmount:number;
  progress:number=0;
  url:string;
  closeResult: string;
  page_title:string;
  page_content:string;
  membershipPlanPageTitle:string;
  membershipPlanDescription:string;
  membershipPlanAmount:string;
  membershipPlan:string;
  membershipPlanLoginUsers:string;
  membershipPlanType:string;
  membershipPlanUpdatedAt:string;
  membershipPlanCreatedAt:string;
  @ViewChild('content',{static:false}) private content;
  constructor(
    private router:Router, 
    private authService:AuthService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute, 

    ) {
   }
   

  ngOnInit() {
    $('#cover-spin').show(0);
    this.authService.membershipPage()
    .subscribe((data)=>{
     // console.log(data);
     $('#cover-spin').hide(0);
     let type =this.activatedRoute.snapshot.paramMap.get('type')
     if(type && type==='new'){
      this.modalService.open(this.content, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        this.router.navigate(['/customer/membership'], {
          queryParams: {
            type: null,
          },
          queryParamsHandling: 'merge'
        })
        if(result==='Deposite'){
          this.router.navigate(['/customer/payment-advance']);
        }

      }, (reason) => {
        this.closeResult = `Dismissed`;
      });;
     }
      this.userData=data.data.data;
      this.userDetail=data.data.data.details;
      if(data.data.data.details){
        this.userName = data.data.data.details.f_name;
      }      
      this.day=data.data.day
      this.pointRate=data.data.pointRate
      this.membership=data.data.membership
      this.membershipAmount = data.data.membership_amount 
      this.progress=data.data.progress
      
      if(data.data.data.image!=null){
        this.url= data.data.data.image.filename 
      }
      else{
        this.url='assets/images/user.png'
      }  
     // console.log(data)
    },(error)=>{
        console.log(error)
    })
    this.authService.getMembershipDetails().subscribe((data)=>{
      $('#cover-spin').hide(0);
      this.page_title = data.data.page_title;
      this.page_content = data.data.page_content;
    //  this.membershipPlanPageTitle = data.membership_plan_data.page_title;
   //   this.membershipPlanDescription = data.membership_plan_data.description;
      this.membershipPlanAmount = data.membership_plan_data.amount;
      this.membershipPlanLoginUsers = data.membership_plan_data.login_users;
      this.membershipPlanType = data.membership_plan_data.type;
      this.membershipPlanUpdatedAt = data.membership_plan_data.updated_at;
      this.membershipPlanCreatedAt = data.membership_plan_data.created_at;
     // console.log(data)
    },(error)=>{
        console.log(error)
    })
  }
  cancelMembership(){
    if(confirm("Are you sure you want to cancel your membership with Equity Finders Pro?")) {
      $('#cover-spin').show(0);
      this.authService.cancelMembership().subscribe((data)=>{
        localStorage.removeItem('paidMember');
        $('#cover-spin').hide(0);
        this.router.navigate(['']);
       // console.log(data)
      },(error)=>{
          console.log(error)
      })
      
    }
  }
}
