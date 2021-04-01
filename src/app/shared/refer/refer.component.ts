import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.scss']
})
export class ReferComponent implements OnInit {

  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit() {

  }
  CancelRefer():void {
    this.activeModal.close(0)
  }
  

}
