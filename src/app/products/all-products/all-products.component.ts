import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  searchTearm:string=''
  //to hold all array of products
  allProducts:any=[]
    constructor(private api:ApiService){}
    ngOnInit():void{
      this.api.getAllProducts().subscribe((result:any)=>{
        console.log(result);//array of products
        this.allProducts=result;
      })
      // this.searchTearm=this.api.searchTerm
      this.api.searchTerm.subscribe((result:any)=>{
        this.searchTearm=result
        console.log(this.searchTearm);
      })
     
      
    }
  
}