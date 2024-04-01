import {Component, EventEmitter, Output} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule,
            MatDividerModule,
            MatInputModule,
            MatCardModule,
            ReactiveFormsModule
          ],
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
