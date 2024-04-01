import {Component} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { DemandsViewComponent } from '../demands-view/demands-view.component';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [MatButtonModule,
            MatDividerModule,
            MatInputModule,
            MatCardModule,
            ReactiveFormsModule,
            LoginComponent,
            RegisterComponent,
            DemandsViewComponent
          ],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss'
})
export class LoginViewComponent {
  title = 'demands';
  viewLogin = true;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }
}
