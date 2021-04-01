import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

class News{
  title:string;
  description:string;
  filename:string;
  created_at:Date;
  views:string;
}
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements AfterViewInit {
  news:any=new News();
  category:any=[];
  recent:any=[];
  relatedNews:any=[];
  selectedCategory:number;
  selectedItem;
  constructor(private authService:AuthService,private actRouter:ActivatedRoute,private router:Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngAfterViewInit() {
    $('#cover-spin').show(0);
    this.authService.getNewsDetail(this.actRouter.params['value'].id)
    .subscribe(data=>{
      console.log(data)
      $('#cover-spin').hide(0);
      this.news=data.data
      this.selectedCategory = data.data.category;
      this.category=data.category
      this.recent=data.category_recent_news
      this.relatedNews= data.related_news
      this.selectedItem = data.category.find(i => i.id === data.data.category)
    })   
  }
  get recentByCategory() {
    return this.recent.filter( x => x.category == this.selectedCategory);
  }
  showNewsByCat(idx, newValue){
    this.selectedItem = newValue;  
    this.selectedCategory = newValue.id;
    this.router.navigate( ['/news'], {fragment: String(newValue.id)});
    // if(newValue.news_list.length>0){
    //   $('#cover-spin').show(0);    
    //   this.authService.getNewsDetail(newValue.news_list[0].url)
    //   .subscribe(data=>{
    //     console.log(data)
    //     this.news=data.data
    //     this.selectedCategory = data.data.category;
    //     this.category=data.category
    //     this.recent=data.category_recent_news
    //     this.relatedNews= data.related_news
    //     this.selectedItem = data.category.find(i => i.id === data.data.category)
    //     $('#cover-spin').hide(0);
    //   })       
    // }    
  }
}
