import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router';
import { NewsComponent } from './news.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import {SafePipe} from '../shared/SafePipe/safePipe.component';
const routes : Routes = [
  { path: '',component: NewsComponent },
  { path: ':id',component: NewsDetailComponent }
]

@NgModule({
  declarations: [NewsComponent,NewsDetailComponent,SafePipe],
  imports: [
    CommonModule, 
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class NewsModule { }
