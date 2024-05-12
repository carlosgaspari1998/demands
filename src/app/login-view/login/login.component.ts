import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title = 'login';
  form: FormGroup;
  @Output() viewRegister = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
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
    } else {
      this.form.markAllAsTouched();
    }
  }
}
