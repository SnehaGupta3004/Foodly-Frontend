import { Injectable, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FoodItems } from 'src/app/shared/models/resFoodItems';
import { FoodItemsService } from '../food-items.service';
import { CoreService } from 'src/app/core/core.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartDataList:any=[];
    productList=new BehaviorSubject<any>([]);
    settingForm!:FormGroup;
    displayedColumns: string[] = [
      'dish_ID',
      'dish_Name',
      'dish_Price',
      'Action',
    ];
    FoodObj:any={
      User_ID:localStorage.getItem('resultsmobile_No'),
      Role_ID:Number(localStorage.getItem('resultsRole_ID'))
    };
    public dataSource!: MatTableDataSource<FoodItems>;
    public value:number=0;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(
      private _dialog: MatDialog,
      private _foodItemService: FoodItemsService,
      private _coreService: CoreService,
      private fb:FormBuilder,
      private router:Router
    ) {}
    ngOnInit(){
      {
      this.getFoodItemsList();
      }
  
      this.settingForm = this.fb.group({
        capacity: new FormControl(1, [
          Validators.required,
          Validators.min(1),
          Validators.max(5)
        ])
      })
    }

    getFoodItemsList(){
    this._foodItemService.getFoodItemsList(this.FoodObj).subscribe((res:any)=>{
      console.log('res',res);
      this.productList=res;
        for(var items of res.results)
        this.dataSource=new MatTableDataSource<FoodItems>(items);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      });
    }

    getFoodData(){
      debugger
      return this.productList.asObservable();
    }

    setFoodItemsList(FoodItems:any){
      this.cartDataList.push(...FoodItems);
      this.productList.next(FoodItems);
    }

    addToCart(FoodItems:any){
      this.cartDataList.push(FoodItems);
      this.productList.next(this.cartDataList);
      this.getTotalAmount();
    }
    
    getTotalAmount(){
    let grandTotal=0;
    return this.cartDataList.map((a:any)=>{
      debugger
      grandTotal+=a.dish_Price;
      debugger
      localStorage.setItem('grandTotal',grandTotal.toString());
    }
    );
   }

   removeCartData(product:any){
    this.cartDataList.map((a:any,index:any)=>{
      if(product.dish_ID === a.dish_ID)
      debugger
      this.cartDataList.splice(index,1)
    }
    )
    this.productList.next(this.cartDataList);
   }

   removeAllCart(){
    this.cartDataList=[];
    this.productList.next(this.cartDataList);
   }
   
}
