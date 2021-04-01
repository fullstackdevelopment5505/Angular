import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({ templateUrl: './common-modal.component.html',styles:[
  '.walletimage{ height: 110px; width: auto; }'
] })

export class CommonModalComponent implements OnInit{
  
  @Input() public type;
  @Input() public data;
  @Input() public hideCross;

  @Input() public title;
  @Input() public content;
  @Input() public btnText;

  constructor(private activeModel: NgbActiveModal) {  }

  ngOnInit(): void {}

  close(popupName: string) {
    this.activeModel.close(popupName);
  }

  confirm(popupName: string) {
    this.activeModel.close(popupName);
  }

}
