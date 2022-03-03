import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaxService {

  // private API_URL = "http://localhost:8001";

  
  constructor(private http: HttpClient) { }

  // private extractData(res: any) {
  //   let body = res.data;
  //   return body || {};
  // }

  // private extractData1(res: any) {
  //   let body = res;
  //   return body || {};
  // }

  // addTax(datas: any): Observable<any> {
  //   return this.http.post<any>(this.API_URL+'/tax', datas,{ headers: {  } }).pipe(
  //     map(this.extractData1));
  // }

  // getTax() {
  //   return this.http.get(this.API_URL+'/tax' ,{ headers: {  } }).pipe(
  //     map(this.extractData1));
  // }
}
