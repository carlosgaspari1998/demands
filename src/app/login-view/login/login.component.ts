import { HttpClient } from '@angular/common/http';
import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importe o MatSnackBar

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title = 'login';
  form: FormGroup;

  private apiUrl = 'https://demands-api.vercel.app';

  @Output() viewRegister = new EventEmitter();

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
    this.viewRegister.emit();
  }

  login() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.http.post(`${this.apiUrl}/login`, { email, password }).subscribe({
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
