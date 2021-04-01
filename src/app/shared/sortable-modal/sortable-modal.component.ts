import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sortable-modal',
  templateUrl: './sortable-modal.component.html',
  styleUrls: ['./sortable-modal.component.scss']
})
export class SortableModalComponent implements OnInit {
  @Input() public gridColName
  @Input() public gridsStatus
  @Input() public gridCol
  @Input() public main
  @Input() public type
  constructor(private activeModal:NgbActiveModal,private toster:ToastrService) { }

  ngOnInit() {
  }
  
  close(arg){
    if(arg===0){
      const length= this.main.filter(item=>item.status===true).length
      if(length<1){
        this.toster.error('User must have to activate 1 column atleast')
        return false
      }
    }
    const col=[]
    const status=[]

    this.main.forEach(item=>{
        col.push(item.item)
        status.push(item.status)
    })


    const data = {
      'gridCol': col,
      'gridsStatus': status,
      'gridColName': this.gridColName,
      'type': arg,
    }
    this.activeModal.close(data)
  }

  save():void{

  }
}
