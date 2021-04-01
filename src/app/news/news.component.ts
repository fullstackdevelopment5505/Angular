import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news:any=[];
  category:any=[];
  recent:any=[];
  selectedCategory:number;
  selectedItem;
  fregment=1;
  catId:number;
  constructor(private authService:AuthService,private actRouter:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    $('#cover-spin').show(0);
    this.actRouter.fragment.subscribe((fragment: string) => {
      //console.log(fragment);
      this.catId = parseInt(fragment);
    })

    this.authService.getNews()
    .subscribe(data=>{
      console.log(data)
      $('#cover-spin').hide(0);
      this.news=data.data
      this.category=data.category     
      this.recent=data.recent
      if(this.catId>0){
        this.selectedItem = this.category.find(i => i.id === this.catId);
        this.selectedCategory = this.selectedItem.id;
      }else{
        this.selectedItem = this.category[0]
        this.selectedCategory = this.category[0].id;
      }
    })
  }
  get newsByCategory() {
    return this.news.filter( x => x.category == this.selectedCategory);
  }
  get recentByCategory() {
    return this.recent.filter( x => x.category == this.selectedCategory);
  }
  showNewsByCat(idx, newValue){
    this.selectedItem = newValue;  
    this.selectedCategory = newValue.id;
  //  this.router.navigate( ['/news'], {fragment: String(newValue.id)});
  //  console.log(event.target)
  }
}
