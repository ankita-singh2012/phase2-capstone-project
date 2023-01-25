import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { ProductAddComponent } from './product-add.component';
import { Category } from './product';






describe('ProductAddComponent', () => {

  let component: ProductAddComponent;

  let fixture: ComponentFixture<ProductAddComponent>;



  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [HttpClientTestingModule,

        ReactiveFormsModule,

        FormsModule,

       // StoreModule.provideStore({})

    ],

      declarations: [ ProductAddComponent ],

      providers: [provideMockStore({})],

    })

    .compileComponents();



    fixture = TestBed.createComponent(ProductAddComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });



  it('should create', () => {

    expect(component).toBeTruthy();

  });



   /* --- test case for Product Name --- */



 

  it('should check Product Name', () => {

    const e1 =fixture.debugElement.query(By.css('#name'));

    expect(e1).toBeTruthy();

  });

  it('should have ProductName type of text', () => {

    const e1 =fixture.debugElement.query(By.css('#name'));

    expect(e1.nativeElement.getAttribute('type')).toEqual('text');

  });

  it('should have name as Product Name', () => {

    const e1 =fixture.debugElement.query(By.css('#name'));

    expect(e1.nativeElement.getAttribute('name')).toEqual('name');

  });

  it('should check Product Name input value is correct', () => {

    let name=component.addProduct.controls['name'];

    name.setValue('Apple');

    expect(name.errors).toBeNull();    

  });



  /* ---  test case for Product price --- */




  it('should check Product Price', () => {

    const e1 =fixture.debugElement.query(By.css('#price'));

    expect(e1).toBeTruthy();

  });

  it('should have Product Price type of number', () => {

    const e1 =fixture.debugElement.query(By.css('#price'));

    expect(e1.nativeElement.getAttribute('type')).toEqual('number');

  });

  it('should have name as Price', () => {

    const e1 =fixture.debugElement.query(By.css('#price'));

    expect(e1.nativeElement.getAttribute('name')).toEqual('price');

  });

  it('should check Price input value is correct', () => {

    let price=component.addProduct.controls['#price'];

    price.setValue('100');

    expect(price.errors).toBeNull();    

  });



   /* --- test case for Image --- */



  it('should check Image', () => {

    const e1 =fixture.debugElement.query(By.css('#image'));

    expect(e1).toBeTruthy();

  });

  it('should have Image type of text', () => {

    const e1 =fixture.debugElement.query(By.css('#image'));

    expect(e1.nativeElement.getAttribute('type')).toEqual('text');

  });

  it('should have name as image', () => {

    const e1 =fixture.debugElement.query(By.css('#image'));

    expect(e1.nativeElement.getAttribute('name')).toEqual('image');

  });

  it('should check image input value is correct', () => {

    let image=component.addProduct.controls['image'];

    image.setValue('../../assets/veg1.jpeg');

    expect(image.errors).toBeNull();    

  });



/*  test --- case for Select dropdown --- */



  it('should check select',()=>{

    const e1 =fixture.debugElement.query(By.css('#sel')).nativeElement;

    let select=component.addProduct.controls['category'];

    select.setValue('vegetable');

    expect(select.errors).toBeNull();

    e1.value=e1.options[1].value;

    fixture.detectChanges();

    let val=e1.options[e1.selectedIndex].label;

    expect(val).toEqual('Products');

  })



/* --- test case for Button Disable --- */



  it('should check addProduct button disabled', () => {

    fixture.detectChanges();

    let btn=fixture.debugElement.query(By.css('#btn')).nativeElement ;

    expect(btn.disabled).toBe(true );

   })

   it('should check addProduct button enable', () => {

    let btn=fixture.debugElement.query(By.css('#btn')).nativeElement ;
 
    component.addProduct.controls['id'].setValue(102);
    component.addProduct.controls['name'].setValue('tomato');

    component.addProduct.controls['price'].setValue('200');

    component.addProduct.controls['image'].setValue('../../assets/veg2.jpeg');

    component.addProduct.controls['category'].setValue(Category.fruits);
    component.addProduct.controls['rating'].setValue('2');
    
    component.addProduct.controls['qty'].setValue(20);


    fixture.detectChanges();

    expect(btn.disabled).toBe(true );

   });
  });