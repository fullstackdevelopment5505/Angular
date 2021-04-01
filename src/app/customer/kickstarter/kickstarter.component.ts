import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SortableModalComponent } from 'src/app/shared/sortable-modal/sortable-modal.component';

import { AppState } from './../../app.state';
import { User } from './../../models/user.model';
import { Store } from '@ngrx/store';

declare var $: any;

class ManageGrid {
  gridSelect:number = 2;
  gridsStatus:any = [true, true];
  gridCol:any = [0,1];
  gridColName:any=['Name','Action'];
  type:number=5;  
}
@Component({
  selector: 'app-kickstarter',
  templateUrl: './kickstarter.component.html',
  styleUrls: ['./kickstarter.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class KickstarterComponent implements OnInit {
  
  data:any=[];
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  user:Observable<User>;
  load:number=0


  constructor(private authService:AuthService,private router:Router,private toastr: ToastrService,private modal:NgbModal,private store:Store<AppState>) { 
    this.user=store.select('user')
  }
  title = 'angulardatatables'; 
  dtOptions: any = {};
  manageGrid = new ManageGrid();

  ngOnInit() {
    
    this.user.subscribe(x=>{
      this.load=x.user
    })
    if(this.load==0){

      $('#cover-spin').hide(0);
      this.dtOptions = {
        paging:   false,
        searching: false,
      }
      return
	  }

    console.log(this.manageGrid)
   let init:boolean=false; 
   this.authService.getGridList(5).subscribe((data)=>{ 
      
    console.log(data)
    if(data.data.length > 0){
      
      this.manageGrid.gridSelect = data.data[0].grid_total_number;
      this.manageGrid.gridsStatus = JSON.parse(data.data[0].column_status);
      this.manageGrid.gridCol = JSON.parse(data.data[0].selected_column);
      this.manageGrid.gridColName = JSON.parse(data.data[0].column_name); 
      init = true;
     }  
   });
    this.dtOptions = {
      dom: 'lBfrtip',
      responsive: true,
      ordering: false,
      colReorder: true,
      order:[[ 0, 'desc' ]],
      buttons: [],
      searching: false,
      drawCallback: function() {
        var hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
        $('.dt-buttons')[0].style.display = hasRows ? '' : 'none'
      },
      lengthMenu: [
        [20, 40, 60, 80, 100],
        [20, 40, 60, 80, 100]
      ],
      paging:   false,
      ajax: (dataTablesParameters: any, callback) => {
        
          $('#cover-spin').show(0);
          this.authService.kickstarterSavedSearch().subscribe((data)=>{
            console.log(data) 
      
            this.data=data.data
            callback({
              recordsTotal: 10,
              recordsFiltered: 5,
              data: data.data
            });
            console.log(this.data);
            $('#cover-spin').hide(0);
          },(error)=>{
            console.log(error)
          })
        },
        initComplete: function(settings, json) {
          if(init){
            init = false;
            $('#initGrid').click();
          }
          
        },
          columns: [{ data: 'name',title:'Name', 
          render:function(data, type, row){           
            return 'Search Like '+ row.name;
          }},
          {
          data:'id',title:'Actions', width:'30%',render:function(data, type, row){
            return '<Button class="btn btn-success">View</Button>'
          }
        }],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {       
          const self = this;         
          $('td .btn-success', row).unbind('click');
          $('td .btn-success', row).bind('click', () => {
            self.someClickHandler(data);
          });          
          return row;
        }
        
    };
  }
  someClickHandler(data){
    localStorage.setItem('advanceSearchForm', data.search);
    this.router.navigate(['/customer/advance'])
  }
  manageGridReset(){
    this.manageGrid.gridSelect = 2;
    this.manageGrid.gridsStatus = [false, false];
    this.manageGrid.gridCol = [0,1];
    $('#manageGridHot').modal('hide');
    this.authService.setGridList(this.manageGrid).subscribe((data)=>{
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      for ( var i=0 ; i<2; i++ ) {
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
      for ( var i=0 ; i<2; i++ ) {
        dtInstance.column(i).visible( colStatus[i], true );
      }
      dtInstance.columns.adjust().draw( false );
    });
  }
  onGridSelectChange(event) {
    if(event) {
      for(var i=1;i>=0;i--){
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
      this.toastr.success("Kickstarters manage grid saved successfully ", 'Success!');   
      $('#manageGridHot').modal('hide'); 
      var tmpArr = colOrder.slice().sort();    
      for ( var i = 0,j=0; i < 2; i++ ) {
        if(tmpArr[j]== i){
          j++;
        } else{
          missingOrder.push(i);   
        }
      }
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  
        for ( var i=0 ; i<2; i++ ) {
          dtInstance.column(i).visible( true, true );
        }    
        dtInstance['colReorder'].order(colOrder.concat(missingOrder), true);
        for( var i:number=tmpArr.length ; i < 2; i++ ) {
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
            this.toastr.error('"'+ this.manageGrid.gridColName[this.manageGrid.gridCol[i]] + '" Coulmn can come only once!', 'Error!');
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
    modalRef.componentInstance.type=1

    modalRef.result.then((data) => {
     if(data.type===0){
      this.manageGrid.gridsStatus = data.gridsStatus;
      this.manageGrid.gridCol = data.gridCol;
      this.manageGrid.gridColName = data.gridColName; 
      this.manageGrid.gridSelect = 2; 
      const gridData={
        gridCol: data.gridCol,
        gridColName:  data.gridColName,
        gridSelect: 2,
        gridsStatus: data.gridsStatus,
        type: 5
      }

      this.authService.setGridList(gridData).subscribe((data)=>{ 
        this.toastr.success("Grids saved successfully", 'Success!');   
      })
      that.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {   
        for( var i:number=0 ; i < 2; i++ ) {
          dtInstance.column(i).visible( true, true );
        }
        dtInstance['colReorder'].order([...this.manageGrid.gridCol],true);
        for( var i:number=0 ; i < 2; i++ ) {
          dtInstance.column(i).visible( data.gridsStatus[i], true );
        }
        dtInstance.columns.adjust().draw( false );    
      });
    } else if(data.type===1){
      const gridDefault=new ManageGrid()
      this.manageGrid.gridsStatus = gridDefault.gridsStatus;
      this.manageGrid.gridCol = gridDefault.gridCol;
      this.manageGrid.gridColName = gridDefault.gridColName; 
      this.manageGrid.gridSelect = 2; 
      const gridData={
        gridCol: gridDefault.gridCol,
        gridColName:  gridDefault.gridColName,
        gridSelect: 2,
        gridsStatus: gridDefault.gridsStatus,
        type: 5
      }

      this.authService.setGridList(gridData).subscribe((data)=>{ 
        this.toastr.success("Grids saved successfully", 'Success!');   
      })
      that.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {   
        for( var i:number=0 ; i < 2; i++ ) {
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
