import { Component, OnInit,ViewEncapsulation,ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { AppState } from './../../../app.state';
import { User } from './../../../models/user.model';
import { Store } from '@ngrx/store';

interface iProgressResponse{
  created_at: string
  id: number
  status: string
  updated_at: string
}

class PostCardProgress{
  completed_postcards:[iProgressResponse]
  postcards_sent:[iProgressResponse]
  progress_postcards:[iProgressResponse]
}

@Component({
  selector: 'app-postcard-progress',
  templateUrl: './postcard-progress.component.html',
  styleUrls: ['./postcard-progress.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class PostcardProgressComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject();
  user:Observable<User>;
  load:number=0

  constructor(private service: AuthService, private router: Router,private store: Store<AppState>) { 
    this.user=store.select('user')
  }
  postCardProgress=new PostCardProgress()

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: any = {};
  dtOptions1: any = {};
  dtOptions2: any = {};
   ngOnInit() {

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

    const that = this;  
    this.dtOptions = {
      dom: 'lBfrtip',
      responsive: true,
      ordering: true,
      colReorder: true,
      // serverSide: true,
      processing: true,
      buttons:[],
      order: [],
      lengthMenu: [
        [20, 40, 60, 80, 100],
        [20, 40, 60, 80, 100]
      ],
      ajax: (dataTablesParameters: any, callback) => {

        this.service.postCardProgress().subscribe(data=>{
          this.postCardProgress=data.data
          console.log(this.postCardProgress)
          callback({
            recordsTotal: this.postCardProgress.postcards_sent.length,
            recordsFiltered: this.postCardProgress.postcards_sent.length,                          
            data: this.postCardProgress.postcards_sent
          });
        })

        },
        columns: [{ data: 'created_at',title:'Date', width:'55%',  render:function(data, type, row){
          return that.changeDateFormat(row.created_at.substring(0, 10));
        }},{ data: 'status',title:'Status',render:(data, type, row)=>{
          return row.status==='0'? '<label class="badge badge-info">Sent</label>' : (row.status==='1'? '<label class="badge badge-warning">In Progress</label>' : (row.status==='2'? '<label class="badge badge-success">Completed</label>': '<label class="badge badge-danger">Rejected</label>'))
        }  },{
          data:'id',title:'Actions',  render:function(data, type, row){
            return '<button class="btn btn-primary"><i class="fa fa-eye"></i> View Detail</button>'
          }
        }],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {       
          const self = this;         
          $('td .btn-primary', row).unbind('click');
          $('td .btn-primary', row).bind('click', () => {
            self.someClickHandler(data);
          }); 
          return row;
        }
        
    };

    this.dtOptions1 = {
      dom: 'lBfrtip',
      responsive: true,
      ordering: true,
      colReorder: true,
      // serverSide: true,
      processing: true,
      buttons:[],
      order: [],
      lengthMenu: [
        [20, 40, 60, 80, 100],
        [20, 40, 60, 80, 100]
      ],
      ajax: (dataTablesParameters: any, callback) => {

        this.service.postCardProgress().subscribe(data=>{
          this.postCardProgress=data.data
          callback({
            recordsTotal: this.postCardProgress.progress_postcards.length,
            recordsFiltered: this.postCardProgress.progress_postcards.length,                          
            data: this.postCardProgress.progress_postcards
          });
        })

        },
        columns: [{ data: 'created_at',title:'Date', width:'55%',render:function(data, type, row){
          return that.changeDateFormat(row.created_at.substring(0, 10));
        }},{ data: 'status',title:'Status',render:(data, type, row)=>{
          return row.status==='0'? '<label class="badge badge-info">Sent</label>' : (row.status==='1'? '<label class="badge badge-warning">In Progress</label>' : (row.status==='2'? '<label class="badge badge-success">Completed</label>': '<label class="badge badge-danger">Rejected</label>'))
        } },{
          data:'id',title:'Actions',  render:function(data, type, row){
            return '<button class="btn btn-primary"><i class="fa fa-eye"></i> View Detail</button>'
          }
        }],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {       
          const self = this;         
          $('td .btn-primary', row).unbind('click');
          $('td .btn-primary', row).bind('click', () => {
            self.someClickHandler(data);
          }); 
          return row;
        }
        
    };

    this.dtOptions2 = {
      dom: 'lBfrtip',
      responsive: true,
      ordering: true,
      colReorder: true,
      // serverSide: true,
      processing: true,
      buttons:[],
      order: [],
      lengthMenu: [
        [20, 40, 60, 80, 100],
        [20, 40, 60, 80, 100]
      ],
      ajax: (dataTablesParameters: any, callback) => {

        this.service.postCardProgress().subscribe(data=>{
          this.postCardProgress=data.data
          callback({
            recordsTotal: this.postCardProgress.completed_postcards.length,
            recordsFiltered: this.postCardProgress.completed_postcards.length,                          
            data: this.postCardProgress.completed_postcards
          });
        })

        },
        columns: [{ data: 'created_at',title:'Date', width:'55%',render:function(data, type, row){
          return that.changeDateFormat(row.created_at.substring(0, 10));
        }},{ data: 'status',title:'Status' ,render:(data, type, row)=>{
          return row.status==='0'? '<label class="badge badge-info">Sent</label>' : (row.status==='1'? '<label class="badge badge-warning">In Progress</label>' : (row.status==='2'? '<label class="badge badge-success">Completed</label>': '<label class="badge badge-danger">Rejected</label>'))
        } },{
          data:'id',title:'Actions',  render:function(data, type, row){
            return '<button class="btn btn-primary"><i class="fa fa-eye"></i> View Detail</button>'
          }
        }],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {       
          const self = this;         
          $('td .btn-primary', row).unbind('click');
          $('td .btn-primary', row).bind('click', () => {
            self.someClickHandler(data);
          }); 
          return row;
        }
        
    };
    
  }
  someClickHandler(data){
    this.router.navigate([`/customer/postcard/progress/${data.id}`])
  }

  changeDateFormat(data){
    const date = data.split('-')
    let month=''
    switch (date[1]) {
        case '1':
          month = "Jan";
        break;
        case '2':
          month = "Feb";
        break;
        case '3':
          month = "Mar";
        break;
        case '4':
          month = "Apr";
        break;
        case '5':
          month = "May";
        break;
        case '6':
          month = "Jun";
        break;
        case '7':
          month = "Jul";
        break;
        case '8':
          month = "Aug";
        break;
        case '9':
          month = "Sep";
        break;
        case '10':
          month = "Oct";
        break;
        case '11':
          month = "Nov";
        break;
        case '12':
          month = "Dec";
        break;

    }
    return `${date[2]}-${month}-${date[0]}`

  }

}
