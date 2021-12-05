import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiMarketService {
  public endpoint = "https://sp-api-test-v1.herokuapp.com/api/";
  constructor(
    private http:HttpClient
  ) { }

  create(products:any){
    return this.http.post(this.endpoint+'products',products);
  }

  read(){
    return this.http.get(this.endpoint+'products');
  }

  delete(_id:any){
    return this.http.delete(this.endpoint+'products/'+_id);
  }

  update(_id:any,products:any){
    return this.http.put(this.endpoint+'products/'+_id,products);
  }
 
}
