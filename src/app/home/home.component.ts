import { Component ,OnInit, ViewChild} from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Foods } from '../shared/models/food';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerPageService} from '../services/customerPage/customer-page.service';
import { Restaurant } from '../shared/models/restaurantsList';
import { MatTableDataSource } from '@angular/material/table';
import { FoodItems } from '../shared/models/resFoodItems';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  suggestedDishes:FoodItems[]=[];
  availableRestaurants:Restaurant[]=[];
  availableRes:Restaurant[]=[];
  resObj:any={
    Role_ID:Number(localStorage.getItem('resultsRole_ID'))
  };
  dishObj:any={
    User_id:localStorage.getItem('resultsmobile_No')
  }

  restaurants!:Restaurant[];
  displayedColumns: string[] = [
    'username',
    'ratings',
    'restaurant_Image'
  ];

  public dataSource!: MatTableDataSource<Restaurant>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private fs:FoodService, private router:Router,private customer:CustomerPageService){}

  ngOnInit():void{
    {
      this.getSuggestedDishes();
      this.getRestaurantsList();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getRestaurantsList(){
    debugger
    this.customer.getRestaurantsList(this.resObj).subscribe((res:any)=>{
      console.log('res',res);
      this.availableRestaurants=[];  
      this.availableRestaurants=res.results[0];
      });
    }


    getDishList(data:any){
      localStorage.setItem('OnClickRestaurantMobileNo',data.mobile_No);
      localStorage.setItem('OnClickRestaurantRoleID',data.role_ID);
      this.router.navigateByUrl('/customer-restaurant-dish-list');
    }

    getSuggestedDishes(){
      debugger
      this.customer.getSuggestedDishes(this.dishObj).subscribe((res:any)=>{
        console.log('res',res);
        this.suggestedDishes=[];  
        this.suggestedDishes=res.results[0];
        debugger
        });
      }
}
