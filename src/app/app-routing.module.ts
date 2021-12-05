import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MarketComponent } from './components/market/market.component';

const routes: Routes = [
{
  path:"",
  component:ProductComponent
},
{
  path:"market",component:MarketComponent
},
{
  path:"**",component:NotfoundComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
