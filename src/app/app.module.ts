import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { ConfirmationDialog } from './shared/dialogs/confirmation-dialog/confirmation-dialog';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserComponent } from './users/user.component';
import { AppRoutingModule } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomerBottomSheetComponent } from './customers/customer-bottom-sheet/customer-bottom-sheet.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserFormComponent } from './users/user-form/user-form.component';
import { CustomersListComponent } from './customers/customer-list/customers-list.component';
import { HeaderComponent } from './hearder/header.component';
import { DemandsListComponent } from './demands/demands-list/demands-list.component';
import { DemandBottomSheetComponent } from './demands/demand-bottom-sheet/demand-bottom-sheet.component';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EventsListComponent } from './events/logs-list/events-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    ConfirmationDialog,
    UserLoginComponent,
    UserComponent,
    UserFormComponent,
    CustomerBottomSheetComponent,
    DemandsListComponent,
    EventsListComponent,
    DemandBottomSheetComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
