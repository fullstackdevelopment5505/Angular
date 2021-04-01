import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pending-modal',
  templateUrl: './pending-modal.component.html',
  styleUrls: ['./pending-modal.component.scss']
})
export class PendingModalComponent implements OnInit {


  @Input() public type;
  @Input() public propertyCount;
  all:boolean=false
  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit() {
  }

  c(arg:number):void{
    const data={
      close:arg,
      type:this.all
    }
    this.activeModal.close(data)
  }
}
