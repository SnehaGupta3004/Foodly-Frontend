import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReceipesAddEditComponent } from './item-receipes-add-edit.component';

describe('ItemReceipesAddEditComponent', () => {
  let component: ItemReceipesAddEditComponent;
  let fixture: ComponentFixture<ItemReceipesAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemReceipesAddEditComponent]
    });
    fixture = TestBed.createComponent(ItemReceipesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
