import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { RestaurantOwnerComponent } from './restaurant-owner/restaurant-owner.component';
import { CustomerRestaurantDishListComponent } from './customer-restaurant-dish-list/customer-restaurant-dish-list.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { UserAddressListComponent } from './user-address-list/user-address-list.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroceryComponent } from './grocery/grocery.component';
import { GcartPageComponent } from './gcart-page/gcart-page.component';

const routes: Routes = [
  {path:'',component:UserLoginComponent},
  {path:'search/:searchItem',component:HomeComponent},
  {path: 'home', component: HomeComponent },
  {path: 'login', component: UserLoginComponent },
  {path: 'restaurant-owner', component:RestaurantOwnerComponent},
  {path: 'customer-restaurant-dish-list', component:CustomerRestaurantDishListComponent},
  {path: 'cart-page',component:CartPageComponent},
  {path:'user-address-list',component:UserAddressListComponent},
  {path:'order-placed',component:OrderPlacedComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'grocery',component:GroceryComponent},
  {path:'gcart-page',component:GcartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
