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
import { LoginComponent } from './login-view/login/login.component';
import { RegisterComponent } from './login-view/register/register.component';
import { DemandsViewComponent } from './demands-view/demands-view.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { BottomSheetComponent } from './shared/bottom-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    DemandsViewComponent,
    ConfirmationDialog,
    LoginComponent,
    LoginViewComponent,
    RegisterComponent,
    BottomSheetComponent
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
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
