import { AfterViewInit, Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { SortableModalComponent } from 'src/app/shared/sortable-modal/sortable-modal.component';
import { ToastrService } from 'ngx-toastr';
import { AppState } from './../../../app.state';
import { User } from './../../../models/user.model';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;
class ManageGrid {
  gridSelect:number = 3;
  gridsStatus:any = [true,true,true];
  gridCol:any = [0,1,2];
  gridColName:any=['Name','Date & Time','Action'];
  type:number=4;  
}
@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class SearchListComponent implements AfterViewInit, OnDestroy, OnInit {

  data:any=[];
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  rowIndex:number;
  cellId:string;
  manageGrid = new ManageGrid();
  constructor(private authService:AuthService,private router:Router, private fb:FormBuilder,private toastr: ToastrService,private modal:NgbModal,private store: Store<AppState>) {
    this.user=store.select('user')
    this.renameForm=this.fb.group({
      user_id:['',[Validators.required]],
      oldSearchName:[{value: '', disabled: true},[Validators.required]],
      old_search_title:['',[Validators.required]],
      new_search_title:['',[Validators.required, Validators.maxLength(25)]]
    });
   }

  title = 'angulardatatables'; 
  idx:number=0;
  dtOptions: any = {};
  renameForm:FormGroup;
  submit:boolean=false;
  user:Observable<User>;
  load:number=0
  
  ngOnInit() {
    
    $('#cover-spin').show(0);
    this.user.subscribe(x=>{
      this.load=x.user
    })
    if(this.load==0){
      this.dtOptions = {
        paging:   false,
        searching: false,
      }
      $('#cover-spin').hide(0);
      return	
    }
    let init:boolean=false; 
    this.authService.getGridList(4).subscribe((data)=>{ 
       
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
      // ordering: true,
      colReorder: true,
      // serverSide: true,
      //processing: true,
      // order: [],
      aaSorting: [[ 1, 'asc' ]],
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
      paging: false,
      ajax: (dataTablesParameters: any, callback) => {
        //  $('#cover-spin').show(0);
          this.authService.savedSearch()
          .subscribe((data)=>{
            console.log(data) 
      
            this.data=data.data
            callback({
              recordsTotal: 10,
              recordsFiltered: 5,
              data: data.data
            });
            console.log(this.data);
            $('#cover-spin').hide(0);
          })
        },
        initComplete: function(settings, json) {
          if(init){
            init = false;
            $('#initGrid').click();
          }
          
        },
          columns: [{ data: 'title',title:'Name', width:'55%',orderable: false, render:function(data, type, row){           
            return '<span id="id'+ row.unique_id + '">' + row.title + '</span>';
          }},{ data: 'date', title:'Date & Time' },{
          data:'id',title:'Actions', orderable: false,  render:function(data, type, row){
            return '<Button class="btn btn-success">View</Button>  <Button class="btn btn-success rename">Rename</Button>'
          } 
        }],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {       
          const self = this;         
          $('td .btn-success', row).unbind('click');
          $('td .btn-success', row).bind('click', () => {
            self.someClickHandler(data);
          }); 
          $('td .btn-success.rename', row).unbind('click');
          $('td .btn-success.rename', row).bind('click', () => {
            self.renameClickHandler(data, index);
          });
          return row;
        }
        
    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  renameFormSubmit(){
    this.submit=true;
    if(!this.renameForm.valid){
      console.log('error')
      return;
    } else{
      $('#cover-spin').show(0);
      $('#renameSearchModal').modal('hide'); 
      this.authService.renameSavedSearch(this.renameForm.value).subscribe((data)=>{
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();                   
          this.toastr.success('Title Renamed Successfully', 'Success!');
        });
      },(error)=>{       
        this.toastr.error(error, 'Error!');
        $('#cover-spin').hide(0);
      });
      // $('#cover-spin').show(0);
      // let cellId = this.cellId;
      // let val = this.renameForm.get('new_search_title').value;      
      // this.authService.renameSavedSearch(this.renameForm.value).subscribe((data)=>{
      //   //console.log(data)        
      //   $('#'+cellId).text(val);
      //   $('#renameSearchModal').modal('hide');
      //  // alert(data.message);  
      //  this.toastr.success(data.message, 'Success!');       
      //   $('#cover-spin').hide(0);
      //   // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //   //  // dtInstance.row('tr:nth('+this.rowIndex+')').remove();
      //   //   dtInstance.draw();
      //   // }); 
      // },(error)=>{
      //   console.log(error)
      //   $('#renameSearchModal').modal('hide');
      //   $('#cover-spin').hide(0);
      //   this.toastr.error(error, 'Error!');//alert(error)
      // })
    }
  }
  someClickHandler(data){
    this.router.navigate(['/customer/search-list/'+data.unique_id])
  }
  renameClickHandler(info: any, index:number): void {
    this.submit=false;
    this.renameForm.reset();
    this.rowIndex = index;
    this.cellId = 'id' + info.unique_id;
    this.renameForm.patchValue({ 'old_search_title': info.title, 'user_id': info.user_id,'oldSearchName':info.title});
    $('#renameSearchModal').modal('show');    
  }

  manageGridReset(){
    this.manageGrid.gridSelect = 3;
    this.manageGrid.gridsStatus = [false, false,false];
    this.manageGrid.gridCol = [0,1,2];
    $('#manageGridHot').modal('hide');
    this.authService.setGridList(this.manageGrid).subscribe((data)=>{
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      for ( var i=0 ; i<3; i++ ) {
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
      for ( var i=0 ; i<3; i++ ) {
        dtInstance.column(i).visible( colStatus[i], true );
      }
      dtInstance.columns.adjust().draw( false );
    });
  }
  onGridSelectChange(event) {
    if(event) {
      for(var i=2;i>=0;i--){
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
      this.toastr.success("Save search manage grid saved successfully ", 'Success!');   
      $('#manageGridHot').modal('hide'); 
      var tmpArr = colOrder.slice().sort();    
      for ( var i = 0,j=0; i < 3; i++ ) {
        if(tmpArr[j]== i){
          j++;
        } else{
          missingOrder.push(i);   
        }
      }
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  
        for ( var i=0 ; i<3; i++ ) {
          dtInstance.column(i).visible( true, true );
        }    
        dtInstance['colReorder'].order(colOrder.concat(missingOrder), true);
        for( var i:number=tmpArr.length ; i < 3; i++ ) {
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
      this.manageGrid.gridSelect = 3; 
      const gridData={
        gridCol: data.gridCol,
        gridColName:  data.gridColName,
        gridSelect: 3,
        gridsStatus: data.gridsStatus,
        type: 4
      }

      this.authService.setGridList(gridData).subscribe((data)=>{ 
        this.toastr.success("Grids saved successfully", 'Success!');   
      })
      that.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {   
        for( var i:number=0 ; i < 3; i++ ) {
          dtInstance.column(i).visible( true, true );
        }
        dtInstance['colReorder'].order([...this.manageGrid.gridCol],true);
        for( var i:number=0 ; i < 3; i++ ) {
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
        gridSelect: 3,
        gridsStatus: gridDefault.gridsStatus,
        type: 4
      }

      this.authService.setGridList(gridData).subscribe((data)=>{ 
        this.toastr.success("Grids saved successfully", 'Success!');   
      })
      that.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {   
        for( var i:number=0 ; i < 3; i++ ) {
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
//function getValue() {
//   var retVal = prompt("Enter your name : ", "your name here");
//   document.write("You have entered : " + retVal);
// }