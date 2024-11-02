import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
ProductsService
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})

export class AllProductsComponent implements OnInit  {

  products:any[]=[];
  Categories:any[] = [];
  carts:any[] = [];
  loading!:boolean;

  constructor(private _ProductsService:ProductsService){}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    (localStorage.getItem('items') == null)? this.carts = [] : this.carts = JSON.parse(localStorage.getItem('items')!);
  }

  getAllProducts(){
    this.loading = true;
    this._ProductsService.getAllProducts().subscribe((response:any) =>{
      this.products = response ;
      this.loading = false;
      console.log(this.products);
    })
  }


  getAllCategories(){
    this.loading = true;
    this._ProductsService.getAllCategories().subscribe((response:any) =>{
      this.Categories = response ;
      this.loading = false;
      console.log(this.Categories);
    })
  }

  filterCategory(event:any){
    let value = event.target.value;
    if ( value == 'all') {
      this.getAllProducts()
    }
    else{
      this.getProductsCategory(value);
    }
  }

  getProductsCategory(keyword:string){
    this.loading = true;
    this._ProductsService.getProductsByCategory(keyword).subscribe((response:any)=>{
      this.products = response ;
      this.loading = false;
      console.log(this.Categories);
    })
  }

  addToCart(event:any){

    let flag = true;

    if (this.carts.length == 0) {
      this.carts.push(event);
      localStorage.setItem('items' , JSON.stringify(this.carts))
    }
    else{
      for (let i = 0; i < this.carts.length; i++) {
        if (event.item.id == this.carts[i].item.id) {
          flag = false;
          break;
        }
      }
      if ( flag ) {
        this.carts.push(event);
        localStorage.setItem("items" , JSON.stringify(this.carts));
      }
      else
      {
        window.alert('product is alredy selected');
      }
    }



  }


}
