import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { OwlModule } from 'ngx-owl-carousel';
import { DataTablesModule } from 'angular-datatables';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { FavListComponent } from './fav-list/fav-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HotLeadsComponent } from './hot-leads/hot-leads.component';
import { ExploreComponent } from './explore/explore.component';
import { AgmCoreModule } from '@agm/core';
const routes : Routes=[
  {path:'',component:ListComponent},
  {path:'favourite',component:FavListComponent},
  {path:'hot-leads',component:HotLeadsComponent},
  {path:'explore',component:ExploreComponent},
  {path:':id',component:ListDetailComponent}
];

@NgModule({
  declarations: [ListComponent,ListDetailComponent,FavListComponent,HotLeadsComponent,ExploreComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    OwlModule,
    DataTablesModule,
    AgmCoreModule,
    RouterModule.forChild(routes)
  ]
})
export class SearchModule { }
