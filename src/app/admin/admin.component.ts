import { Component, ViewChild } from '@angular/core';
import { CustomerPageService } from '../services/customerPage/customer-page.service';
import { Restaurant } from '../shared/models/restaurantsList';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from '../services/admin/admin.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  show!:boolean;
  availableRestaurants:Restaurant[]=[];
  resObj:any={
    Mobile_No:Number(localStorage.getItem('OnClickRestaurantMobileNo'))
  };
  enableObj:any={
    Mobile_No:localStorage.getItem('ResMobileNO'),
    IsActive:1
  };
  disableObj:any={
    Mobile_No:localStorage.getItem('ResMobileNO'),
    IsActive:0
  };

  displayedColumns: string[] = [
    'restaurant_Image',
    'username',
    'isActive',
    'Action'
  ];
  public dataSource!: MatTableDataSource<Restaurant>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
constructor(private customer:CustomerPageService,private admin:AdminService,private _coreService:CoreService){}

ngOnInit():void{
  {
    this.getRestaurantsList();
  }
  this.enableObj={
    Mobile_No:localStorage.getItem('ResMobileNO'),
    IsActive:1
  };

  this.disableObj={
    Mobile_No:localStorage.getItem('ResMobileNO'),
    IsActive:0
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
      debugger
      this.dataSource=new MatTableDataSource<Restaurant>(this.availableRestaurants);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator=this.paginator;
      });
    }

    Enable(data:any){
      debugger
      localStorage.setItem('ResMobileNO',data.mobile_No)
      this.admin.EnableDisableRestaurant(this.enableObj).subscribe((res:any)=>{
        this._coreService.openSnackBar('Restaurant successfully enabled!','Done');
        this.getRestaurantsList();
      });
    }

    Disable(data:any){
      localStorage.setItem('ResMobileNO',data.mobile_No)
      this.admin.EnableDisableRestaurant(this.disableObj).subscribe((res:any)=>{
        this._coreService.openSnackBar('Restaurant successfully disabled!','Done');
        this.getRestaurantsList();
        });
    }
}
