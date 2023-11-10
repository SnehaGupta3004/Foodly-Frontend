import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { FoodItems } from '../shared/models/resFoodItems';
import { Grocery } from '../shared/models/grocery';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { OrderPlacedComponent } from '../order-placed/order-placed.component';
import { GcartService } from '../services/gcart/gcart.service';
import { HttpClient } from '@angular/common/http';
import { GroceryService } from '../services/grocery/grocery.service';
import { OrdersService } from '../services/orders/orders.service';

@Component({
  selector: 'app-gcart-page',
  templateUrl: './gcart-page.component.html',
  styleUrls: ['./gcart-page.component.css']
})
export class GcartPageComponent implements OnInit{
  addressDetails:any;
  show!:boolean;
  products:any=[];
  allProducts:any=0;
  TaxCharges:any=this.allProducts*0.5;
  GrandTotal!:any;
  foodList=new BehaviorSubject<any>([]);
  settingForm!:FormGroup;
  jsonDataResult:any=[];
  displayedColumns: string[] = [
    'ingredient_Id',
    'ingredient_Name',
    'price',
    'Action',
  ];
  b:any;
  FoodObj:any={
    User_ID:localStorage.getItem('resultsmobile_No'),
    Role_ID:Number(localStorage.getItem('resultsRole_ID'))
  };
  public dataSource!: MatTableDataSource<Grocery>;
  public value:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private cartService:GcartService,
    private dialogRef:MatDialog,
    private http:HttpClient,
    private gcartservice:GcartService,
    private groceryService:GroceryService,
    private _orderService:OrdersService
  ) {}


  ngOnInit(){
    this.GetAllGCartItems();
    this.gcartservice.GetGCartItems().subscribe(response=>{
      this.jsonDataResult=response;
      debugger
      console.log(this.jsonDataResult)
      this.b={
        "OrderItems": this.jsonDataResult,
        CUSTOMER_ID:localStorage.getItem('resultsmobile_No'),
        RESTAURANT_ID:localStorage.getItem('OnClickRestaurantMobileNo'),
        ITEM_TOTAL:Number(localStorage.getItem('ITEM_TOTAL')),
        TAXES:Number(localStorage.getItem('TAXES')),
        DELIVERY:49.00,
        TOTALCART_VALUE:Number(localStorage.getItem('TOTALCART_VALUE')),
        ADDRESS_ID:Number(localStorage.getItem('ADDRESS_ID')),
        ORDERTYPE:"GROCERY"
      }
    });
      this.allProducts=localStorage.getItem('grandTotal');
      this.TaxCharges=Number(this.allProducts*0.05+20).toFixed(2);
      this.GrandTotal=(Number(this.allProducts)+Number(this.TaxCharges)+49).toFixed(2);
      this.addressDetails=localStorage.getItem('AddressDetails');
    this.settingForm = this.fb.group({
      capacity: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ])
    })


    
    localStorage.setItem('ITEM_TOTAL',this.allProducts);
    localStorage.setItem('TAXES',this.TaxCharges);
    localStorage.setItem('TOTALCART_VALUE',this.GrandTotal);



    
  }

    
  GetAllGCartItems(){
    this.gcartservice.GetGCartItems().subscribe(response=>{
      this.jsonDataResult=response;
      debugger
      console.log(this.jsonDataResult)
    });
  }



  removeProduct(id:any){
    debugger
    this.groceryService.removeCartData(id);
  }

  removeAllProduct(){
    this.cartService.removeAllCart();
  }


      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

      increment() {
        this.settingForm.setValue({
          capacity: this.settingForm.get("capacity")?.value + 1
        });
      }
      
      decrement() {
        this.settingForm.setValue({
          capacity: this.settingForm.get("capacity")?.value - 1
        });
      }

      CartPage(){
        this.router.navigateByUrl('/cart-page');
      }

      placeOrder(){
      debugger
      this.router.navigateByUrl('/order-placed');
    }

    openDialog(){
      debugger
      this._orderService.placeOrder(this.b).subscribe((res:any)=>{
        });
      debugger
    this.dialogRef.open(OrderPlacedComponent,{
      backdropClass: "bdrop"
    });
    }

    cartPageName(){
      debugger
      localStorage.setItem('currentCartPage',"GroceryCart");
    }
}

