import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hot-leads',
  templateUrl: './hot-leads.component.html',
  styleUrls: ['./hot-leads.component.scss']
})
export class HotLeadsComponent implements OnInit {
  displayMode:number = 1;
  constructor() { }

  ngOnInit() {
  }
  onDisplayView(mode: number): void {
    this.displayMode = mode;
  }
  
}
