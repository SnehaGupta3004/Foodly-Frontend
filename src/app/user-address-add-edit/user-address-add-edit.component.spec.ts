import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressAddEditComponent } from './user-address-add-edit.component';

describe('UserAddressAddEditComponent', () => {
  let component: UserAddressAddEditComponent;
  let fixture: ComponentFixture<UserAddressAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddressAddEditComponent]
    });
    fixture = TestBed.createComponent(UserAddressAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
