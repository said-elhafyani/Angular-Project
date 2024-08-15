import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../model/product.model";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{
    public productForm!: FormGroup;
    constructor(private fb : FormBuilder,private productService:ProductService) {}

  ngOnInit(): void {
      this.productForm = this.fb.group({
        name : this.fb.control(''),
        price : this.fb.control('0'),
        checked : this.fb.control(false),
      })
  }

  saveProduct() {
    let product :Product = this.productForm.value as Product;
    this.productService.saveProduct(product).subscribe({
      next:value => {
        alert(JSON.stringify(value))
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
