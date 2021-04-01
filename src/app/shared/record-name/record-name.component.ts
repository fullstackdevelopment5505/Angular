import { Component, OnInit,Input,AfterViewInit } from '@angular/core';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';

require("inputmask/dist/inputmask/inputmask.numeric.extensions");
var Inputmask = require("inputmask/dist/inputmask/inputmask.date.extensions");
@Component({
  selector: 'app-record-name',
  templateUrl: './record-name.component.html',
  styleUrls: ['./record-name.component.scss']
})
export class RecordNameComponent implements OnInit,AfterViewInit {

  @Input() public data
  @Input() public rows
  @Input() public type

  constructor(private activeModel: NgbActiveModal,private modal:NgbModal) { }

  ngOnInit() {
  }

  close(arg:number):void {
    this.activeModel.close(arg);
  }  
  
  ngAfterViewInit(){

    Inputmask().mask(document.querySelectorAll("input"));  
  }  

}
