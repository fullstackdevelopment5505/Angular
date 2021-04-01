import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reminder-open',
  templateUrl: './reminder-open.component.html',
  styleUrls: ['./reminder-open.component.scss']
})
export class ReminderOpenComponent implements OnInit {

  @Input() public data

  constructor(private activeModel: NgbActiveModal,private modal:NgbModal,private router: Router) { }

  ngOnInit() { 
    console.log(this.data)
  }

  close() {
    this.activeModel.close();
  }
  open(){
    this.close()
    this.router.navigate(['/customer/property', this.data.properties[0].PropertyId]);
  }
}
