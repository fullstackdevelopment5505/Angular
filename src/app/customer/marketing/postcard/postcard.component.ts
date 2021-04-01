import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModalComponent } from '../common-modal/common-modal.component';
import { CommonModal } from 'src/app/shared/enums/common-model.enum';
import { EmailEditorComponent } from 'angular-email-editor';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { MarketingDataService } from 'src/app/service/marketing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'console';
declare var $: any;
@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss'],
  providers: [EmailEditorComponent]
})
export class PostcardComponent implements OnInit {
  isPostcard: boolean = true;
  isNewPostcard: boolean = false;
  postCardPostHtml: any = "";
  postCardPostDesign: any = "";
  postcardTemplateList: any = [];
  postcardTemplateData: any = [];
  preview:any="";
  showTemplateDesign={};
  postCardData:any={};
  searchModel:any = {};
  options = {
  };
  constructor(private modalService: NgbModal, private toastr: ToastrService, private authService: AuthService, private marketingDataService: MarketingDataService, private router: Router) { }


  ngOnInit() {
    this.getPostCardData();
  }
  @ViewChild('editor', { static: false })
  private emailEditor: EmailEditorComponent
  handleSection(Ident: any) {
    if (Ident == "faq" || Ident == "payment" || Ident == "paymentSucess") {
      this.isPostcard = true;
      this.isNewPostcard = false;
    }
    else {
      this.isPostcard = false;
      this.isNewPostcard = true;
    }
  }

  backBtnClick() {
    window.location.reload();
    this.getPostCardData();
    this.isPostcard = true;
    this.isNewPostcard = false;
  }

  open(Ident: any) {
    const modalRef = this.modalService.open(CommonModalComponent, { size: 'lg' });
    modalRef.componentInstance.currentModel = CommonModal.Faq;
    modalRef.componentInstance.type = Ident;
    modalRef.result.then((result) => {
      this.handleSection(result);
    }, (reason) => {

    });
  }
  /* method Name:SavePostCard
    Purpose: To save post card
    autor :mahendra singh */
  SavePostCard() {
  $('#cover-spin').show(0);
    this.emailEditor.editor.exportHtml((data) => {
      this.postCardPostHtml = data.html;
      this.postCardPostDesign=data.design;
       if (data) {
        this.postCardData = {
          "message":"testing",
          "front_image_url":  this.postCardPostHtml,
          "size": "4*6",
          "property_id":"",
          "style":"16",
          "title":this.postCardData.title,
          "template_json":this.postCardPostDesign
        }
        
        this.authService.savePostcardDesign(this.postCardData).subscribe((data) => {
          if (data) {
           $('#cover-spin').hide(0);
            this.toastr.success('Successfully', 'Success!');
            this.postCardData = {};
          }
        }, (error) => {
         $('#cover-spin').hide(0);
          this.toastr.error(error, 'Error!');
        });
       
      }
    });
  }
  /* method Name:SendPostCard
    Purpose: To send post card
    autor :mahendra singh */
  SendPostCard() {
    this.marketingDataService.message = this.postCardPostHtml;
    this.marketingDataService.title=this.postCardData.title;
    this.marketingDataService.design=this.postCardPostDesign;
    this.router.navigate(['/customer/' + 'chooseProspect'], { queryParams: { prospect: 'postcard' } });
  }
  /* method Name:getPostCatdData
  Purpose: To get post card data
  autor :mahendra singh */
  getPostCardData() {
   $('#cover-spin').show(0);
    this.authService.getPostemplateList().subscribe((data) => {
    this.postcardTemplateList = data.data;
    this.postcardTemplateData=data.data;
   $('#cover-spin').hide(0);
    })
  }
  /* method Name:showPreview
  Purpose: To show  email template
  author :mahendra singh */
  showPreview(modelId, templateData) {
    if (modelId) {
      this.preview=templateData.front_image;
      $(modelId).modal();
    }
  }

  searchPostcard(){
    
    if(this.searchModel.searchText){
      this.postcardTemplateList = this.postcardTemplateData.filter(x=>x.name == this.searchModel.searchText);
    }
    else{
      this.postcardTemplateList = this.postcardTemplateData;
    }
  }

  editorLoaded(event) {
   if(this.showTemplateDesign && Object.keys(this.showTemplateDesign).length){
      this.emailEditor.editor.loadDesign(this.showTemplateDesign);
   }

  }
  editPostCard(item){
  
  this.isPostcard = false;
  this.isNewPostcard = true;
  this.postCardData.title=item.template_title;
  this.showTemplateDesign=JSON.parse(item.template_json);
  }

  async createPostCard(){
    const records =await localStorage.getItem('postCardMember')
    if(records=='' || records==null){
      this.toastr.error('Please select records from Purchase Groups before continue', 'Error!');
    }
    else{
      this.router.navigate(['/customer/postcard/create']);
    }
  }
  
}
