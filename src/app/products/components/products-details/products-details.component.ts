import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})

export class ProductsDetailsComponent implements OnInit {

  id:any;
  data:any = {};
  loading:boolean = false;
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductsService:ProductsService ){}

  getProductById(){
    this.loading = true;
    this._ProductsService.getProductById(this.id).subscribe((res) => {
      this.loading = false;

      this.data = res;
    })

  }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.paramMap.get("id")
    console.log(this.id);
    this.getProductById();
  }


}
