import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  //to hold allwishlist items
 allwishlist:any=[]

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getwishlist().subscribe((result:any)=>{
      console.log(result);
      this.allwishlist=result
    },
    (result:any)=>{

    console.log(result.error);
    
      
    })
  }
  //delete wishlist product

  deletewishlist(id:any){
    this.api.deletewishlist(id).subscribe((result:any)=>{
      console.log(result);//remaining wishlist product
      this.allwishlist=result
      
    })
  }
  //addto cart
  addtocart(product:any){
    //add quantity to cart
    Object.assign(product,{quantity:1})
    console.log(product);
    
    //api call to add to quatity
    this.api.addtocart(product).subscribe((result:any)=>{
      //call cart count
      this.api.cartCount()
    this.deletewishlist(product.id)
    alert(result);
    },
    (result:any)=>{

    alert(result.error);
    })
    
   
  }
}
