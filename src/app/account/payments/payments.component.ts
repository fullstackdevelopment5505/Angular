import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  dtOptions={}
  public data = [
    {address: '184 MARION COUNTY 6094, FLIPPIN, AR 72634', name: 'credited', amount:'$6.75',date:'12/11/2019'},
    {address: '184 MARION COUNTY 6094, FLIPPIN, AR 72634', name: 'credited', amount:'$6.75',date:'12/11/2019'},
    {address: '184 MARION COUNTY 6094, FLIPPIN, AR 72634', name: 'credited', amount:'$6.75',date:'12/11/2019'},
    {address: '184 MARION COUNTY 6094, FLIPPIN, AR 72634', name: 'credited', amount:'$6.75',date:'12/11/2019'},
    {address: '184 MARION COUNTY 6094, FLIPPIN, AR 72634', name: 'credited', amount:'$6.75',date:'12/11/2019'},
    {address: '184 MARION COUNTY 6094, FLIPPIN, AR 72634', name: 'credited', amount:'$6.75',date:'12/11/2019'},
    {address: '184 MARION COUNTY 6094, FLIPPIN, AR 72634', name: 'credited', amount:'$6.75',date:'12/11/2019'},
    {address: '184 MARION COUNTY 6094, FLIPPIN, AR 72634', name: 'credited', amount:'$6.75',date:'12/11/2019'},
    {address: '184 MARION COUNTY 6094, FLIPPIN, AR 72634', name: 'credited', amount:'$6.75',date:'12/11/2019'},
    {address: '184 MARION COUNTY 6094, FLIPPIN, AR 72634', name: 'credited', amount:'$6.75',date:'12/11/2019'},
];
  title = 'angulardatatables';
  //dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      select: true,
      processing: true,
      buttons: [ 'copy','print','csv','excel','pdf'],
    };
}

}
