import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';
import {FormBuilder, Validators, FormArray,FormGroup  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppState } from './../../../app.state';
import { User } from './../../../models/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { walletReachargeComponent } from 'src/app/shared/wallet-reacharge-modal/wallet-reacharge-modal.component';
import { CommonModalComponent } from 'src/app/shared/common-modal/common-modal.component';

interface iFonts{
  handwriting_style_id: string
  name: string
}

interface iImageTemplate{
  id: number
  save_image_template: string
  template_image_path: string
  user_id: number
}

interface iHandWriting{
  data: [iFonts]
}

class PostCard{
  handwriting_styles:iHandWriting
  image_templates:[iImageTemplate]
}

class PreviewTemplate{
  data?:string
}


class ResAddress{
  address?: string
  city?: string
  country?: string
  name?: string
  postal_code?: string
  property_id?: number
  province?: string
}

@Component({
  selector: 'app-create-postcard',
  templateUrl: './create-postcard.component.html',
  styleUrls: ['./create-postcard.component.scss']
})
export class CreatePostcardComponent implements OnInit {
  @ViewChild('r',{static:false}) r:ElementRef;
  currentStep:number = 1
  activeCard:number=1
  postCard = new PostCard();
  previewTemplate = new PreviewTemplate();
  postCardForm:FormGroup;
  cardForm:FormGroup;
  submit:boolean=false
  submitPost:boolean=false
  private modalRef: NgbModalRef;
  private previewRef: NgbModalRef; 
  user:Observable<User>;
  load:number=0
  name:string;
  address:string;
  postal:string;

  msgContent:string =''; // punch
  resAddress=new ResAddress()
  previewFlag = false; // punch
  submitFlag = false; // punch
  postTemplateList = {} ; // punch
  selectTemplate = {};//punch

  defaultSideImage?:string='assets/images/noImage.png'

  @ViewChild('content',{static:false}) private content;
  @ViewChild('content1',{static:false}) private content1;
  @ViewChild('slider',{static:false}) private slider;
  constructor(private modalService: NgbModal, private service:AuthService,private fb:FormBuilder,private toastr: ToastrService,private router:Router,private store: Store<AppState>
    ) { 
      this.user=store.select('user')
    }

  ngOnInit() {
    
    this.postCardForm=this.fb.group({
      comapany_goal:['',[Validators.required]],
      design_sample:['',[Validators.required]],
      fileSource:['',[Validators.required]],
      targets:['',[Validators.required]],
      primary_color:['#22A3C3',[Validators.required]],
      secondary_color:['#5EB568',[Validators.required]],
      font_family:['',[Validators.required]],
      postcard_content:['',[Validators.required]],
      additional_notes:['',[Validators.required]],
    })

    this.cardForm=this.fb.group({
      file:[''],
      front_image_url:[''],
      imageSource:[''],
      save_as_template:[false],
      handwriting_styles:['',[Validators.required]],
      message:['',[Validators.required,Validators.maxLength(240)]],
    })
    this.user.subscribe(x=>{
      this.load=x.user
    })
    if(this.load==0){
      $('#cover-spin').hide(0);
      return	
    }
    
    this.service.getPostcardData().subscribe(data=>{
      console.log(data.data)
      this.postCard=data.data
    })


  }

  prev(): void{
    this.currentStep=--this.currentStep
  }

  async nextFirst() {
    this.service.getPostemplateListNew().subscribe((data) => { // punch
      console.log('-changeimage') // punch
      this.postTemplateList = data;// punch
      console.log(data) // punch
      console.log('-changeimage') // punch
    }) // punch
    const records =await localStorage.getItem('postCardMember')
    if(records=='' || records==null){
      this.toastr.error('Please select records from Purchase Groups before continue', 'Error!');
    }
    else{ 
      this.currentStep=++this.currentStep
    }

  }

  nextSecond():void{
    if(this.defaultSideImage==='assets/images/noImage.png'){
      this.toastr.error('Please select image first!', 'Error!');
    }
    else{
      this.currentStep=++this.currentStep
    } 
  }

  nextThird():void{
    this.currentStep=++this.currentStep
  }

  selectCard(arg:number):void{
    this.activeCard=arg
  }


  createCustom(content):void{
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      if(result==='confirm'){
        this.customForm()
      }
    }, (reason) => {

    });
  }

  customForm(){
    this.modalRef = this.modalService.open(this.content1, { size: 'lg' })
  }

  submitForm():void{
    this.submit=true
    if (this.postCardForm.invalid) {
      console.log('invalid')
      return;
    }

    const formData = new FormData();
    formData.append('design_sample', this.postCardForm.get('fileSource').value)
    formData.append('postcard_size', this.activeCard===1 ?'4*6' :'6*9')
    formData.append('comapany_goal', this.postCardForm.get('comapany_goal').value)
    formData.append('targets', this.postCardForm.get('targets').value);
    formData.append('primary_color', this.postCardForm.get('primary_color').value);
    formData.append('secondary_color', this.postCardForm.get('secondary_color').value);
    formData.append('font_family', this.postCardForm.get('font_family').value);
    formData.append('postcard_content', this.postCardForm.get('postcard_content').value);
    formData.append('additional_notes', this.postCardForm.get('additional_notes').value);

    
    this.service.getWallet().subscribe(data=>{
      if(parseFloat(data.data.current_points.toFixed(2))>=data.data.custom_postcard_price){
        const batchdata={
          btnClass:'btn-success'
        }
        const modalRef3 = this.modalService.open(CommonModalComponent);
        
        modalRef3.componentInstance.type = 'custom postcard';
        modalRef3.componentInstance.data = batchdata;
        modalRef3.componentInstance.title = '';
        modalRef3.componentInstance.btnText = 'Confirm';
        modalRef3.componentInstance.content = `
          <div class="row successful_payment">
            <div class="text-center">
            </div>
            <h3>
              We are deducting $${data.data.custom_postcard_price} from your wallet for custom postcard design.
            </h3>
          </div>`;
      modalRef3.result.then((result) => {
        if(result === 'Cross click') {  return; }
        //this.batchPayment(batchdata,arg2);
        this.savePost(formData);
      }, (reason) => {
      // this.proceedLoader = false;
        console.log('reason ', reason);
      });


      }
      else{
      const batchdata={
        total_properties_post: 1,
        total_amount: data.data.custom_postcard_price,
        current_wallet_amount:data.data.current_points.toFixed(2)
      }
        
      const modalRef2 = this.modalService.open(walletReachargeComponent);

      modalRef2.componentInstance.type = 'wallet recharge';
      modalRef2.componentInstance.data = batchdata;
      
      modalRef2.result.then((result) => {
        if(result === 'Cross click') {  return; }
        this.savePost(formData);

      }, (reason) => {
       // this.proceedLoader = false;
        console.log('reason ', reason);
      });
      }
    })



  }


  savePost(formData){
    this.service.savePostCardDesign(formData).subscribe((data)=>{
      this.toastr.success('Request Sent Successfully!', 'Success!');
      this.postCardForm.reset()
      this.modalRef.close()
      this.submit=false
    },error=>{
      this.toastr.error('Someting Went Wrong!', 'Error!');
    })

  }

  onFileChange(event) {
    const reader = new FileReader();    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);    
      this.postCardForm.patchValue({
        fileSource: file
      });  
    }
  }

  onImageChange(event){
    const that =this
    const reader = new FileReader();    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);   
      reader.onload = () => {   
        // var img = new Image;
        // img.src = reader.result as string;
        // img.onload = function() {
        //   if(img.width===1875 && img.height===1275){
            that.defaultSideImage = reader.result as string; 
      //     }else{
      //       that.toastr.error('Check Dimentions of image!', 'Error!');
      //       return
      //     }
      //   };
      }; 
      this.cardForm.patchValue({
        imageSource: file,
        front_image_url:''
      });  
    }
  }

  postCardPreview(){
    this.submitPost=true
    this.previewFlag = true;// punch
    if (this.cardForm.invalid) {
      this.previewFlag = false; // punch1
       console.log('invalid')
      return;
    }
    const msg={
      message:this.cardForm.get('message').value,
      style:this.cardForm.get('handwriting_styles').value
    }
    this.service.getProfile().subscribe(async profile=>{
      console.log('-------- get profile -----------')
      console.log('profile',profile)
      this.name=profile.data.details.f_name
      this.address=profile.data.details.address
      this.postal=profile.data.details.postal

      const postCard = await localStorage.getItem('postCardMember')
      console.log('postCard',postCard)
      const propId=postCard.split(',')

      this.service.getPendingAddress(propId[0]).subscribe(da=>{
        this.resAddress=da.data[0]
        // punch start
        msg.message = msg.message.replaceAll('%FULL_NAME%', this.resAddress.name)
        msg.message = msg.message.replaceAll('%FIRST_NAME%', this.resAddress.name.split(' ')[0])
        msg.message = msg.message.replaceAll('%CITY%', this.resAddress.city)
        msg.message = msg.message.replaceAll('%ADDRESS%', this.resAddress.address)
        msg.message = msg.message.replaceAll('%STATE%', this.resAddress.province)
        console.log('msg.msg', msg.message)
        // punch end
        this.service.postCardPreview(msg).subscribe(data=>{
        this.previewFlag = false;// punch
        console.log('data',data)
           console.log('msg',msg)
         this.previewRef= this.modalService.open(this.slider, { size: 'xl' })
          this.previewTemplate=data
        },error=>{
          this.previewFlag = false;
          this.toastr.error(error, 'Error!');
        })//punch1
      },error=>{
        this.previewFlag = false;
        this.toastr.error(error, 'Error!');
      })//punch1



    },error=>{
      this.previewFlag = false;
      this.toastr.error(error, 'Error!');
    })//punch1
  }

  async submitCard(){
    // console.log(this.cardForm.get('save_as_template').value)
    // return;
    this.submitPost=true
    this.submitFlag = true; // punch
    if (this.cardForm.invalid) {
      console.log('invalid')
      return;
    }
    console.log(this.cardForm.value)
    const postCard = await localStorage.getItem('postCardMember')
    const recordType = await localStorage.getItem('recordType')
    const save_as_template = this.cardForm.get('save_as_template').value===true ? '1' : '0'
    const formData = new FormData();
    if(this.cardForm.get('front_image_url').value===''){
      console.log('ss')
      formData.append('file', this.cardForm.get('imageSource').value)
    }
    else{
      console.log('ssss')
      formData.append('front_image_url', this.cardForm.get('front_image_url').value)
    }
    formData.append('size', this.activeCard===1 ?'4*6' :'6*9')
    formData.append('message', this.cardForm.get('message').value)
    formData.append('property_id', postCard)
    formData.append('style', this.cardForm.get('handwriting_styles').value)
    formData.append('save_image_template', save_as_template) 
    formData.append('record_type', recordType) 

    this.service.sendPostCard(formData).subscribe(data=>{
      this.submitFlag = false; // punch
      localStorage.removeItem('postCardMember')
      localStorage.removeItem('recordType')
      ++this.currentStep
    })
  }


  changeImage(arg):void{
    //  punch start
        console.log('-- changeImage punch --')
        console.log(arg)
        var fArr = this.postTemplateList['data'].filter(sub =>{
          if(sub.front_image === arg)
              return true;
            return false;
        })
        this.selectTemplate = fArr[0];
        console.log('-- changeImage punch --')
        this.defaultSideImage=arg
        this.cardForm.patchValue({
          front_image_url: arg,
          imageSource: arg,
          handwriting_styles:this.selectTemplate['handwriting_style'],
          message:this.selectTemplate['message'],
        });   
    //  punch end
      }

  addText(e):void{


    var startPos=this.r.nativeElement.selectionStart;
    this.r.nativeElement.focus();
    this.r.nativeElement.value=this.r.nativeElement.value.substr(0,this.r.nativeElement.selectionStart)+e+this.r.nativeElement.value.substr(this.r.nativeElement.selectionStart,this.r.nativeElement.value.length);
    //this.r.nativeElement.selectionStart=startPos;
    //this.r.nativeElement.focus();
    this.msgContent = this.r.nativeElement.value; // punch
  }


  

  
}
