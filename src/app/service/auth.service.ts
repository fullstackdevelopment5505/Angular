
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

interface PropertyList {
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  leftMenuOpen: boolean = true;

  getRegister(User) {
    return this.http.post<any>('register-one', User)
    // .pipe(map(user=>{
    //   // register successful if there's a jwt token in the response
    //   if(user && user.data.token){
    //     localStorage.setItem('currentUser', JSON.stringify(user.data));
    //   }
    //   return user;
    // }))
  }
  // punch phone code send
  sendPhoneCode(to){
    return this.http.post<any>('sendPhone', {to:to})
  }
   // new
   getPostemplateListNew() {
    return this.http.get<any>('get-postcards-new')
      .pipe(map(data => {
        return data.data
      }));
  }
// punch phone code send

  setChangePassword(User) {
    return this.http.post<any>('customer-reset-password', User);
  }
  getRegisterTwo(User) {
    return this.http.post<any>('register', User)
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('paidMember');
    // localStorage.clear();
  }

  getLogin(User) {
    return this.http.post<any>('login', User)
      .pipe(map(user => {
        // register successful if there's a jwt token in the response
        if (user && user.data.token) {
          localStorage.setItem('currentUser', JSON.stringify(user.data));
        }
        return user;
      }))
  }
  getLoginCntnt() {
    return this.http.get<any>('cms?page=login')
  }
  getcookies() {
    return this.http.get<any>('session-cookie')
  }
  getAffiliateLogin(User) {
    return this.http.post<any>('affiliate-login', User)
      .pipe(map(user => {
        // register successful if there's a jwt token in the response
        if (user && user.data.token) {
          localStorage.setItem('affiliateUser', JSON.stringify(user.data));
        }
        return user;
      }))
  }
  getRegisterTwoCntnt() {
    return this.http.get<any>('cms?page=signup')
  }
  forgotPassword(email) {
    return this.http.post<any>('forgot-password', email)
  }
  setForgotChangePassword(data) {
    return this.http.post<any>('reset/password', data);
  }
  getKickList() {
    return this.http.get<any>('list')
  }
  getKickListLogin() {
    return this.http.get<any>('list-login')
  }

  getListDetail(value) {
    return this.http.get<any>('list/' + value)
      .pipe(map(data => {
        return data.data
      }));
  }

  getListDetailLogin(value) {
    return this.http.get<any>('list-login/' + value)
      .pipe(map(data => {
        return data.data
      }));
  }

  getSubscribe(value) {
    return this.http.post<any>('subscribe', value)
  }

  saveContact(value) {
    return this.http.post<any>('contact', value)
  }
  getContactDetails() {
    return this.http.get<any>('cms?page=contact')
      .pipe(map(data => {
        return data.data
      }));
  }
  getFaq() {
    return this.http.get<any>('faq')
  }
  getPrivacy() {
    return this.http.get<any>('privacy')
  }
  getTerms() {
    return this.http.get<any>('terms')
  }
  getAbout() {
    return this.http.get<any>('about')
  }
  getTeams() {
    return this.http.get<any>('teams')
  }
  getTeamDetails(data) {
    return this.http.get<any>('team-detail/' + data)
  }
  getCareer() {
    return this.http.get<any>('cms?page=career')
  }
  getPropertyDeposite(value) {
    return this.http.post<any>('property-deposite', value)
  }
  getReportDeposite(value) {
    return this.http.post<any>('report-deposite', value)
  }
  getDeposite(value) {
    return this.http.post<any>('deposite', value)
  }

  getWallet() {
    return this.http.get<any>('wallet')
  }

  getWalletPintsToDeduct(data: number) {
    /*if(data>0 && data<=100){
      return 50;
    } else if(data>100 && data<=500){
      return 200;
    } else if(data>500 && data<=1000){
      return 400;
    } else{
      return null;
    }*/
    return (data * 10);
  }

  updateWallet(data) {
    return this.http.post<any>('update-wallet', { 'amount': data });
  }

  getSearchPage() {
    return this.http.get<any>('search-page')
  }


  postSearch(data) {
    return this.http.post<any>('search', data)
  }

  postAction(data) {
    return this.http.post<any>('action', data)
  }

  searchDetail(data) {
    return this.http.get<any>('search-detail/' + data)
  }

  getState() {
    return this.http.get<any>('state')
  }

  getCounty(data) {
    //return this.http.get<any>('county/'+data)
    return this.http.get<any>('state-county/' + data)
  }

  getCount(data) {
    return this.http.post<any>('get-count', data)
  }

  getResult(data) {
    return this.http.post<any>('get-result', data)
  }

  getPuechasedRec() {
    return this.http.get<any>('purchased-records')
  }
  getPuechasedGroup() {
    return this.http.get<any>('get-purchase-group')
  }
  // GET for view all data uploaded records
  getUploadedRecords() {
    return this.http.get<any>('users-uploaded-records' )
  }
  // POST for view all data uploaded records
  getUploadedRecords1(data) {
    return this.http.post<any>('users-uploaded-records' , data)
  }
  // for default page upload group  page
  getUploadedGroup() {
    return this.http.get<any>('get-users-uploaded-group')
  }
  //for single upload file
  getUploadedList(data) {
    return this.http.post<any>('get-uploaded-data-by-group', data)
  }
  getPuechasedList(data) {
    return this.http.post<any>('get-purchase-leads', data)
  }
  getPurchaseRecords(data) {
    return this.http.post<any>('all-group-properties', data)
  }
  renamePuechasedGroup(data) {
    return this.http.post<any>('rename-purchase-group', data);
  }

  renameGroup(data) {
    return this.http.post<any>('rename-group-name', data);
  }

  getLeads() {
    return this.http.get<any>('get-leads')
  }

  pushTrash(data) {
    return this.http.post<any>('push-trash', data);
  }

  getTrash() {
    return this.http.get<any>('get-trash');
  }

  pullTrash(data) {
    return this.http.post<any>('pull-trash', data);
  }
  permanentTrash(data) {
    return this.http.post<any>('delete-permanent', data);
  }
  getProfile() {
    return this.http.get<any>('profile')
      .pipe(map(data => {
        if (data.data.reg_status == 1) {
          localStorage.setItem('paidMember', 'true');
        } else {      //if(data.data.reg_status==0){
          localStorage.removeItem('paidMember');
        }
        return data;
      }))
  }

  getStates() {
    return this.http.get<any>('states');
  }
  getCity(data) {
    return this.http.get<any>('city/' + data);
  }
  getCityByCounty(data) {
    return this.http.get<any>('countycity/' + data);
  }
  updateProfile(data) {
    return this.http.post<any>('profile', data);
  }

  kickList() {
    return this.http.get<any>('kick-list');
  }

  kickListLogin() {
    return this.http.get<any>('kick-list-login');
  }

  getPaymentPage() {
    return this.http.get<any>('payment-page');
  }
  cancelMembership() {
    return this.http.get<any>('cancel-membership');
  }
  buyMembership(data) {
    return this.http.post<any>('buy-membership', data);
  }

  membershipPage() {
    return this.http.get<any>('membership-page');
  }
  getMembershipDetails() {
    return this.http.get<any>('cms?page=membership')
      .pipe(map(data => {
        return data.data
      }));
  }

  deleteCard(data) {
    return this.http.post<any>('delete-card', data);
  }

  getInterested(data) {
    return this.http.post<any>('interested-property', data);
  }
  getInterestedAll() {
    return this.http.get<any>('all-interested-propert');
  }
  getHighlyInterested(data) {
    return this.http.post<any>('highly-interested-property', data);
  }
  getHighlyInterestedAll() {
    return this.http.get<any>('all-highly-interested-property');
  }
  getContactLog(data) {
    return this.http.get<any>('contact-logs/' + data);
  }
  addContactLog(data) {
    return this.http.post<any>('add-contact-logs', data);
  }
  getGridList(data) {
    return this.http.get<any>('grid-list/' + data);
  }
  setGridList(data) {
    return this.http.post<any>('save_grid', data);
  }
  removeIntrested(data) {
    return this.http.post<any>('interested-remove', data);
  }

  saveSearch(data) {
    return this.http.post<any>('save-search', data);
  }

  savedSearch() {
    return this.http.get<any>('saved-search');
  }
  renameSavedSearch(data) {
    return this.http.post<any>('rename-saved-search-title', data);
  }
  getSearchResult(data) {
    return this.http.get<any>('saved-search/' + data)
      .pipe(map(data => {
        return data.data;
      }));
  }
  kickstarterSavedSearch() {
    return this.http.get<any>('kick-map-savesearch');
  }

  getDepositeForReport(value) {
    return this.http.post<any>('report-deposite', value)
  }
  generateReport(data) {
    return this.http.post<any>('report', data);
  }

  getReports() {
    return this.http.get<any>('records');
  }

  saveNote(data) {
    return this.http.post<any>('note', data);
  }


  dashboard() {
    return this.http.get<any>('dashboard')
      .pipe(map(data => {
        return data.data
      }));
  }
  getNews() {
    return this.http.get<any>('news')
      .pipe(map(data => {
        return data.data
      }));
  }

  getNewsDetail(data) {
    return this.http.get<any>('news/' + data)
      .pipe(map(data => {
        return data.data
      }));
  }
  getNewsByCategory(data) {
    return this.http.get<any>('newsbycategory/' + data)
      .pipe(map(data => {
        return data.data
      }));
  }
  getHomeDetails() {
    return this.http.get<any>('cms?page=home')
      .pipe(map(data => {
        return data.data
      }));
  }
  getHomeBanner() {
    return this.http.get<any>('home/banner')
      .pipe(map(data => {
        return data.data
      }));
  }
  getHomeService() {
    return this.http.get<any>('home/service')
      .pipe(map(data => {
        return data.data
      }));
  }
  getHomeKickstarter() {
    return this.http.get<any>('home/kickstarter')
      .pipe(map(data => {
        return data.data
      }));
  }
  getHomeCounter() {
    return this.http.get<any>('home/counter')
      .pipe(map(data => {
        return data.data
      }));
  }
  getHomePlaystore() {
    return this.http.get<any>('home/playstore')
      .pipe(map(data => {
        return data.data
      }));
  }

  getFooterNews() {
    return this.http.get<any>('footer-news')
      .pipe(map(data => {
        return data.data
      }));
  }
  getFooterCopyCntnt() {
    return this.http.get<any>('cms?page=footer-copyright')
      .pipe(map(data => {
        return data.data
      }));
  }
  saveLike(data) {
    return this.http.post<any>('save-like', data)
      .pipe(map(data => {
        return data.message
      }));
  }
  getTrendingProperties() {
    return this.http.get<any>('trending-property')
      .pipe(map(data => {
        return data.data
      }));
  }

  getPropertyImage(propId) {
    return this.http.get<any>('property-image/' + propId)
      .pipe(map(data => {
        return data.data
      }));
  }
  getPropertyDetail(data) {
    return this.http.get<any>('property-detail/' + data)
  }
  getUploadedPropertyDetail(property_id) {
    return this.http.post<any>('get-record-detail' , {property_id})
  }
  getDemograph(data) {
    return this.http.get<any>('demograph-data/' + data)
  }
  getuploadedDemograph(data) {
    return this.http.get<any>('get-imported-record-demograph-data/' + data)
  }

  getBecomeMemberPopupCntnt() {
    return this.http.get<any>('cms?page=become_member_popup')
      .pipe(map(data => {
        return data.data
      }));
  }
  getAffiliateRegister(data) {
    return this.http.post<any>('affiliate-register', data)
  }
  getAffiliateCntnt() {
    return this.http.get<any>('cms?page=affiliate')
      .pipe(map(data => {
        return data.data
      }));
  }
  getAffiliateFaqs() {
    return this.http.get<any>('cms?page=faqs')
      .pipe(map(data => {
        return data.data
      }));
  }

  //marketing section---------
  getSMSListData() {
    return this.http.get<any>('sms-list')
      .pipe(map(data => {
        return data.data
      }));
  }
  sendSMS(data) {
    return this.http.post<any>('send-sms', data)
  }
  getAllSMSDetails() {
    return this.http.get<any>('saved-prospects-phone')
      .pipe(map(data => {
        return data.data
      }));
  }
  
  getAllEmailsetails(){
    return this.http.get<any>('saved-prospects-email')
    .pipe(map(data=>{
      return data.data
    }));
  }

  getAllProspectPostcard(){
    return this.http.get<any>('postcard-prospects')
    .pipe(map(data=>{
      return data.data
    }));
  }
  // upload Excel

  uploadExcelFile(data){
   
    return this.http.post<any>('upload-user-data',data)
  }

  // Download Excel

  getDefaultExcelTemplate() {
    // const headers = new HttpHeaders({ 'Content-Type': 'xml' }).set('Accept', 'text/xml');
    return this.http.get('default-excel-template',  { responseType: 'blob' } )
  }
  getAllInterestedPropertyExcel() {
    return this.http.get<any>('all-interested-property')
      .pipe(map(data => {
        return data.data
      }));
  }
  getAllHighlyInterestedPropertyExcel() {
    return this.http.get<any>('all-highly-interested-property')
      .pipe(map(data => {
        return data.data
      }));
  }

  getAllPurchaseLeads(groupname) {
    return this.http.get<any>('get-all-purchase-leads/' + groupname)
      .pipe(map(data => {
        return data.data
      }));
  }

  getAllPurchaseRecordsExcel() {
    return this.http.post<any>('all-group-properties' , {})
      .pipe(map(data => {
        return data
      }));
  }
  getAllPurchaseRecords() {
    return this.http.post<any>('all-group-properties', {} )
      .pipe(map(data => {
        return data.data
      }));
  }

  getProspectsByEmail(data) {
    return this.http.post<any>('get-prospects-email', { 'property_id': data })

  }

  getProspectsByText(data) {
    return this.http.post<any>('get-prospects-phone', { 'property_id': data })
  }

  sendEmail(data) {
    return this.http.post<any>('send-email', {...data,'record_type':'datatree'})
    // return this.http.post<any>('send-email', { 'property_id': data.property_id,'message':data.message,'subject':data.subject })
  }
  saveEmailTemplate(data) {
    return this.http.post<any>('save-email-template', data)
  }
  getEmailTemplateList() {
    return this.http.get<any>('list-email-templates')
      .pipe(map(data => {
        return data.data
      }));
  }
  savePostcardTemplate(data) {
    return this.http.post<any>('send-postcard', data)
  }
  savePostcardDesign(data) {
    return this.http.post<any>('save-postcard', data)
  }
  getPostemplateList() {
    return this.http.get<any>('get-postcards')
      .pipe(map(data => {
        return data.data
      }));
  }
  getEmailListData() {
    return this.http.get<any>('get-email-content')
      .pipe(map(data => {
        return data.data
      }));
  }
  sendTestEmail(data) {
    return this.http.post<any>('test-email', data)
    // return this.http.post<any>('send-email', { 'property_id': data.property_id,'message':data.message,'subject':data.subject })
  }

  getDefaultCard(){
    return this.http.get<any>('all-cards')
    .pipe(map(data => {
      return data.data.data[0]
    }));
  }

  walletRecharge(data) {
    return this.http.post<any>('wallet-recharge', data)
    .pipe(map(data => {
      return data.data
    }));
  }

  getMaintainanceBanner(){
    return this.http.get<any>('maintenance-banner')
    .pipe(map(data => {
      return data.data
    }));
  }
  setGridListwarm(data) {
    return this.http.post<any>('grid-save-warm-prospects', data);
  }
  setGridListHot(data) {
    return this.http.post<any>('grid-save-hot-prospects', data);
  }
  saveOppurtunity(data) {
    return this.http.post<any>('add-property-opportunity-status', data);
  }

  getBatchProcess() {
    return this.http.get<any>(`batch-progress`);
  }


  postBatchProcessEmail(data,arg2){
    return this.http.post<any>(`batch-process-email`, { 'property_id': data,'purchase_group_name':arg2 });
  }

  postBatchProcessPhone(data,arg2){
    return this.http.post<any>(`batch-process-phone`, { 'property_id': data,'purchase_group_name':arg2 });
  };

  showBatchProperties(data,arg2){
    return this.http.post<any>(`batch-properties`,{'batch_id':data,'type':arg2})
  }

  // check purchasegroupname duplicate 
  checkPurchaseGroupNameDuplicate(data) {
    return this.http.post<any>(`check-purchasegroupname-duplicate`, data)
  }

  getPostcardData(){
    return this.http.get<any>('postcard-steps-data')
  }

  savePostCardDesign(data){
    return this.http.post<any>('save-postcard-design', data)
  }

  postCardPreview(data){
    return this.http.post<any>('postcard-preview',data)
  }

  sendPostCard(data){
    return this.http.post<any>('send-postcard',data)
  }

  postCardProgress(){
    return this.http.get<any>('users-postcard-designs');
  }

  getPostCardDetail(id){
    return this.http.get<any>(`postcard-designs-detail/${id}`);
  }

  cancelMembershipRequest(data){
    return this.http.post<any>('cancel-membership-request',data);
  }

  getAllCards(){
    return this.http.get<any>('all-cards')
  }

  createCard(data){
    return this.http.post<any>('create-card',data)
  }

  deleteCreditCard(data){
    return this.http.post<any>('delete-card',{'card_id': data })
  }

  setDefaultCard(data){
    return this.http.post<any>('set-default-card',{'card_id': data })
  }

  emailMarketingData(data,arg , record_type){
    return this.http.post<any>('marketing-found-data',{'property_id': data,'type': arg, 'record_type':record_type })
  }
  getEmailContentDetail(arg){
    return this.http.get<any>(`email-content-detail/${arg}`)
  }

  getPendingProperties(arg,arg2){
    return this.http.post<any>('pending-properties',{'purchase_group_name':arg,'type':arg2})
  }

  getPendingAddress(data){
    return this.http.post<any>('properties-addresses',{'property_id':data})
  }

  
  updateMarketData(data,type,value){
    let req={}
    if(type==='email'){
      req={
        property_id: data,
        type,
        email:value
      }
    }
    else{
      req={
        property_id: data,
        type,
        phone:value.replace(/\D/g,"").substring(1)
      }
    }
    return this.http.post<any>('update-market-data',req)
  }


  setReminder(data){
    return this.http.post<any>('reminder',data)
  }

  getReminders(){
    return this.http.get<any>('reminders-list')
  }
  
  getPendingReminders(){
    return this.http.get<any>('past-active-reminders')
  }


  deleteReminder(arg){
    return this.http.post<any>('delete-reminder',{id:arg})
  }

  getReminderById(arg){
    return this.http.post<any>('remindersbypid',{property_id:arg})
  }

  dismissReminder(arg){
    return this.http.post<any>('dismiss-reminder',{id:arg.join()})
  }

}
