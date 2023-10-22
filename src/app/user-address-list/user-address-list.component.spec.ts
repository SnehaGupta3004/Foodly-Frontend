import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressListComponent } from './user-address-list.component';

describe('UserAddressListComponent', () => {
  let component: UserAddressListComponent;
  let fixture: ComponentFixture<UserAddressListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddressListComponent]
    });
    fixture = TestBed.createComponent(UserAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
