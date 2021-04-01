import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchdataService {

  private searchDataSource = new BehaviorSubject([]);
  currentSearchData = this.searchDataSource.asObservable();

  constructor() { }

  changeSearchData(searchData:any) {
    this.searchDataSource.next(searchData)
  }
}