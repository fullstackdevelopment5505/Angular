import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import {ExcelService} from '../../service/excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppState } from './../../app.state';
import { User } from './../../models/user.model';
import { Store } from '@ngrx/store';

import * as _ from 'lodash';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $: any;

class Action {
  id: number;
  status: number;
}

@Component({
  selector: 'app-purchased-history',
  templateUrl: './purchased-history.component.html',
  styleUrls: ['./purchased-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PurchasedHistoryComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  data: any = [];
  data1: any = [];
  dtTrigger: Subject<any> = new Subject();
  dtTrigger1: Subject<any> = new Subject();
  action = new Action();
  renameForm: FormGroup;
  cellId: string;
  submit: boolean = false;
  propertyIdList: any = [];
  exlTableData: any = [];

  searchForm: FormGroup;
  saveSearchForm: FormGroup;
  savedsearchFlag: boolean = false;
  fileInputLabel: string;
  url:string="";  
  user:Observable<User>;
  load:number=0
 
  renameForm2: FormGroup;

  constructor(private http: HttpClient, private modalService: NgbModal, private excelService:ExcelService, private authService: AuthService, private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    private store: Store<AppState>) {
      
    this.user=store.select('user')
    
    this.renameForm = this.fb.group({
      user_id: ['', [Validators.required]],
      oldGroupName: [{ value: '', disabled: true }, [Validators.required]],
      old_group_name: ['', [Validators.required]],
      new_group_name: ['', [Validators.required, Validators.pattern('^([-a-zA-Z0-9_ ])+$'), Validators.maxLength(25)]]
    });

    this.renameForm2 = this.fb.group({
      group_id: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      oldGroupName: [{ value: '', disabled: true }, [Validators.required]],
      old_group_name: ['', [Validators.required]],
      new_group_name: ['', [Validators.required, Validators.pattern('^([-a-zA-Z0-9_ ])+$'), Validators.maxLength(25)]]
    });

    this.searchForm = this.fb.group({
      savedTitle: [''],
      purchaseGroupName: ['']
    })
    this.saveSearchForm = this.fb.group({
      // savedTitle: ['', [Validators.maxLength(25)]],
      fileSource: '',
      myfile: [''],
      purchaseGroupName: ['', [Validators.pattern('^([-a-zA-Z0-9_ ])+$'), Validators.maxLength(25)]]
    })
  }

  title = 'angulardatatables';
  dtOptions: any = {};
  dtOptions1: any = {};
  ngOnInit() {
    $('#cover-spin').show(0);

    this.user.subscribe(x=>{
      this.load=x.user
    })
    if(this.load==0){
      this.dtOptions = {
        searching: false,
      }
      $('#cover-spin').hide(0);
      return
    }

    this.dtOptions1 = {
      dom: 'lBfrtip',
      responsive: true,
      // serverSide: true,
      //processing: true,
      buttons: [],
      searching: false,
      drawCallback: function () {
        var hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
        $('.dt-buttons')[0].style.display = hasRows ? '' : 'none'
      },
      pagingType: "full_numbers",
      lengthMenu: [
        [10, 20, 25, 50, 100, 150, 200, 250, 300, -1],
        [10, 20, 25, 50, 100, 150, 200, 250, 300, "All"]
      ],
      order: [],
      ajax: (dataTablesParameters: any, callback) => {
        // this.authService.getUploadedRecords().subscribe((data)=>{
        //   $('#cover-spin').hide(0);
          
        //   this.data = data.data;
        //   console.log(this.data, 'uploaded records')
        //   callback({
        //     data: data.data
        //   });
        // })
        this.authService.getUploadedGroup().subscribe((data)=>{
          $('#cover-spin').hide(0);
          this.data = data.data;
          console.log(this.data, 'users-uploaded-records')
          callback({
            data: data.data
          });
        
        })
        
      },
      columns: [      
        {
          data: 'result_id',
          title: 'Order ID'
        },
        {
          data: 'purchase_group_name',
          title: 'Purchased Group Name',
          width: '35%',
          // render: function (data, type, row) {
          //   return '<span id="id' + row.property_id + '">' + row.purchase_group_name + 
          //   '<small class="last_contact">Last Contact: July/10/2020</small>'+'</span>' ;
          // }
          render: function (data, type, row) {
            return '<span id="id' + row.id + '">' + row.purchase_group_name + 
            '</span>' ;
          }
        },
        {
          data: 'total', defaultContent: '-',
          title: 'Total'
        },
        {
          data: 'date', defaultContent: '- ', title: 'Date & Time', width: '15%'
        },
        // {
        //   data: 'id', title: 'Status', width: '151', orderable: false, render: function (data, type, row) {
        //     return row.green_flag === 1?'<span class="bg bg-success stats">Done <i class="ml-2 fa fa-thumbs-up fa-lg"></i></span>': (row.grey_flag===1? 
        //       '<span class="bg bg-secondary stats">Not Started <i class="ml-2 fa fa-exclamation-circle fa-lg"></i></span>': (row.teal_flag===1? '<span class="bg bg-info stats">In Progress <i class="ml-2 fa fa-refresh fa-lg"></i></span>': '')) 
        //   }
        // },
        {
          data: 'result_id', visible:false,  defaultContent: '-', title: 'Status', width: '151', orderable: false, render: function (data, type, row) {
            return row.green_flag === 1?'<span class="bg bg-success stats">Done <i class="ml-2 fa fa-thumbs-up fa-lg"></i></span>': (row.grey_flag===1? 
              '<span class="bg bg-secondary stats">Not Started <i class="ml-2 fa fa-exclamation-circle fa-lg"></i></span>': (row.teal_flag===1? '<span class="bg bg-info stats">In Progress <i class="ml-2 fa fa-refresh fa-lg"></i></span>': '<span class="bg bg-secondary stats">Not Started <i class="ml-2 fa fa-exclamation-circle fa-lg"></i></span>')) 
          }
        },
        {
          data: 'result_id', title: 'Actions', width: '151', orderable: false, render: function (data, type, row) {
            return '<Button class="btn btn-success view">View</Button> <Button class="btn btn-success rename rename1">Rename</Button>'
          }
        }],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Get row ID
        
        $('td .btn-success.view', row).unbind('click');
        $('td .btn-success.view', row).bind('click', () => {
          self.someClickHandler1(data);
        });
        $('td .btn-success.rename.rename1', row).unbind('click');
        $('td .btn-success.rename.rename1', row).bind('click', () => {
          self.renameClickHandler1(data);
        });
        return row;
      }
    };
    this.dtOptions = {
      dom: 'lBfrtip',
      responsive: true,
      // serverSide: true,
      //processing: true,
      buttons: [],
      searching: false,
      drawCallback: function () {
        var hasRows = this.api().rows({ filter: 'applied' }).data().length > 0;
        $('.dt-buttons')[0].style.display = hasRows ? '' : 'none'
      },
      pagingType: "full_numbers",
      lengthMenu: [
        [10, 20, 25, 50, 100, 150, 200, 250, 300, -1],
        [10, 20, 25, 50, 100, 150, 200, 250, 300, "All"]
      ],
      order: [],
      ajax: (dataTablesParameters: any, callback) => {
        this.authService.getPuechasedGroup()
          .subscribe((data) => {
            this.data = data.data.data;
            $('#cover-spin').hide(0);
            callback({
              data: data.data.data
            });
          })
      },
      columns: [      
        {
          data: 'property_id',
          title: 'Order ID'
        },
        {
          data: 'purchase_group_name',
          title: 'Purchased Group Name',
          width: '35%',
          // render: function (data, type, row) {
          //   return '<span id="id' + row.property_id + '">' + row.purchase_group_name + 
          //   '<small class="last_contact">Last Contact: July/10/2020</small>'+'</span>' ;
          // }
          render: function (data, type, row) {
            return '<span id="id' + row.property_id + '">' + row.purchase_group_name + 
            '</span>' ;
          }
        },
        {
          data: 'total',
          title: 'Total'
        },
        {
          data: 'date', title: 'Date & Time', width: '15%'
        },
        {
          data: 'id', title: 'Status', width: '151', orderable: false, render: function (data, type, row) {
            return row.green_flag === 1?'<span class="bg bg-success stats">Done <i class="ml-2 fa fa-thumbs-up fa-lg"></i></span>': (row.grey_flag===1? 
              '<span class="bg bg-secondary stats">Not Started <i class="ml-2 fa fa-exclamation-circle fa-lg"></i></span>': (row.teal_flag===1? '<span class="bg bg-info stats">In Progress <i class="ml-2 fa fa-refresh fa-lg"></i></span>': '')) 
          }
        },
        {
          data: 'id', title: 'Actions', width: '151', orderable: false, render: function (data, type, row) {
            return '<Button class="btn btn-success view">View</Button> <Button class="btn btn-success rename">Rename</Button>'
          }
        }],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Get row ID
        
        $('td .btn-success.view', row).unbind('click');
        $('td .btn-success.view', row).bind('click', () => {
          self.someClickHandler(data);
        });
        $('td .btn-success.rename', row).unbind('click');
        $('td .btn-success.rename', row).bind('click', () => {
          self.renameClickHandler(data);
        });
        return row;
      }
    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.dtTrigger1.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtTrigger1.unsubscribe();
  }
  renameFormSubmit() {
    this.submit = true;
    if (!this.renameForm.valid) {
      console.log('error')
      return;
    } else {
      $('#cover-spin').show(0);
      $('#renamePurchasedGroupModal').modal('hide');
      this.authService.renamePuechasedGroup(this.renameForm.value).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
          this.toastr.success('Group Renamed Successfully', 'Success!');
        });
      }, (error) => {
        this.toastr.error(error, 'Error!');
        $('#cover-spin').hide(0);
      });
    }
  }

  renameFormSubmit2() {
    this.submit = true;
    console.log(this.renameForm2.value);
    
    if (!this.renameForm2.valid) {
      console.log('error')
      return;
    } else {
      $('#cover-spin').show(0);
      $('#renamePurchasedGroupModal1').modal('hide');
      this.authService.renameGroup(this.renameForm2.value).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
          $('#crm1').DataTable().ajax.reload();
          this.toastr.success('Group Renamed Successfully', 'Success!');
        });
      }, (error) => {
        this.toastr.error(error, 'Error!');
        $('#cover-spin').hide(0);
      });
    }
  }

  someClickHandler(info: any): void {

   // this.router.navigate(['/customer/purchased-list/' + encodeURIComponent(grpName)]);
    this.router.navigate(['/customer/purchased-list/'+ info.purchase_group_name]);
  }
  someClickHandler1(info: any): void {
    this.router.navigate(['/customer/uploaded-list/'+ info.result_id]);
  }
  renameClickHandler(info: any): void {
    this.submit = false;
    this.renameForm.reset();
    this.cellId = 'id' + info.property_id;
    this.renameForm.patchValue({ 'old_group_name': info.purchase_group_name, 'user_id': info.user_id, 'oldGroupName': info.purchase_group_name });
    $('#renamePurchasedGroupModal').modal('show');
  }
  renameClickHandler1(info: any): void {
    this.submit = false;
    this.renameForm2.reset();
    this.cellId = 'id' + info.result_id;
    this.renameForm2.patchValue({ 'group_id': info.result_id, 'old_group_name': info.purchase_group_name, 'user_id': info.user_id, 'oldGroupName': info.purchase_group_name });
    $('#renamePurchasedGroupModal1').modal('show');
  }

  manageGridReset(){
  
  }
  manageGridInit(){
    
  }
  onFileSelect(event) {
    // let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   if (!_.includes(af, file.type)) {
    //     alert('Only EXCEL Docs Allowed!');
    //   } else {
    //     this.fileInputLabel = file.name;
    //     this.saveSearchForm.get('myfile').setValue(file);

    //   }
    // }
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    const reader = new FileReader();    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // if (!_.includes(af, file.type)) {
      //       this.toastr.error('Only EXCEL Docs Allowed!', 'Error!');
      //     } else {

      
      reader.readAsDataURL(file);    
      reader.onload = () => {   
        this.saveSearchForm.patchValue({
          myfile: reader.result
        }); 
        this.fileInputLabel =  this.saveSearchForm.value.fileSource.name;
        console.log(this.saveSearchForm.value.myfile)
      };

      this.saveSearchForm.patchValue({
        fileSource: file
      }); 
    // }
     
    }
  }
  submitSearchForm() {
    console.log("fbdgfbdgf");
      const formData = new FormData();
      formData.append('file', this.saveSearchForm.get('fileSource').value)
      formData.append('group_name', this.saveSearchForm.value.purchaseGroupName)
      this.authService.uploadExcelFile(formData).subscribe((data)=>{
      this.toastr.success('Uploaded Your Data Successfully', 'Success!');
      $('#UploadDataModal').modal('hide');
      $('#crm1').DataTable().ajax.reload();

    }, (error) => {
      console.log("Bdfbdf");
      this.toastr.error(error, 'Error!');

      this.saveSearchForm.patchValue({
        fileSource: '',
        myfile: [''],
        purchaseGroupName: ''
      }); 
    
      this.fileInputLabel = undefined;
    });

}
  
  
  ExportFile(): void{
    $('#UploadDataModal').modal('show');
  }
  importAsXLSX(): void {
    this.authService.getDefaultExcelTemplate().subscribe((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url= window.URL.createObjectURL(blob);
      window.open(url);

    });

  }
}
