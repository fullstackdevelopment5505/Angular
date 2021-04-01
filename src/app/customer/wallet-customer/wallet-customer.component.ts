import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppState } from './../../app.state';
import { User } from './../../models/user.model';
import { Store } from '@ngrx/store';

declare var $: any;
require("inputmask/dist/inputmask/inputmask.numeric.extensions");
var Inputmask = require("inputmask/dist/inputmask/inputmask.date.extensions");

//import * as Inputmask from "inputmask";

@Component({
  selector: 'app-wallet-customer',
  templateUrl: './wallet-customer.component.html',
  styleUrls: ['./wallet-customer.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class WalletCustomerComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
 
  months:any=[];
  years:any=[];
  submit:boolean=false;
  // dtOptions={}
  // result:any=[]
  currentPoint:string;
  totalDeposite:string;
  pointsPerDollar:number;
  totalTrans:number;
  data:any=[];
  recentDeposite:any=[]
  depositeForm:FormGroup;
  title = 'angulardatatables';
  dtOptions: any = {};
  user:Observable<User>;
  load:number=0

  dtTrigger: Subject<any> = new Subject();
  constructor(private fb:FormBuilder,private authService:AuthService,private toastr: ToastrService,private store: Store<AppState>) {
    this.user=store.select('user')
    for (let index = 1; index <= 12; index++) {
      this.months.push(index);
    }
    let year=new Date().getFullYear()
    for (let index = year; index <= (year+25); index++) {
      this.years.push(index);
    }
   }



  ngOnInit() {    
    this.depositeForm=this.fb.group({
      amount:['',[Validators.required, Validators.min(50)]],    //,Validators.min(1)
    })
    $('#cover-spin').show(0);

    this.user.subscribe(x=>{
      this.load=x.user
    })
    if(this.load==0){
        this.currentPoint="20"
        this.totalTrans=30
          $('#cover-spin').hide(0);
      return	
    }
    Inputmask({autoUnmask: true}).mask(document.querySelectorAll("input"));    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

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
      lengthMenu: [
        [10, 20, 40, 60, 80, 100],
        [10, 20, 40, 60, 80, 100]
      ],
      order: [],
      // buttons: [ 'copy','print','csv','excel','pdf'],
      ajax: (dataTablesParameters: any, callback) => {
          this.authService.getWallet()
          .subscribe((data)=>{
            console.log(data) 
            $('#cover-spin').hide(0);
            this.currentPoint=data.data.current_points
            this.pointsPerDollar=data.data.pointRate
            this.totalDeposite=data.data.total_deposite
            this.recentDeposite=data.data.recent_deposite
            this.data=data.data.points.filter(sub => sub.type == 1) //punch4 update
            this.totalTrans=data.data.points.length
            console.log('punch4 - currentpoint', this.data)
            callback({
              recordsTotal: 10,
              recordsFiltered: 5,
              data: data.data.points
            });
          })
        },
        columns: [{ data: 'type',title:'Type', render: function (data, type, row) {
          return data==1?'Funds Credited' : 'Funds Debited'
        } }, 
        // punch4
        { data: 'trans_id',title:'Transaction ID', render: function (data, type, row) {
          return row['type'] ==1
        } }, 
        // end punch4
        { data:'point', title:'Funds', className:'text-right', render: function (data, type, row) {
          return formatter.format(data)
        }}, { data: 'date', title:'Date & Time', className:'text-center' }],
        
    };


  }

  onModal(arg){  
    this.depositeForm.patchValue({    
      "amount": arg    
    });
  }


  
deposite(){
    $('#cover-spin').show(0);
    this.submit=true;
    if(!this.depositeForm.valid){
      console.log('error')
      $('#cover-spin').hide(0);
      return;
    }  
    
  // if(confirm('Are you sure? you want to add this money')){ punch2
    this.authService.walletRecharge(this.depositeForm.value)
    .subscribe((data)=>{
      console.log(data)
      $('#myModal').modal('hide');
      this.toastr.success(data.message, 'Success!');       
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
      this.depositeForm.reset();
      this.submit=false;     
    },(error)=>{
      console.log(error)
      $('#myModal').modal('hide');
      $('#cover-spin').hide(0);
      this.toastr.error(error, 'Error!');
    })
  // } punch2
  // else{
  //   $('#cover-spin').hide(0);
  // }
}

ngAfterViewInit(): void {
  this.dtTrigger.next();
}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}
manageGridReset(){
  
}
manageGridInit(){
  
}
}
