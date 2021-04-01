import { Component, OnInit,ViewChild,AfterViewInit,OnDestroy} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;
import { Subject } from 'rxjs';



class Action {
  id:number;
  status:number;
}
 

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements  AfterViewInit, OnDestroy,OnInit {


  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  dtOptions={}
  action= new Action()
  data:any=[];
  title = 'angulardatatables';

  constructor(private authService:AuthService,private router:Router){

  }
  //dtOptions: DataTables.Settings = {};
  ngOnInit() {



    this.dtOptions = {      
      pagingType: 'full_numbers',
      pageLength: 10,
      // select: true,
      processing: true,
      buttons: [ 'copy','print','csv','excel','pdf'],      
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
          self.trash(data,index);
        });  

        return row;
      }
    };

}


ngAfterViewInit(): void {
  this.dtTrigger.next();
}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}

trash(info:any,index:number):void{

  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.row('tr:nth('+index+')').remove();
    dtInstance.draw();
  });
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
