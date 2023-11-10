import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RestaurantOwnerComponent } from './restaurant-owner/restaurant-owner.component';
import { FoodItemsAddEditComponent } from './food-items-add-edit/food-items-add-edit.component';
import { ItemReceipesAddEditComponent } from './item-receipes-add-edit/item-receipes-add-edit.component';
import { CustomerRestaurantDishListComponent } from './customer-restaurant-dish-list/customer-restaurant-dish-list.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { UserAddressListComponent } from './user-address-list/user-address-list.component';
import { UserAddressAddEditComponent } from './user-address-add-edit/user-address-add-edit.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroceryComponent } from './grocery/grocery.component';
import { FilterPipe } from 'ngx-filter-pipe';
import { GcartPageComponent } from './gcart-page/gcart-page.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    UserLoginComponent,
    RestaurantOwnerComponent,
    FoodItemsAddEditComponent,
    ItemReceipesAddEditComponent,
    CustomerRestaurantDishListComponent,
    CartPageComponent,
    UserAddressListComponent,
    UserAddressAddEditComponent,
    OrderPlacedComponent,
    DashboardComponent,
    GroceryComponent,
    GcartPageComponent,
    ViewRecipeComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSnackBarModule,
    NgxMatFileInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
