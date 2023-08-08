import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  //to hold perticular id of the product
  productId:any
  //to hold particular details of the product
  product:any={}
    constructor(private viewActivatedRoute:ActivatedRoute,private api:ApiService){}
    ngOnInit(): void {
      this.viewActivatedRoute.params.subscribe((data:any)=>{
        console.log(data);//id:"6"
        console.log(data.id);//6
        this.productId =data.id;
        //view particular product details
        this.api.viewproduct(this.productId).subscribe((result:any)=>{
          console.log(result);//array of product
          this.product=result;
        })
        
      })
    }
    //addtowishlist
    addtowishlist(){
      const { id,title,price,image} =this.product //nammalkk athil ulla product value ann kodukandee so nmmalkk req.body kodukandaa this.product kodutha mathiii

      //api call
      this.api.addtowishlist(id,title,price,image).subscribe((result:any)=>{
        alert(result);
      },
      (result:any)=>{
        alert(result.error);
      
      })
      
    }
   //addtocart
   addtocart(product:any){
    //add quantity 1 to product object
    Object.assign(product,{quantity:1})
    console.log(product);
    this.api.addtocart(product).subscribe((result:any)=>{
      this.api.cartCount()
      alert(result)//add to cart
    },
    (result:any)=>{
      alert(result.error)
    
    })
    

   } 
}
