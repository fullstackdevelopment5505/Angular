import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  teamDetail:any;
  description:string;
  image:string;
  facebook_url:string;
  linkedin_url:string;
  constructor(private authService:AuthService,private router:ActivatedRoute,private route:Router) { }

  ngOnInit() {
    this.authService.getTeamDetails(this.router.params['value'].id).subscribe((data)=>{
      this.teamDetail = data.data.data;

      this.image=this.teamDetail.profile_image;
      this.description=this.teamDetail.description;
      this.facebook_url = this.teamDetail.facebook_url;
      this.linkedin_url = this.teamDetail.linkedin_url;
      //this.description=(this.teamDetail.description).replace(new RegExp('\n', 'g'), "<br />")
       
      })
  }

}
