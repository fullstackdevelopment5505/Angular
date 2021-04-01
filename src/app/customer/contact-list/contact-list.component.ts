import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ContactListComponent implements OnInit {

  data:any=[];
  dtTrigger: Subject<any> = new Subject();
  constructor(private authService:AuthService) { }

  title = 'angulardatatables';
  dtOptions: any = {};
  dtOption: any = {};
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
      lengthMenu: [
        [20, 40, 60, 80, 100],
        [20, 40, 60, 80, 100]
      ],
      ajax: (dataTablesParameters: any, callback) => {
          this.authService.getWallet()
          .subscribe((data)=>{
            console.log(data) 
      
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
        } }, { data: 'point',title:'Point' }, { data: 'created_at',title:'Date' },{
          data:'id',title:'Actions',render:function(data, type, row){
            return '<Button class="btn btn-success">Message</Button>'
          }
        }],
        
    };

    this.dtOption = {
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
        [20, 40, 60, 80, 100],
        [20, 40, 60, 80, 100]
      ],
      ajax: (dataTablesParameters: any, callback) => {
          this.authService.getWallet()
          .subscribe((data)=>{
            console.log(data) 
      
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
        } }, { data: 'point',title:'Point' }, { data: 'created_at',title:'Date' },{
          data:'id',title:'Actions',render:function(data, type, row){
            return '<Button class="btn btn-success">Message</Button>'
          }
        }],
        
    };

  }
}
