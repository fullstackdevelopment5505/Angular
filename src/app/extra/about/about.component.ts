import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
declare var $: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {


  constructor(private authService:AuthService) { }
  mainData:any;
  page_content:string;
  page_title:string;
  sliderData:any;
  teamsData:any;
  ngOnInit() {
    $('#cover-spin').show(0);
    this.authService.getAbout().subscribe((data)=>{
      console.log('about')
      this.mainData = data.data.AboutData;
      this.page_title = data.data.AboutData.page_title;
      this.page_content = data.data.AboutData.page_content;
      this.sliderData = data.data.slider;
      $('#cover-spin').hide(0);
     // console.log(this.sliderData)
    })
    this.authService.getTeams().subscribe((data)=>{
      this.teamsData=data.data.team_list;
    })
    $(".filter-button").click(function(){
      var value = $(this).attr('data-filter');
      $(this).eq(0).addClass('active_cta');
      $(this).addClass('active_cta');
      $(this).siblings().removeClass('active_cta');
      if(value == "all")
      {
          //$('.filter').removeClass('hidden');
          $('.filter').show('1000');
      }
      else
      {
//       $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//       $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
          $(".filter").not('.'+value).hide('3000');
          $('.filter').filter('.'+value).show('3000');
          
      }
  });
  
  if ($(".filter-button").removeClass("active")) {
  $(this).removeClass("active");
  }
  $(this).addClass("active");
  }
  get filterByStatus() {
    if(this.sliderData){
      this.sliderData.sort((a, b) => (a.position > b.position) ? 1 : -1);
      return this.sliderData.filter( x => x.status == 1);
    }  else{
      return this.sliderData;
    }  
  }

}
