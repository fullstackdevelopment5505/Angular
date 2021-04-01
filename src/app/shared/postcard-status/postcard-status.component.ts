import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-postcard-status',
  templateUrl: './postcard-status.component.html',
  styleUrls: ['./postcard-status.component.scss']
})
export class PostcardStatusComponent implements OnInit {

  @Input() public data
  @Input() public rows
  @Input() public type

  constructor(private activeModel: NgbActiveModal,private router:Router) { }

  ngOnInit() {
  }

  close() {
    this.activeModel.close();
  }  

  getAddressCount(){
    return this.data.filter(item=>item.address_flag==='1').length
  }

  emailModal(){
    this.close()
    const allData=[]
    const allRows= this.data.map(item=>{
      if(item.address_flag==='1'){
        allData.push(item.property_id)
      }
    })
    localStorage.setItem('postCardMember', allData.join());
    localStorage.setItem('recordType', this.type);
    
    this.router.navigate(['/customer/postcard/create'])


  }

}
