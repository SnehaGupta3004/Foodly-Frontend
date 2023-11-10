import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserDetailsService } from '../services/userDetails/user-details.service';
import { Address } from '../shared/models/userAddress';
import { UserAddressAddEditComponent } from '../user-address-add-edit/user-address-add-edit.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-user-address-list',
  templateUrl: './user-address-list.component.html',
  styleUrls: ['./user-address-list.component.css']
})
export class UserAddressListComponent {
selection=new SelectionModel<Address>(false,[]);

  show!:boolean
  displayedColumns: string[] = [
    'select',
    'srno',
    'mobileno',
    'recipienT_NAME',
    'flaT_HOUSENO',
    'areA_STREET',
    'landmark',
    'pincode',
    'city',
    'state',
    'Action'
  ];
  UserObj:any={
    User_ID:localStorage.getItem('resultsmobile_No')
  };

  cartObj:any={
    currentCartPage:localStorage.getItem('currentCartPage')
  };

  public dataSource!: MatTableDataSource<Address>;
  public value:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private fb:FormBuilder,
    private router:Router,
    private _user:UserDetailsService
  ) {}
  ngOnInit(){
    {
      this.getAddressList();
    }
  }


  openAddEditAddressForm() {
    debugger
    const dialogRef = this._dialog.open(UserAddressAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAddressList();
        }
        }
      });
    }

  getAddressList(){
    debugger
    this._user.getUserAddressList(this.UserObj).subscribe((res:any)=>{
      console.log('res',res);
        this.dataSource=new MatTableDataSource<Address>(res.results[0].addresses);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      });
    }

    openEditForm(data: any) {
      debugger
      const dialogRef = this._dialog.open(UserAddressAddEditComponent, {
        data,
      });
  
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getAddressList();
          }
        },
      });
    }


      deleteAddress(data: any) {
        debugger
        this._user.deleteAddress(data).subscribe({
          next: (val:any) => {
            this._coreService.openSnackBar('Address deleted!','Done');
            this.getAddressList();
          },
          error: console.log,
        });
      }


      onAddressToggled(data:any){
      this.selection.toggle(data);
      debugger
      localStorage.setItem('AddressDetails',JSON.stringify(data.recipienT_NAME+"  "+Number(data.mobileno)+"  "+data.areA_STREET+"  "+data.landmark+"  "+data.flaT_HOUSENO+"  "+data.pincode+"  "+data.city+"  "+data.state));
      localStorage.setItem('LandMarkDetails',JSON.stringify(data.landmark));
      localStorage.setItem('ADDRESS_ID',JSON.stringify(data.srno));
      console.log(this.selection.selected)
      }
      
      selectAddress(){
      debugger
      localStorage.getItem('AddressDetails');
      debugger
      if(this.cartObj =="GroceryCart")
      {
        this.router.navigateByUrl('/gcart-page');
      }
      else
      {
        this.router.navigateByUrl('/cart-page');
      }
      }

    defaultAddress(data:any){

    }
}
