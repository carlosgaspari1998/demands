import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './login-view/login-view.component';
import { DemandsViewComponent } from './demands-view/demands-view.component';


export const routes: Routes = [
  { path: 'login', component: LoginViewComponent, pathMatch: 'full' },
  {
    //canActivate: [AuthGuardService],
    path: '', component: DemandsViewComponent,  children:   [
      { path: 'home', component: DemandsViewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
