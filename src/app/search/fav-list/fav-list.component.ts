import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss']
})
export class FavListComponent implements OnInit {

  constructor() { }

  ngOnInit() {

// Grid View List
$("#listing_prop .listing_heading a.grid_btn").click(function(){
  $(".columns").addClass("grids_layout");
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
});

$("#listing_prop .listing_heading a.list_view").click(function(){
  $(".columns").removeClass("grids_layout");
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
});


$("#listing_prop .listing_heading a.four_list").click(function(){
  $(".columns").addClass("empty_view");
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
});

$("#listing_prop .listing_heading a.grid_btn, #listing_prop .listing_heading a.list_view").click(function(){
  $(".columns").removeClass("empty_view");
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
});


  }

}
