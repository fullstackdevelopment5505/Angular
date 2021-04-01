import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-common-overlay',
  templateUrl: './common-overlay.component.html',
  styleUrls: ['./common-overlay.component.scss']
})
export class CommonOverlayComponent implements OnInit {
  modalTitle:string=''
  modalContent:string=''
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.getBecomeMemberPopupCntnt().subscribe((data)=>{        
      console.log(data)
      this.modalTitle = data.become_member_popup_title;
      this.modalContent = data.become_member_popup_content;
    },(error)=>{
      console.log(error)
    })

  }

}
