// import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';

import { StoreRootModule } from '@ngrx/store';

import { StoreModule } from '@ngrx/store';

import { ProductsListComponent } from './products-list.component';



describe('ProductListComponent', () => {

  let component: ProductsListComponent;

  let fixture: ComponentFixture<ProductsListComponent>;



  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [ ProductsListComponent ],

      imports: [

        RouterTestingModule,HttpClientTestingModule,FormsModule,ReactiveFormsModule,

        StoreModule.forRoot({})

      ],

      schemas:[CUSTOM_ELEMENTS_SCHEMA]

    })

    .compileComponents();



    fixture = TestBed.createComponent(ProductsListComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });



  it('should create', () => {

    expect(component).toBeTruthy();

  });

});

