import { Component, OnInit, ViewChild, Renderer, ElementRef, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { data } from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConlactLogComponent } from '../property/conlact-log/conlact-log.component';
import * as _ from 'lodash';
declare var $: any;


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivitesComponent implements OnInit {

  constructor(private authService: AuthService, private actRouter: ActivatedRoute, private router: Router, elementRef: ElementRef, private renderer: Renderer, private modal: NgbModal) {

  }


  ngOnInit() {
  
  }

}
