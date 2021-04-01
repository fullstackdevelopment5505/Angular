import { Component, OnInit, Input } from '@angular/core';
import { CommonModal } from 'src/app/shared/enums/common-model.enum';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.scss']
})
export class CommonModalComponent implements OnInit {

  currentModel: any;
  modalType: any;
  @Input() public type;
  title = 'angulardatatables';
  dtOptions: any = {};
  constructor(private activeModel: NgbActiveModal) {
    this.modalType = CommonModal;
  }

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
      ]
      // ajax: (dataTablesParameters: any, callback) => {
      // },
      //  columns: [],
      //   rowCallback: (row: Node, data: any[] | Object, index: number) => {
      //      return row;
      //   }
        
    };

  }

  close(popupName: string) {
    this.activeModel.close(popupName);
  }

  handleSection() {
    this.activeModel.close(this.type);
  }


}
