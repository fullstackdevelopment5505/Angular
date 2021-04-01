import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormArray,FormGroup  } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private toastr: ToastrService) { }
  // "id": 4,
  // "page_name": "contact",
  // "page_title": "We\u2019d love to hear from you",
  // "page_slug": "",
  // "": "<p>Whether you have a question about features, trials, pricing, need a demo, or anything else, our team is ready to answer all your questions.&nbsp;<\/p>\r\n\r\n<p>&nbsp;<\/p>\r\n\r\n<h3>Sales Enquiries<\/h3>\r\n\r\n<p>Interested in any of our products? Talk to our experts today<\/p>\r\n\r\n<p><strong>US:<\/strong>&nbsp;+1 (855) 747 6767<\/p>",
  // "page_metadata": "(123) 123-2312",
  // "deleted_at": null,
  // "created_at": "2020-04-27 20:05:03",
  // "updated_at": "2020-04-28 01:31:05",
  // "extra_content": null
  staticAlertClosed:boolean = true;
  pageTitle:string;
  pageContent:string;
  pageExtraContent:string;
  contactForm:FormGroup;
  submit:boolean=false
  ngOnInit() {
    $('#cover-spin').show(0);
    this.authService.getContactDetails().subscribe((data)=>{
      //console.log(data)
      this.pageTitle = data.page_title;
      this.pageContent = data.page_content;
      this.pageExtraContent = data.extra_content;
      $('#cover-spin').hide(0);
    })
    this.contactForm=this.fb.group({
      first_name:['',[Validators.required,Validators.pattern('^[A-Za-z]+$')]],
      last_name:['',[Validators.required,Validators.pattern('^[A-Za-z]+$')]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),Validators.minLength(10),Validators.maxLength(11)]],
      description:['',[Validators.required]],
      aliases: this.fb.array([
        this.fb.control('')
      ])
    }) 
  }
  onChangeFormatPhoneNumber(event:any){    
    event.target.value = this.formatPhoneNumber(event.target.value)
  }
  formatPhoneNumber(phoneNumberString) {    
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return phoneNumberString
  }
  submitForm(){
    $('#cover-spin').show(0);
    this.submit=true;
    if(!this.contactForm.valid){
      console.log('error');
      $('#cover-spin').hide(0);
      return
    }

    this.authService.saveContact(this.contactForm.value)
    .subscribe((user)=>{
     // alert('We appreciate that you’ve taken the time to write us. We have received your enquiry and will respond to you within 24 hours.  For urgent enquiries please call us on one of the telephone numbers below.');
      //alert(user.message)
      //this.toastr.success('We appreciate that you’ve taken the time to write us. We have received your enquiry and will respond to you within 24 hours.  For urgent enquiries please call us on one of the telephone numbers below.', 'Success!'); 
      this.staticAlertClosed = false;
      console.log(user)
      $('#cover-spin').hide(0);
    },(error)=>{
      console.log(error)
      this.toastr.error(error, 'Error!');
      $('#cover-spin').hide(0);
    })
    this.submit=false;
    this.contactForm.reset()

  }

}
