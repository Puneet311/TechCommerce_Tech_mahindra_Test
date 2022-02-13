import { Component, OnInit } from '@angular/core';
import { ProductCartService } from '../product-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productArray:any=[]
  constructor(private product:ProductCartService) { }

  ngOnInit(): void {
    this.product.getAllProduct().subscribe((data:any)=>{
     this.productArray=data
    })
  }
  

}
