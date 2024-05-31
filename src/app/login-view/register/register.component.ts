import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  title = 'register';
  form: FormGroup;
  @Output() viewLogin = new EventEmitter();

  private apiUrl = 'https://demands-api.vercel.app';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { 
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  register() {
    if (this.form.valid) {
      const { name, email, password } = this.form.value;
      this.registerRequest(name, email, password).subscribe({
        next: (response) => {
          console.log('Usuário registrado com sucesso', response);
          this.viewLogin.emit();
        },
        error: (error) => {
          console.error('Erro ao registrar o usuário', error);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  registerRequest(name: string, email: string, password: string): Observable<any> {
    const payload = { name, email, password };
    return this.http.post(`${this.apiUrl}/register`, payload);
  }
}
