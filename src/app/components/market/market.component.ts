import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiMarketService } from 'src/app/service/api-market.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  public form: FormGroup;
  public products:any[] = [];

  constructor(
    private api:ApiMarketService,
    private fb:FormBuilder
  ) { 

    this.form = this.fb.group({
      name:['',Validators.required],
      imageURL:['',Validators.required],
      price:['',Validators.required],
      description:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.load();
  }

  add_new_product(){
    const { name, imageURL, price, description } = this.form.value;
    
   this.api.create({name,imageURL,price,description}).subscribe((data:any) => {
      console.log(data)
      this.load();
   })
  }

  load(){
    this.api.read().subscribe((data:any) => {
      this.products = data;
    })
  }

  delete_product(_id:any){
    this.api.delete(_id).subscribe(data => {
      console.log(data);
      this.load();
    })
  }

  update_product(data:any){
     const name = prompt("name?");
     const imageURL = prompt("imageURL?");
     const price = prompt("price?");
     const description = prompt("description?");

     const obj = {
       name:name,
       imageURL:imageURL,
       price:price,
       description:description
     }

     this.api.update(data._id,obj).subscribe(data => {
       console.log(data);
       this.load();
     })
  }
}
