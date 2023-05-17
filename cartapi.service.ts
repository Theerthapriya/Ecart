import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartapiService {
  cartDataList:any =[];
  productList= new BehaviorSubject<any>([]);

  constructor(private http:HttpClient) { }
  //get products data
  getProductData(){
    return this.productList.asObservable();
  }
  //set products data
  setProduct(product:any){
    this.cartDataList.push(...product);
    this.productList.next(product)
  }
  //add to cart details
  addToCart(product:any){
    this.cartDataList.push(product);
    this.productList.next(this.cartDataList);
    this.getTotalAmount();
    console.log(this.cartDataList)
  }
  //get total amount
  getTotalAmount(){
    let grandTotal=0;
    this.cartDataList.map((a:any)=>{
      grandTotal += a.total;
    })
  }
  //remove cart data one by one
  removeCartData(product:any){
    this.cartDataList.map((a:any,index:any)=>{
      if(product.id === a.id){
        this.cartDataList.splice(index,1)
      }
    })
    this.productList.next(this.cartDataList)
  }
  //remove all cart data
  removeAllCart(){
    this.cartDataList=[]
    this.productList.next(this.cartDataList)
  }
}
