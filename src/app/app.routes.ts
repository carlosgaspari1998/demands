import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './users/user.component';
import { CustomersListComponent } from './customers/customer-list/customers-list.component';
import { DemandsListComponent } from './demands/demands-list/demands-list.component';
import { EventsListComponent } from './events/logs-list/events-list.component';


export const routes: Routes = [
  { path: '', component: UserComponent,  pathMatch: 'full' },
  { path: 'customers', component: CustomersListComponent, pathMatch: 'full' },
  { path: 'demands', component: DemandsListComponent, pathMatch: 'full' },
  { path: 'events', component: EventsListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
