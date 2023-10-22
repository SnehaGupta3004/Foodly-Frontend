import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserDetailsService } from '../services/userDetails/user-details.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { Address } from '../shared/models/userAddress';

@Component({
  selector: 'app-user-address-add-edit',
  templateUrl: './user-address-add-edit.component.html',
  styleUrls: ['./user-address-add-edit.component.css']
})
export class UserAddressAddEditComponent implements OnInit{
  addressForm:FormGroup;

  constructor(
    private _fb:FormBuilder,
    private _address:UserDetailsService,
    private _dialogRef:MatDialogRef<Address>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService:CoreService,
    private _dialog: MatDialog,
    )
  {
  this.addressForm=this._fb.group({
    mobileno:localStorage.getItem('resultsmobile_No'),
    recipienT_NAME:'',
    flaT_HOUSENO:'',
    areA_STREET:'',
    landmark:'',
    pincode:'',
    city:'',
    state:'',
  });
  }

  ngOnInit(): void {
    this.addressForm.patchValue(this.data);
  }

  onFormSubmit(){
    debugger
    if (this.addressForm.valid) {
    if(this.data){
    this._address.updateUserAddress(this.addressForm.value).subscribe({
    next: (val: any) => {
      this._coreService.openSnackBar('Address updated successfully','Done');
      this._dialogRef.close(true);
    },
    error: (err: any) => {
      console.error(err);
    },
  });
}
else{
  debugger
  this._address.addUserAddress(this.addressForm.value).subscribe({
    next: (val: any) => {
      this._coreService.openSnackBar('Address added successfully','Done');
      this._dialogRef.close(true);
    },
    error: (err: any) => {
      console.error(err);
    },
  });
}
       
      }
    }

  
}
