import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {
  page_title:string;
  page_content:string;

  memberworkCntnt:any;
  memberworkCntntHd:string;
  memberworkCntntSubHd:string;
  memberworkCntBox1content:string;
  memberworkCntBox2content:string;
  memberworkCntBox3content:string;
  memberworkCntBoximage1:string;
  memberworkCntBoximage2:string;
  memberworkCntBoximage3:string;
  memberworkCntBoxtitle1:string;
  memberworkCntBoxtitle2:string;
  memberworkCntBoxtitle3:string;
  
  membershipPlanPageTitle:string;
  membershipPlanDescription:string;
  membershipPlanAmount:string;
  membershipPlan:string;
  membershipPlanLoginUsers:string;
  membershipPlanType:string;
  membershipPlanUpdatedAt:string;
  membershipPlanCreatedAt:string;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    $('#cover-spin').show(0);
    this.authService.getMembershipDetails().subscribe((data)=>{
      $('#cover-spin').hide(0);
      console.log(data);
      this.page_title = data.data.page_title;
      this.page_content = data.data.page_content;
      this.memberworkCntnt = data.data.extra_content;
      this.memberworkCntntHd = this.memberworkCntnt.heading;
      this.memberworkCntntSubHd = this.memberworkCntnt.sub_heading;
      this.memberworkCntBox1content = this.memberworkCntnt.box_1_content;
      this.memberworkCntBox2content = this.memberworkCntnt.box_2_content;
      this.memberworkCntBox3content = this.memberworkCntnt.box_3_content;
      this.memberworkCntBoximage1 = this.memberworkCntnt.box_image_1;
      this.memberworkCntBoximage2 = this.memberworkCntnt.box_image_2;
      this.memberworkCntBoximage3 = this.memberworkCntnt.box_image_3;
      this.memberworkCntBoxtitle1 = this.memberworkCntnt.box_title_1;
      this.memberworkCntBoxtitle2 = this.memberworkCntnt.box_title_2;
      this.memberworkCntBoxtitle3 = this.memberworkCntnt.box_title_3;

      this.membershipPlanPageTitle = data.membership_plan_data.page_title;
      this.membershipPlanDescription = data.membership_plan_data.description;
      this.membershipPlanAmount = data.membership_plan_data.amount;
      this.membershipPlanLoginUsers = data.membership_plan_data.login_users;
      this.membershipPlanType = data.membership_plan_data.type;
      this.membershipPlanUpdatedAt = data.membership_plan_data.updated_at;
      this.membershipPlanCreatedAt = data.membership_plan_data.created_at;

      
      
    },(error)=>{
        console.log(error)
    })
  }

}
