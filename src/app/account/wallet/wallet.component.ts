import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  
  months:any=[];
  years:any=[];
  submit:boolean=false;
  // dtOptions={}
  // result:any=[]
  currentPoint:string;
  totalDeposite:string;
  pointsPerDollar:string;
  data:any=[];
  recentDeposite:any=[]


  dtTrigger: Subject<any> = new Subject();

depositeForm:FormGroup;
constructor(private fb:FormBuilder,private authService:AuthService,private toastr: ToastrService){
  for (let index = 1; index <= 12; index++) {
    this.months.push(index);
  }
  let year=new Date().getFullYear()
  for (let index = year; index <= (year+25); index++) {
    this.years.push(index);
  }


}

  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.depositeForm=this.fb.group({
      card_no:['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
      cvvNumber:['',[Validators.required,Validators.minLength(3),Validators.maxLength(4)]],
      ccExpiryMonth:['',Validators.required],
      ccExpiryYear:['',Validators.required],
      amount:['',[Validators.required]]     //,Validators.min(10),Validators.max(10000),
    })


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      // serverSide: true,
      processing: true,
      // buttons: [ 'copy','print','csv','excel','pdf'],
      ajax: (dataTablesParameters: any, callback) => {
          this.authService.getWallet()
          .subscribe((data)=>{
            console.log(data) 
        
            this.currentPoint=data.data.current_points
            this.pointsPerDollar=data.data.pointRate
            this.totalDeposite=data.data.total_deposite
            this.recentDeposite=data.data.recent_deposite
            this.data=data.data.points
            callback({
              recordsTotal: 10,
              recordsFiltered: 5,
              data: data.data.points
            });
            console.log(this.data);
          })
        },
        columns: [{ data: 'type',title:'Type',render: function (data, type, row) {
          return data==1?'Points Credited' : 'Points Debited'
        } }, { data: 'point',title:'Point' }, { data: 'created_at',title:'Date' }],
        
    };


}



deposite(){
  this.submit=true;
  if(!this.depositeForm.valid){
    console.log('error')
    return;
  }
  this.authService.getDeposite(this.depositeForm.value)
  .subscribe((data)=>{
    console.log(data)
    //alert(data.message)
    this.toastr.success(data.message +'!', 'Success!');
    this.depositeForm.reset();
    this.submit=false;
  },(error)=>{
    console.log(error)
    //alert(error)
    this.toastr.error(error+'!', 'Error!');
  })
}

}
