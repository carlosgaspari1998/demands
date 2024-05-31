import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './users/user.component';
import { ProductsListComponent } from './products/products-list/products-list.component';


export const routes: Routes = [
  { path: '', component: UserComponent,  pathMatch: 'full' },
  { path: 'view', component: ProductsListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
