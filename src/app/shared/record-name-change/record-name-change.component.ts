import { Component, OnInit,Input,AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
require("inputmask/dist/inputmask/inputmask.numeric.extensions");
var Inputmask = require("inputmask/dist/inputmask/inputmask.date.extensions");

@Component({
  selector: 'app-record-name-change',
  templateUrl: './record-name-change.component.html',
  styleUrls: ['./record-name-change.component.scss']
})
export class RecordNameChangeComponent implements OnInit,AfterViewInit {

  @Input() public data
  @Input() public rows
  @Input() public type


  value:string=""
  constructor(private activeModel:NgbActiveModal,private authService:AuthService,private toastr:ToastrService) { }

  ngOnInit() {
    
    console.log(this.data)
  }


  ngAfterViewInit(){

    Inputmask().mask(document.querySelectorAll("input"));  
  }

  close(arg:number) {
    this.activeModel.close();
  }    

  saveData(){
    if(this.type==='email'){
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(this.value) == false) 
        {
            this.toastr.error('Invalid email', 'Error!');
            return false;
        }
    }
    if(this.type==='phone'){
      if(this.value.length<17){
        this.toastr.error('Invalid phone', 'Error!');
        return false;
      }

    }
    this.authService.updateMarketData(this.rows,this.type,this.value).subscribe(data=>{
      this.close(3);
      this.toastr.success('Saved successfully', 'Error!');
    })
  } 
}
