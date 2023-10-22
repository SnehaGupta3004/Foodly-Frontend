import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _http:HttpClient) { }

  placeOrder(data:any):Observable<any>{
    debugger
    return this._http.post('https://localhost:44325/Restaurant/PlaceOrder',data);
  }
}
