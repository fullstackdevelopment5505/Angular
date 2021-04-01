import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

interface iDetail{
  additional_notes?: string
  agent_name?: string
  company_goal?: string
  completed_at?: string
  created_at?: Date
  description?: string
  final_postcard_design_template?: string
  font_family?: string
  handwriting_style?: string
  id: number
  phone?: string
  postcard_content?: string
  postcard_size?: string
  primary_color: string
  sample_image: string
  save_as_template: string
  secondary_color: string
  status: string
  targets: string
  title: string
  updated_at: string
  user_id: number
}

class ProgressDetail{
  data:iDetail
  related_designs:[iDetail]
}


@Component({
  selector: 'app-progress-detail',
  templateUrl: './progress-detail.component.html',
  styleUrls: ['./progress-detail.component.scss']
})
export class ProgressDetailComponent implements OnInit {

  progressDetail = new ProgressDetail()
  private modalRef: NgbModalRef;
  @ViewChild('content',{static:false}) private content;
  constructor(private authService:AuthService,private actRouter:ActivatedRoute,private router:Router,private modalService: NgbModal) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.authService.getPostCardDetail(this.actRouter.params['value'].id).subscribe(data=>{
      this.progressDetail=data.data
      console.log(this.progressDetail)
    })
  }

  openModel(){
    this.modalRef = this.modalService.open(this.content, { size: 'lg' })
  }

}
