import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  title = 'register';
  form: FormGroup;
  @Output() viewLogin = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  returnLogin() {
    if (this.form.valid)
      this.viewLogin.emit();
    else
      this.form.markAllAsTouched();
  }
}
