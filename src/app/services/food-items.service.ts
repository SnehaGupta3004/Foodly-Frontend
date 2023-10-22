import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FoodItems } from '../shared/models/resFoodItems';

@Injectable({
  providedIn: 'root'
})
export class FoodItemsService {

  constructor(private _http:HttpClient) { }

  addFoodItems(data:any):Observable<any>{
    debugger
    return this._http.post('https://localhost:44325/Restaurant/AddUpdateDishes',data);
  }

  updateFoodItems(data:any):Observable<any>{
    return this._http.post('https://localhost:44325/Restaurant/AddUpdateDishes',data);
  }
  
  getFoodItemsList(obj:any):Observable<any>{
    return this._http.post('https://localhost:44325/Restaurant/GetDishList',obj);
  }

  deleteFoodItem(data:any):Observable<any>{
    return this._http.post('https://localhost:44325/Restaurant/DeleteDish',data);
  }

  getGroceryList(obj:any):Observable<any>{
    return this._http.post('https://localhost:44325/Restaurant/GetGroceryList',obj)
  }
}
