import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription, tap } from "rxjs";
import { GenericValidator } from "../shared/GenericValidator";
import { ProductService } from "../shared/product.service";
import { getCurrentProduct } from "../state/products/product.selector";
import { IProduct, Category } from "./product";
import * as ProductActions from '../state/products/product.actions';
import { State } from "../state/products/product.state";

@Component({
  selector: 'product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit ,OnDestroy {
  pageTitle='Edit Product';
  errorMessage='';
  product$!: Observable<IProduct | null | undefined  >;

  addProduct!: FormGroup;
  product!:IProduct | null | undefined;
  sub!:Subscription;
  displayMessage: {[key:string]:string}={};
    private validationMessages!:{[key:string]:{[key:string]:string}};

    private genericValidator!:GenericValidator;

    constructor(private store:Store<State>,private formBuilder: FormBuilder,private router: Router, private productService:ProductService ) {

      this.validationMessages={

      name:{
        required:'Product name is required ',
        minLength:'Product name must have 3 characters',
        maxLength:'Product name must have less than  equal to 10 chars'
      },
      category:{
        required:'Category is required'
      },
      price:{
        required:'Price is required'
      },image:{
        required:'Image is required'
      }
      //  },rating:{
      //   required:'Rating is required'
      // },


      };
      this.genericValidator=new GenericValidator(this.validationMessages);

   }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  ngOnInit() {
   console.log('in init of product add ,creating form');
    this.addProduct = this.formBuilder.group({
      id: [],
      name: ['',[ Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      category:[Category.fruits,[Validators.required]],
      price:['',[Validators.required]],
      image:['',[Validators.required]],
      rating:[3,[Validators.required]]

    });

    console.log('created add form ')

// Watch for changes to the currently selected product
    this.product$ = this.store.select(getCurrentProduct)
      .pipe(
        tap(currentProduct => this.displayProduct(currentProduct))
      );
this.sub=this.product$.subscribe(resp=>this.product=resp);
console.log('selected current product in ng onit add product ',this.product);
    // Watch for value changes for validation
    this.addProduct.valueChanges.subscribe(
      () => this.displayMessage =
      this.genericValidator.processMessages(this.addProduct)
    );
console.log('value in form changes')



    //when the product is selected from the product list , it should be displayed on the form

    //this.sub=this.productService.selectedProductChanges$.subscribe(selProd=>this.displayProduct(selProd));


    this.addProduct.valueChanges.
    subscribe(()=>this.displayMessage=this.genericValidator.processMessages(this.addProduct));
  }
  get id(){
    return this.addProduct.get("id");
  }

  get name(){
    return this.addProduct.get("name");
    }

  get image(){
    return this.addProduct.get("image");
    }
  get price(){
    return this.addProduct.get("price");
      }
  get category(){
      return this.addProduct.get("category");
        }
  get rating(){
      return this.addProduct.get("rating");
        }

  /* onSubmit() {
    this.productService.createProduct(this.addProduct.value)
      .subscribe( data => {console.log(data);
        this.router.navigate(['products']);
      });
  }
 */
//method which renders the selected product on the form
  displayProduct(productParam:IProduct |null |undefined):void{
   console.log(this.product,'in display product of product add component ');
   this.product = productParam;
   if(this.product){
//reset the form to its original
    this.addProduct.reset();

    if(this.product.id==0){
      this.pageTitle='Add Product';
    }
    else{

      this.pageTitle=`Edit Product: ${this.product.name}`;

    }
 //update the data on the form
 this.addProduct.patchValue({
  id:this.product.id,
   name:this.product.name,
   image:this.product.image,
    rating:this.product.rating,
   price:this.product.price,
   category:this.product.category


 })


   }

  }

  saveProduct(originalProduct:IProduct):void{

    if(this.addProduct.valid){
      if(this.addProduct.dirty){
       
        //copy over all of the orginal product properties
        //we arecopying data from teh addform
        //{...} it ensures that values are not lost ids are retained
        const product={...originalProduct,...this.addProduct.value};
        console.log('dirt',product)
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
          }
        };
        
        fetch('https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=apple', options)
          .then(response => response.json())
          .then(response => console.log('modi',response))
          .catch(err => console.error(err));
      if(product.id==0){

        this.store.dispatch(ProductActions.createProduct({product}));
        // this.productService.createProduct(product).subscribe(
        //   (resp)=>{
        //     this.productService.changeSelectedProduct(resp);
        //     console.log(resp);},

        //   (err)=>this.errorMessage=err
        // );

     }
     else{this.store.dispatch(ProductActions.updateProduct({ product }));


      // this.productService.updateProduct(product).subscribe(
      //  resp=>this.productService.changeSelectedProduct(resp),
      //  err=>this.errorMessage=err      );

     }
      }

      this.router.navigate(['products'])
    }

  }
//validating on blur ,if user tabs out through the form fields
  blur():void{
  this.displayMessage=this.genericValidator.processMessages(this.addProduct);

  }

  deleteProduct(prod:IProduct):void{
    if(prod && prod.id){

      if(confirm(`Are you sure you want to delete ${prod.name} details`)){


        this.store.dispatch(ProductActions.deleteProduct({ productId: prod.id }));

        // this.productService.deleteProduct(prod.id).subscribe(
        //   resp=>this.productService.changeSelectedProduct(null),
        //   err=>this.errorMessage=err
        // );
      }
      else{
// No need to delete, it was never saved
this.store.dispatch(ProductActions.clearCurrentProduct());

     // this.productService.changeSelectedProduct(null)
      }
    }

  }
}