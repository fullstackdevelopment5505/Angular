import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class GlobalService {

  constructor(private http: HttpClient) {  }
  
  getSessionCookie() {
    return this.http.get(`session-cookie`);
  }

  getTermsAndConditions() {
    return this.http.get(`terms-updated-popup`);
  }
  
  getPrivacy() {
    return this.http.get(`privacy-policy-updated-popup`);
  }

  updateTermsAndConditions(status) {
    return this.http.post(`accept-terms`, { status });
  }  

  updatePrivacy(status) {
    return this.http.post(`accept-privacy-policy`, { status });
  }

}
