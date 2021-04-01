import { Component, OnInit,ViewEncapsulation,ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppState } from './../../app.state';
import { User } from './../../models/user.model';
import { Store } from '@ngrx/store';
declare var $: any;
import { AuthService } from 'src/app/service/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SortableModalComponent } from 'src/app/shared/sortable-modal/sortable-modal.component';
class ManageGrid {
  gridSelect:number = 9;
  gridsStatus:any = [true, true, true, true, true, true, true, true, true];
  gridCol:any = [0,1,2,3,4,5,6,7,8];
  gridColName:any=['First Name', 'Last Name', 'City', 'Email & Phone' , 'Action' , 'Zip Code', 'State', 'Address','Market Value'  ];
  type:number=6;  
}

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TrashComponent implements OnInit {
  data:any=[];
 @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  manageGrid = new ManageGrid();
  user:Observable<User>;
  load:number=0
  constructor(private authService:AuthService,private toastr: ToastrService,private modal:NgbModal,private store: Store<AppState>) {
    this.user=store.select('user')
  }

  title = 'angulardatatables';
  dtOptions: any = {};
  ngOnInit() {
    this.user.subscribe(x=>{
      this.load=x.user
    })
    if(this.load==0){

          $('#cover-spin').hide(0);
      return	
    }
    $('#cover-spin').show(0);
    let init:boolean=false; 
    this.authService.getGridList(6).subscribe((data)=>{ 
       
     console.log(data)
     if(data.data.length > 0){
       
       this.manageGrid.gridSelect = data.data[0].grid_total_number;
       this.manageGrid.gridsStatus = JSON.parse(data.data[0].column_status);
       this.manageGrid.gridCol = JSON.parse(data.data[0].selected_column);
       this.manageGrid.gridColName = JSON.parse(data.data[0].column_name); 
       init = true;
      }  
    });
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })
    this.dtOptions = {
      dom: 'lBfrtip',
      responsive: true,
      colReorder: true,
      aaSorting: [[ 3, 'desc' ]], 
      // serverSide: true,
      //processing: true,
      buttons: [],
      searching: false,
      drawCallback: function() {
        var hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
        $('.dt-buttons')[0].style.display = hasRows ? '' : 'none'
      },
      lengthMenu: [
        [20, 40, 60, 80, 100, -1],
        [20, 40, 60, 80, 100, 'All']
      ],
      ajax: (dataTablesParameters: any, callback) => {
          this.authService.getTrash()
          .subscribe((data)=>{
            console.log(data) 
            $('#cover-spin').hide(0);
            this.data=data.data
           
            callback({
              recordsTotal: 10,
              recordsFiltered: 5,
              data: data.data
            });
            console.log(this.data);
          })
        },
        initComplete: function(settings, json) {
          if(init){
            init = false;
            $('#initGrid').click();
          }
          
        },
        columns: [
          { data: 'Owner1FirstName', title: 'First Name', defaultContent: 'NA' , render: function (data, type, row) {
            let strDate=row.logs ? row.logs.contact_date:'';
            let fName=data ? row.Owner1FirstName:'NA';
            if(strDate) {
              let dataMon = strDate.split('-');
              dataMon[1] = dataMon[1].substr(0, 3)
              dataMon = dataMon.join('-');
              return  fName +'<small class="last_contact">Last Contact:' +' ' + dataMon + '</small>';
            }
            else{
              return  fName ;
            }
          }
        },
          { data: 'OwnerLastname1', title: 'Last Name', defaultContent: 'NA',  render:function(data,type,row) {
            return row.OwnerLastname1.length> 10? `${row.OwnerLastname1.substr(0, 10)}...`: row.OwnerLastname1; 
          }},
          { data: 'SitusCity', title: 'City', defaultContent: 'NA' },
          // {
          //   data: 'status',
          //   title: 'Status', orderable: false, className: 'text-center',
          //   render: function (data, type, row, index) {
              
          //     let bulb = data == 1 ? 'bulbs' : 'bulbs2';
          //     let fire = data == 2 ? 'fires' : 'fires2';
          //     let oppStatus="";
          //     let statusTitle="";
          //     if(row.opportunity_status==1){
          //       oppStatus='src="assets/images/pros.png"';
          //      statusTitle='Prospecting';
          //     }
          //     if(row.opportunity_status==2){
          //       oppStatus='src="assets/images/qulification.png"';
          //      statusTitle='Qualification';
          //     }
          //     if(row.opportunity_status==3){
          //       oppStatus='src="assets/images/analysis.png"';
          //      statusTitle='Needs Analysis';
          //     }
          //     if(row.opportunity_status==4){
          //       oppStatus='src="assets/images/value-proposition.png"';
          //      statusTitle='Value Proposition';
          //     }
          //     if(row.opportunity_status==5){
          //       oppStatus='src="assets/images/dec-make.png"';
          //      statusTitle='Decision Makers';
          //     }
          //     if(row.opportunity_status==6){
          //       oppStatus='src="assets/images/per-analysis.png"';
          //      statusTitle='Perception Analysis';
          //     }
          //     if(row.opportunity_status==7){
          //       oppStatus='src="assets/images/proposal.png"';
          //      statusTitle='Proposal/Price Quote';
          //     }
          //     if(row.opportunity_status==8){
          //       oppStatus='src="assets/images/negotion.png"';
          //      statusTitle='Negotiation/Review';
          //     }
          //     if(row.opportunity_status==9){
          //       oppStatus='src="assets/images/closed-won.png"';
          //      statusTitle='Closed Won';
          //     }
          //     if(row.opportunity_status==10){
          //       oppStatus='src="assets/images/lost.png"';
          //      statusTitle='Closed Lost';
          //     }
          //     if(row.opportunity_status==0){
          //       oppStatus='src="assets/images/nostatus.png"';
          //      statusTitle='No status';
          //     }
          //     return '<ul class="btnsLst"><li><button warm-idx="' + index.row + '"  class="btn btn-actions"><img ' + oppStatus + ' alt=""></button> </li><li> <button warm-idx="' + index.row + '" class="btn btn-actions ' + bulb + ' bulbs_' + index.row + '"></button> </li><li><button hot-idx="' + index.row + '" class="btn btn-actions ' + fire + ' hot_' + index.row + '"></button></li></ul>'
          //   }
          // },
          { title: 'Email & Phone', defaultContent: 'NA', orderable: false,  data:'user_property.updated_at' ,
          render: function (data, type, row) {
            let email = ``;
            let phone = ``;

            if(parseInt(row.batch_search_email_flag) === 1) {
              if(parseInt(row.email_search_flag) === 1) {
                email = `<a><button class="btn btn-success inherticlass fetch_records_cta"><i class="fa fa-envelope fa-lg"></i></button></a>`;
              } else {
                email = `<a><button class="btn btn-secondary secondary_tooltip"><i class="fa fa-envelope fa-lg"></i></button></a>`;
              }
            } else {
              email = `<a  purchase-id="${row.prop_id}" purchase-type="email" class="pending_btn"><button class="btn btn-info inherticlass pending_data_cta"><i class="fa fa-envelope fa-lg"></i></button></a>`;
            }

            if(parseInt(row.batch_search_phone_flag) === 1) {
              if(parseInt(row.phone_search_flag) === 1) {
                phone = `<a><button class="btn btn-success inherticlass fetch_records_cta"><i class="fa fa-mobile fa-lg"></i></button></a>`;
              } else {
                phone = `<a><button class="btn btn-secondary secondary_tooltip"><i class="fa fa-mobile fa-lg"></i></button> </a>`;
              }
            } else {
              phone = `<a purchase-id="${row.prop_id}" purchase-type="phone" class="pending_btn"><button class="btn btn-info inherticlass pending_data_cta"><i class="fa fa-mobile fa-lg"></i></button></a>`;
            }

            return `<div class="relative"> ${email} ${phone} </div>`;
          }
        },
        { data:'prop_id',title:'Actions', orderable:false,className: 'text-center', render:function(data, type, row){
            return `<Button class="btn btn-success"><i class="fa fa-undo"></i> Restore</Button>  <button type="button" class="btn btn-danger mr-2"><i class="fa fa-trash"></i> Delete Permanently</button><a href="/customer/property/${row.property_id}" target="_blank"><button class="btn btn-default">Go</button></a>`
          }
        },
          //punch4
        { data: 'SitusZipCode', title: 'Zip Code', defaultContent: 'NA' ,render: function(data, type, row){
          return data.length == 4 ? '0'+ data : data;
        }},
        // end-punch4
          { data: 'SitusState', title: 'State', defaultContent: 'NA' },
          {
            title: 'Address',data: 'address', defaultContent: 'NA',
            render: function (data, type, row) {
              let houseNumber = row.SitusHouseNumber == null ? '' : row.SitusHouseNumber;
              let streetName = row.SitusStreetName == null ? '' : row.SitusStreetName;
              let siteMode = row.SitusMode == null ? '' : row.SitusMode;
              let addresStr = houseNumber + ' ' + streetName + ' ' + siteMode;
              data = addresStr;
              return data.trim()===''? 'NA' : data 
            }
          },
          {
            data: 'amount', title: 'Market Value', defaultContent: 'NA', className: 'text-right', render: function (data, type, row) {
              return formatter.format(data)
            }
          }          
          
        ],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td .btn-success', row).unbind('click');
          $('td .btn-success', row).bind('click', () => {
            self.someClickHandler(data,index);
          });

          $('td .btn-danger', row).unbind('click');
          $('td .btn-danger', row).bind('click', () => {
            if(confirm("Are you sure you want to permanently delete this record. You can't recover this record later.")) {
              self.trash(data,index);
            }
          });  
        }        
    };
  }

  
  someClickHandler(info: any,index:number): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.row('tr:nth('+index+')').remove();
      dtInstance.draw();
    });
    const tra={id:info.prop_id}
    this.authService.pullTrash(tra).subscribe((data)=>{
      console.log(data)
    },(error)=>{
      console.log(error)
    })
  }
  
  trash(info:any,index:number):void{
    console.log(info)
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.row('tr:nth('+index+')').remove();
      dtInstance.draw();
    }); 
    const tra={id:info.prop_id}
    this.authService.permanentTrash(tra).subscribe((data)=>{
      console.log(data)
    },(error)=>{
      console.log(error)
    }) 
  }
  manageGridReset(){
    this.manageGrid.gridSelect = 4;
    this.manageGrid.gridsStatus = [false, false,false,false];
    this.manageGrid.gridCol = [0,1,2,3];
    $('#manageGridHot').modal('hide');
    this.authService.setGridList(this.manageGrid).subscribe((data)=>{
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      for ( var i=0 ; i< 4; i++ ) {
        dtInstance.column(i).visible( true, true );
      }
      dtInstance.columns.adjust().draw( false );
      dtInstance['colReorder'].reset(); 
    });
  });
  }
  manageGridInit(){
    
    let colStatus = this.manageGrid.gridsStatus;
    let colOrder = this.manageGrid.gridCol;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance['colReorder'].order(colOrder, true);
      for ( var i=0 ; i< 10; i++ ) {
        dtInstance.column(i).visible( colStatus[i], true );
      }
      dtInstance.columns.adjust().draw( false );
    });
  }
  onGridSelectChange(event) {
    if(event) {
      for(var i=3;i>=0;i--){
        if(i>parseInt(event)){
          this.manageGrid.gridsStatus[i] = true;
        } else{
          this.manageGrid.gridsStatus[i] = false;
        }          
      }      
    }
  }
  manageGridSubmit(form:any){    
    
    var colOrder:any=[];
    var missingOrder = [];
    for(var i=0;i<Object.keys(form).length-1;i++){
      colOrder[i] = parseInt(form['col'+i])
    }
    if(!this.checkIfArrayIsUnique(colOrder)){
      //this.toastr.error('please select unique value in each column!', 'Error!');
      return;
    }    
    this.authService.setGridList(this.manageGrid).subscribe((data)=>{ 
      //console.log(data.data.message);
      this.toastr.success("Trash manage grid saved successfully ", 'Success!');   
      $('#manageGridHot').modal('hide'); 
      var tmpArr = colOrder.slice().sort();    
      for ( var i = 0,j=0; i < 4; i++ ) {
        if(tmpArr[j]== i){
          j++;
        } else{
          missingOrder.push(i);   
        }
      }
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  
        for ( var i=0 ; i<4; i++ ) {
          dtInstance.column(i).visible( true, true );
        }    
        dtInstance['colReorder'].order(colOrder.concat(missingOrder), true);
        for( var i:number=tmpArr.length ; i < 4; i++ ) {
          dtInstance.column(i).visible( false, true );
        }
        dtInstance.columns.adjust().draw( false );
            
      });
      this.manageGrid.gridSelect = form.gridSelect;
      this.manageGrid.gridCol = colOrder.concat(missingOrder);     
    });  
  }
  checkIfArrayIsUnique(myArray) {
    for (var i = 0; i < myArray.length; i++) {
      for (var j = 0; j < myArray.length; j++) {
        if (i != j){
          if (myArray[i] == myArray[j]){            
            this.toastr.error('"'+ this.manageGrid.gridColName[this.manageGrid.gridCol[i]] + '" Column can come only once!', 'Error!');
            return false; 
          }
        }
      }
    }
    return true;
  }



  manageGridModal():void{
    const that =this
    const modalRef = this.modal.open(SortableModalComponent);

    const main = []
    for(let i=0;i <this.manageGrid.gridCol.length;i++){
      main.push({item:this.manageGrid.gridCol[i],status:this.manageGrid.gridsStatus[i]})
    }
    modalRef.componentInstance.gridColName=this.manageGrid.gridColName
    modalRef.componentInstance.gridsStatus=this.manageGrid.gridsStatus
    modalRef.componentInstance.gridCol=this.manageGrid.gridCol
    modalRef.componentInstance.main=main 
    modalRef.componentInstance.type=6

    modalRef.result.then((data) => {
     if(data.type===0){
      this.manageGrid.gridsStatus = data.gridsStatus;
      this.manageGrid.gridCol = data.gridCol;
      this.manageGrid.gridColName = data.gridColName; 
      this.manageGrid.gridSelect = 9; 
      const gridData={
        gridCol: data.gridCol,
        gridColName:  data.gridColName,
        gridSelect: 9,
        gridsStatus: data.gridsStatus,
        type: 6
      }

      this.authService.setGridList(gridData).subscribe((data)=>{ 
        this.toastr.success("Grids saved successfully", 'Success!');   
      })
      that.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {   
        for( var i:number=0 ; i < 9; i++ ) {
          dtInstance.column(i).visible( true, true );
        }
        dtInstance['colReorder'].order([...this.manageGrid.gridCol],true);
        for( var i:number=0 ; i < 9; i++ ) {
          dtInstance.column(i).visible( data.gridsStatus[i], true );
        }
        dtInstance.columns.adjust().draw( false );    
      });
    } else if(data.type===1){
      const gridDefault=new ManageGrid()
      this.manageGrid.gridsStatus = gridDefault.gridsStatus;
      this.manageGrid.gridCol = gridDefault.gridCol;
      this.manageGrid.gridColName = gridDefault.gridColName; 
      this.manageGrid.gridSelect = 9; 
      const gridData={
        gridCol: gridDefault.gridCol,
        gridColName:  gridDefault.gridColName,
        gridSelect: 9,
        gridsStatus: gridDefault.gridsStatus,
        type: 6
      }

      this.authService.setGridList(gridData).subscribe((data)=>{ 
        this.toastr.success("Grids saved successfully", 'Success!');   
      })
      that.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {   
        for( var i:number=0 ; i < 9; i++ ) {
          dtInstance.column(i).visible( true, true );
        }
        dtInstance['colReorder'].order([...gridDefault.gridCol],true);
        dtInstance.columns.adjust().draw( false );    
      });   
    }
    }, (reason) => {
      // on dismiss
    });
  }


}
