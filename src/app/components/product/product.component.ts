import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public form: FormGroup;
  public toDo : any [] = [];
  public endpoint:String = "http://localhost:2022/api/";
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      title:['',Validators.compose([
        Validators.maxLength(60),
        Validators.minLength(4),
        Validators.required
      ])]
    })

   }

  ngOnInit(): void {
   this.load();
  }

  add(){
    this.http.post(this.endpoint+'/todo/post',{
      title:this.form.controls['title'].value
    }).subscribe(data => {
      console.log(data)
    })
    
    this.load();
    this.form.reset();
  }

  remove(list:any){
    let _id = list._id;

    this.http.delete(this.endpoint+'todo/delete/'+_id,).subscribe(data => {
      console.log(data)
    })

    this.load();
    this.save();
  }

  mark(list:any){
    if(list.status==false){
      //markAsDone
      list.status = true;
    }else{
      //markAsUndone
      list.status = false;
    }
    
    this.http.put(this.endpoint+'todo/update/'+list._id,{
      status:list.status
    }).subscribe(data => {
      console.log(data)
    })
    this.save();
  }

  save(){
    let data = this.toDo;
    localStorage.setItem('todo',JSON.stringify(data));

  }

  load(){
    
    this.http.get(this.endpoint+'/todo/get').subscribe((data:any) => {
      this.toDo = data;
    })
   
    
  }
}
