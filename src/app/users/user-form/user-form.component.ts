import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  form: FormGroup;
  @Output() viewUserLogin = new EventEmitter();

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
        next: () => {
          this.viewUserLogin.emit();
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
    return this.http.post(environment.apiUrl + '/users', payload);
  }
}
