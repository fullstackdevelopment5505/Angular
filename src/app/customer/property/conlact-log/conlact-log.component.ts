import { AfterViewInit, Component, OnDestroy, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
require("inputmask/dist/inputmask/inputmask.numeric.extensions");
var Inputmask = require("inputmask/dist/inputmask/inputmask.date.extensions");
declare var $: any;


@Component({
  selector: 'app-conlact-log',
  templateUrl: './conlact-log.component.html',
  styleUrls: ['./conlact-log.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ConlactLogComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() public info;
  @ViewChild(DataTableDirective, {static: false})  
  dtElement: DataTableDirective;
  logTblData:any=[];
  dtTrigger: Subject<any> = new Subject();
  title = 'angulardatatables';
  dtOptions: any = {};
  logForm:FormGroup;
  submit:boolean=false;
  constructor(private activeModal: NgbActiveModal, private authService:AuthService, private fb:FormBuilder, private router:Router, private toastr: ToastrService) {  }

  ngOnInit() {
    //$('#cover-spin').show(0);
    Inputmask({autoUnmask: true}).mask(document.querySelectorAll("input"));  
    $('.flyout_view .add_log').click(function(){
      $('.flyout_view .log .cancel_log').click();
      if($(this).text()=='Add Log'){
        $(this).text('Hide Log');
      } else{
        $(this).text('Add Log');         
      }
      $('.flyout_view .log').slideToggle(100);      
    }); 
    this.logForm=this.fb.group({
      property_id:[this.info,[Validators.required]],
      way_of_contact:['',[Validators.required, Validators.maxLength(40)]],
      description:['',[Validators.required]]
    });   
    this.dtOptions = {
      dom: 'lBfrtip',
      responsive: true,
      // serverSide: true,
      //processing: true,
      buttons: [ 'copy','csv','excel','pdf'],
      drawCallback: function() {
        var hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
        $('.dt-buttons')[0].style.display = hasRows ? '' : 'none'
      },
      
      pagingType: "full_numbers",
      lengthMenu: [
        [10, 20, 25, 50, 100, 150, 200, 250, 300, -1],
        [10, 20, 25, 50, 100, 150, 200, 250, 300, "All"]
      ], 
      order:[[ 0, 'desc' ],[ 1, 'desc' ]],
      ajax: (dataTablesParameters: any, callback) => {
        this.authService.getContactLog(this.info).subscribe((data)=>{  
                  
          console.log(data)
          this.logTblData=data.data.data;
          $('#cover-spin').hide(0);
          callback({
            data: data.data.data 
          });          
        },error=>{
          console.log(error)
        });
      },
      columns: [
        {data:'contact_date',title:'Date', defaultContent: 'NA'},
        {data:'contact_time',title:'Time', defaultContent: 'NA'},
        {data:'type',title:'Type', defaultContent: 'NA',render(data,type,row){
          return data.charAt(0).toUpperCase() + data.slice(1);
        }},
        {data:'description',title:'Description', defaultContent: 'NA'}
      ]
    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  logFormSubmit(){
    this.submit=true;
    if(!this.logForm.valid){
      console.log('error')
      return;
    } else{
      $('#cover-spin').show(0);      
      this.authService.addContactLog(this.logForm.value).subscribe((data)=>{
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();   
          //this.logFormReset();  
          $('.flyout_view .add_log').click();    
          $('#cover-spin').hide(0);
          this.toastr.success(data.message, 'Success!');
        });        
      },(error)=>{       
        this.toastr.error(error, 'Error!');
        $('#cover-spin').hide(0);
        this.submit=false;   
      });  
    }
  }
  logFormReset(){
    this.submit=false;   
    this.logForm.reset(); 
    this.logForm.patchValue({ 'property_id': this.info});
  }
  public onClose = () =>
  this.activeModal.close(); 
}
