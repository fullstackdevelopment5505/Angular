import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarketingDataService {
  message: any;
  subject :any;
  preHeader:any;
  title:any;
  save?:boolean;
  design:any;
  constructor() { }
}