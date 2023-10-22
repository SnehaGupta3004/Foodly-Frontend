import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FoodItems } from '../shared/models/resFoodItems';
import { CoreService } from '../core/core.service';
import { MatDialog } from '@angular/material/dialog';
import { FoodItemsService } from '../services/food-items.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart/cart.service';
import { Address } from '../shared/models/userAddress';
import { OrdersService } from '../services/orders/orders.service';
import { OrderPlacedComponent } from '../order-placed/order-placed.component';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
    addressDetails:any;
    show!:boolean;
    products:any=[];
    allProducts:any=0;
    TaxCharges:any=this.allProducts*0.5;
    GrandTotal!:any;
    foodList=new BehaviorSubject<any>([]);
    settingForm!:FormGroup;
    displayedColumns: string[] = [
      'dish_ID',
      'dish_Path',
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
      private fb:FormBuilder,
      private router:Router,
      private cartService:CartService,
      private dialogRef:MatDialog
    ) {}
    ngOnInit(){
      this.cartService.getFoodData().subscribe(res=>{
        this.products=res;
        debugger
        this.dataSource=new MatTableDataSource<FoodItems>(this.products);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
        this.allProducts=localStorage.getItem('grandTotal');
        this.TaxCharges=Number(this.allProducts*0.05+20).toFixed(2);
        this.GrandTotal=(Number(this.allProducts)+Number(this.TaxCharges)+49).toFixed(2);
        this.addressDetails=localStorage.getItem('AddressDetails');
        debugger
        debugger
      })

      this.settingForm = this.fb.group({
        capacity: new FormControl(1, [
          Validators.required,
          Validators.min(1),
          Validators.max(5)
        ])
      })
    }

    removeProduct(item:any){
      debugger
      this.cartService.removeCartData(item);
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
      this.dialogRef.open(OrderPlacedComponent,{
        backdropClass: "bdrop"
      });
      }

      cartPageName(){
        localStorage.setItem('currentCartPage',"DishCart");
      }
  }
  
