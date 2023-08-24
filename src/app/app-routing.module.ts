import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ListOrderComponent } from './list-order/list-order.component';

const routes: Routes = [
  {path: 'home', component: PanelControlComponent},
  {path: 'crearOrder', component: CreateOrderComponent},
  {path: 'editOrder/:code', component: EditOrderComponent},
  {path: 'listOrder', component:ListOrderComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
