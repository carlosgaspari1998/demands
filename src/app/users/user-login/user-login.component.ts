import { HttpClient } from '@angular/common/http';
import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  form: FormGroup;
  @Output() viewUserForm = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { 
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  newRegister() {
    this.viewUserForm.emit();
  }

  login() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.http.post(environment.apiUrl + '/users/login', { email, password }).subscribe({
        next: (response: any) => {
          console.log('Login bem sucedido', response);
          this.router.navigate(['/view']);
          localStorage.setItem('tokenDemands', response.token);
          this.showSnackbar('Login bem sucedido');
        },
        error: (error) => {
          console.error('Erro ao fazer login', error);
          this.showSnackbar('Erro ao fazer login');
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000
    });
  }
}
