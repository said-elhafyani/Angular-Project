import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

   constructor(private productService : ProductService,
               private router : Router,
               public appState : AppStateService) {
   }

  ngOnInit(): void {
   this.getProducts();
  }

  getProducts() {
    /* this.appState.setProductState({
       status :"LOADING"
     })
     */
    this.productService.getProducts(this.appState.productsState.keyword,this.appState.productsState.cuurentPage,this.appState.productsState.pageSize)
      .subscribe({
      next : (resp) => {
        let products= resp.body as Product[];
        let totalProducts:number =parseInt(resp.headers.get("X-Total-Count")!);
        let totalPages =Math.floor(totalProducts / this.appState.productsState.pageSize);

        if(totalProducts % this.appState.productsState.pageSize !=0){
          ++totalPages;
        }
        this.appState.setProductState({
          products: products,
          totalPages: totalPages,
          totalProducts : totalProducts,
          //status : "LOADED"
        })
          },
      error : err => {
        this.appState.setProductState({
          status :"ERROR",
          errorMessage : err
        })
      }
    });

    //this.products = this.productService.getProducts();
  }


  handelCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: () => {
        product.checked = !product.checked;
      }
    })
  }

  handleDelete(product: Product) {
     if (confirm("Are you sure you want to delete this product?")) {
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        this.getProducts();
       //this.appState.productsState.products = this.appState.productsState.products.filter((p:any)=>p.id !== product.id);
      }
    });
   }
  }



  handleGotoPage(page: number) {
    this.appState.productsState.cuurentPage = page;
    this.getProducts();
  }

  handleEdit(product: Product) {
    console.log(product.id)
      this.router.navigateByUrl(`/admin/editProduct/${product.id}`);
  }
}
