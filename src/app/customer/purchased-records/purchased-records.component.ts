import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

class Action {
  id:number;
  status:number;
}

@Component({
  selector: 'app-purchased-records',
  templateUrl: './purchased-records.component.html',
  styleUrls: ['./purchased-records.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class PurchasedRecordsComponent implements OnInit {
  
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  data:any=[];
  dtTrigger: Subject<any> = new Subject();
  action= new Action();
  constructor(private authService:AuthService, private router:Router) { }

  title = 'angulardatatables';
  dtOptions: any = {};
  ngOnInit() {
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
      ajax: (dataTablesParameters: any, callback) => {
        this.authService.getLeads()
        .subscribe((data)=>{
          //console.log('render')
          this.data=data.data
          callback({
            data: data.data 
          });
        })
      },
      /*
      ajax: (dataTablesParameters: any, callback) => {
          this.authService.getReports()
          .subscribe((data)=>{
            console.log(data) 
      
            this.data=data.data
            callback({
              recordsTotal: 10,
              recordsFiltered: 5,
              data: data.data
            });
            console.log(this.data);
          })
        },*/
       // columns: [{ data: 'report_name',title:'Report Name'}, { data: 'point',title:'Point' }, { data: 'created_at',title:'Date' }],
       columns: [
        { 
          data: 'address',
          title:'Address',
          render: function (data, type, row) 
          {
  
            return '<a class="link-list">'+data+'</a>'
          } 
        }, 
        { 
          data: 'amount',
          title:'Amount',
          render: function(data ,type, row)
          {
            return '$'+data
          }
        }, 
        {
        data: 'status',
        title:'Status',
        width:'20%',
        render: function(data ,type, row)
        {
          let bulb=data==1? 'src="assets/images/bulb2.png"' : 'src="assets/images/bulb.png"'
          let fire=data==2? 'src="assets/images/fire2.png"' : 'src="assets/images/fire.png"'
          return '<ul><li> <button class="btn btn-actions bulb"><img '+bulb+' alt=""></button> </li><li><button class="btn btn-actions fire"><img '+fire+' alt=""></button></li><li><button class="btn btn-actions trash"><img src="assets/images/bin.png" alt=""></button></li></ul>'
        }
        }, { data: 'created_at',title:'Date' }],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td a.link-list', row).unbind('click');
          $('td a.link-list', row).bind('click', () => {
            self.someClickHandler(data);
          });
  
          $('td .bulb', row).unbind('click');
          $('td .bulb', row).bind('click', () => {
            self.bulb(data,index);
          });
  
          $('td .fire', row).unbind('click');
          $('td .fire', row).bind('click', () => {
            self.fire(data,index);
          });  
  
          $('td .trash', row).unbind('click');
          $('td .trash', row).bind('click', () => {
           // console.log(self);
            if(confirm("Are you sure to remove this property from Purchased Records? If yes, you can recover this from Trash anytime :)")) {
              self.trash(data,index);
            }
           // $('#confirmModal').modal('show');  
            //self.trash(data,index);
          });  
  
          return row;
        }
        
    };
  }
  callTrash(){
    console.log(self);
  }
  trash(info:any,index:number):void{
    console.log(info)
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.row('tr:nth('+index+')').remove();
      dtInstance.draw();
    });
    const tra={id:info.prop_id}
  this.authService.pushTrash(tra).subscribe((data)=>{
    console.log(data)
  },(error)=>{
    console.log(error)
  })
  
  }
  
  
  someClickHandler(info: any): void {
    this.router.navigate(['/customer/property/',info.property_id])
  }
  
  bulb(info: any,index:number): void{
    this.action.id=info.prop_id
  
    ++index
    if(info.status==1){
      let bulb='assets/images/bulb.png'
      let bulb2='assets/images/bulb2.png'
      let fire='assets/images/fire.png'
      let fire2='assets/images/fire2.png'
      let kutte=$('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src');
      if(kutte=='assets/images/bulb2.png'){
        this.action.status=0
        this.authService.postAction(this.action)
        .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb);
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire);
      }
      else{
        this.action.status=1
        this.authService.postAction(this.action)
        .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb2);
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire);
      }
    }
    else{
      let bulb='assets/images/bulb.png'
      let bulb2='assets/images/bulb2.png'
  
      let fire='assets/images/fire.png'
      let fire2='assets/images/fire2.png'
  
      let kutte=$('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src');
      if(kutte=='assets/images/bulb2.png'){
        this.action.status=0
        this.authService.postAction(this.action)
        .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb);
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire);
      }
      else{
        this.action.status=1
        this.authService.postAction(this.action)
        .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb2);
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire);
      }
  
    }
  }
  
  fire(info: any,index:number): void{
    this.action.id=info.prop_id
    ++index
    if(info.status==2){
      let bulb='assets/images/bulb.png'
      let bulb2='assets/images/bulb2.png'
      let fire='assets/images/fire.png'
      let fire2='assets/images/fire2.png'
      let kutte=$('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src');
      if(kutte=='assets/images/fire2.png'){
        this.action.status=0
        this.authService.postAction(this.action)
        .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire);
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb);
      }
      else{
        this.action.status=2
        this.authService.postAction(this.action)
        .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire2);
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb);
      }
    }
    else{
      let bulb='assets/images/bulb.png'
      let bulb2='assets/images/bulb2.png'
      let fire='assets/images/fire.png'
      let fire2='assets/images/fire2.png'
      let kutte=$('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src');
      if(kutte=='assets/images/fire2.png'){
        this.action.status=0
        this.authService.postAction(this.action)
        .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire);
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb);
      }
      else{
        this.action.status=2
        this.authService.postAction(this.action)
        .subscribe((data)=>{console.log(data)},(error)=>{console.log(error)})
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .fire img').attr('src',fire2);
        $('#crm tr:nth-child('+(index)+') td:nth-child(3) .bulb img').attr('src',bulb);
      }
  
    }
  }
}
