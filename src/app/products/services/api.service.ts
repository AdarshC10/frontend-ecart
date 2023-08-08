import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // to hid cart count
  cartitemcount=new BehaviorSubject(0)
  //to hold search values
  searchTerm =new BehaviorSubject('')
 

  constructor(private http:HttpClient) {
    this.cartCount()
   }
  BASE_URL = 'http://localhost:5000'
  //get  all product from mongodb
  getAllProducts(){
    return this.http.get(`${this.BASE_URL}/products/allProducts`)
  }

  //view particular products from mongodb
  viewproduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/viewProduct/${id}`)
  }

  //add to wish list
  addtowishlist(id:any,title:any,price:any,image:any){


    const body={
      id,title,price,image
    }

    return this.http.post(`${this.BASE_URL}/products/addtowishlist`,body)
  }

  //get all product from wishlist //api calling
  getwishlist(){
    return this.http.get(`${this.BASE_URL}/products/getwishlist`)
  }
  //delete wishlist product from wishlist collection
  deletewishlist(id:any){
    return this.http.delete(`${this.BASE_URL}/products/deletewishlist/${id}`)
  }

  //add tocart
  addtocart(product:any){
     const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity


     }
     return this.http.post(`${this.BASE_URL}/products/addtocart`,body)
  }
  //get cart products
  getcart(){
    return this.http.get(`${this.BASE_URL}/products/getcart`)
  }

  //cart count

  cartCount(){
    this.getcart().subscribe((result:any)=>{
      this.cartitemcount.next(result.length);//3
    })
  }
  //delete cart products
  deleteCart(id:any){
    return this.http.delete(`${this.BASE_URL}/products/deletecart/${id}`)

  }

  incrementCartCount(id:any){
    return this.http.get(`${this.BASE_URL}/products/increment/${id}`)
  }

  decrementCartCount(id:any){
    return this.http.get(`${this.BASE_URL}/products/decrement/${id}`)
  }
}






