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
  public toDo : Product [] = [];
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
    this.toDo.push(new Product(this.toDo.length+1,this.form.controls['title'].value,false));
    this.save();
    

    this.form.reset();
  }

  remove(list:Product){
    let index = this.toDo.indexOf(list);

    if(index!==-1){
      this.toDo.splice(index,1);
    }

    this.save();
  }

  mark(list:Product){
    if(list.status==false){
      //markAsDone
      list.status = true;
    }else{
      //markAsUndone
      list.status = false;
    }
    this.save();
  }

  save(){
    let data = this.toDo;
    localStorage.setItem('todo',JSON.stringify(data));

  }

  load(){
    const response = localStorage['todo'];
   this.toDo = JSON.parse(response);
    
  }
}
