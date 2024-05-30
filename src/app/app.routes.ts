import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './login-view/login-view.component';
import { DemandsViewComponent } from './demands-view/demands-view.component';


export const routes: Routes = [
  { path: '', component: DemandsViewComponent, pathMatch: 'full' },
  { path: 'view', component: LoginViewComponent,  pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
