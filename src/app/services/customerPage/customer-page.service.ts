import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerPageService {

  constructor(private _http:HttpClient) { }

  getRestaurantsList(obj:any):Observable<any>{
    return this._http.post('https://localhost:44325/Restaurant/GetRestaurantList',obj);
  }

  getSuggestedDishes(obj:any):Observable<any>{
    return this._http.post('https://localhost:44325/Restaurant/GetSuggestedDishes',obj);
  }

}
