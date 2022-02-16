import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Customer from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getCustomers(country:string|null=null, isValid:string|null=null) : Observable<Customer[]>{
    let params :any= {};
    if(isValid!=null)
      params['valid'] = isValid;
    if(country!=null && country.trim().length>0)
      params['country'] = country;
    return this.http.get<Customer[]>('http://localhost:8080/api/customers', {params:params});
  }
}
