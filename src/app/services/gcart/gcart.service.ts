import { Injectable, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Grocery } from 'src/app/shared/models/grocery';
import { CoreService } from 'src/app/core/core.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodItemsService } from '../food-items.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GcartService {
  cartDataList:any=[];
  groceryList=new BehaviorSubject<any>([]);
    settingForm!:FormGroup;
    displayedColumns: string[] = [
      'ingredient_Id',
      'ingredient_Name',
      'price',
      'Action',
    ];
    GroceryObj:any={
      category_id:localStorage.getItem('GroceryCartData')
    };
    public dataSource!: MatTableDataSource<Grocery>;
    public value:number=0;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(
      private _dialog: MatDialog,
      private _foodItemService: FoodItemsService,
      private _coreService: CoreService,
      private fb:FormBuilder,
      private router:Router,
      private http:HttpClient
    ) {}
    ngOnInit(){
      {
      this.getGroceryList();
      }
  
      this.settingForm = this.fb.group({
        capacity: new FormControl(1, [
          Validators.required,
          Validators.min(1),
          Validators.max(5)
        ])
      })
    }

    getGroceryList(){
    debugger
    this._foodItemService.getGroceryList(this.GroceryObj).subscribe((res:any)=>{
      console.log('res',res);
      debugger
      this.groceryList=res;
        for(var items of res.results)
        this.dataSource=new MatTableDataSource<Grocery>(items);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      });
    }

    getGroceryData(){
      debugger
      return this.groceryList.asObservable();
    }

    setGroceryItemsList(GroceryItems:any){
      this.cartDataList.push(...GroceryItems);
      this.groceryList.next(GroceryItems);
    }

    addToCart(GroceryItems:any){
      this.cartDataList.push(GroceryItems);
      this.groceryList.next(this.cartDataList);
      this.getTotalAmount();
    }
    
    getTotalAmount(){
    debugger
    let grandTotal=0;
    return this.cartDataList.map((a:any)=>{
      debugger
      grandTotal+=a.price;
      debugger
      localStorage.setItem('grandTotal',grandTotal.toString());
    }
    );
   }

   removeCartData(product:any){
    this.cartDataList.map((a:any,index:any)=>{
      if(product.id === a.id)
      debugger
      this.cartDataList.splice(index,1)
    }
    )
    this.groceryList.next(this.cartDataList);
   }

   removeAllCart(){
    this.cartDataList=[];
    this.groceryList.next(this.cartDataList);
   }
   

  GetGCartItems(){
    return this.http.get('http://localhost:3000/results');
    }

  AddGCartItems(data:any):Observable<any>{
      return this.http.post('http://localhost:3000/results',data);
      }

  DeleteGCartItems(id:number):Observable<any>{
        return this.http.delete(`http://localhost:3000/results/${id}`);
        }
}
