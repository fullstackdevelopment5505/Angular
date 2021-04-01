import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CustomerService {

  constructor(private http: HttpClient) {  }
  
  getBatchPaymentDetails(property_id, type) {
    return this.http.post(`batch-payment-details`, { property_id, type });
  }

  batchPayment(amount) {
    return this.http.post(`batch-payment`, { amount });
  }

}
