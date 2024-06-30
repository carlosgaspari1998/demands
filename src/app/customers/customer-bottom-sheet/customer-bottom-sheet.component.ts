import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-customer-bottom-sheet',
  templateUrl: './customer-bottom-sheet.component.html',
  styleUrl: './customer-bottom-sheet.component.scss',
})
export class CustomerBottomSheetComponent implements OnInit {
  form: FormGroup;
  isNewCustomer = false;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CustomerBottomSheetComponent>,
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data.id != '')
      this.loadCustomer(this.data.id);
    else
      this.isNewCustomer = true;
  }

  loadCustomer(id: string): void {
    this.http.get<any>(environment.apiUrl + `/customers/${id}`).subscribe(
      (customer) => {
        this.form.patchValue({
          name: customer.name,
          address: customer.address
        });
      },
      (error) => {
        console.error('Erro ao carregar dados do cliente:', error);
      }
    );
  }

  saveCustomer(): void {
    if (this.form.valid) {
      const customerData = this.form.value;

      if (this.isNewCustomer) {
        this.http.post(environment.apiUrl + '/customers', customerData).subscribe(
          () => {
            this._bottomSheetRef.dismiss({ success: true, action: 'add' });
          },
          (error) => {
            console.error('Erro ao cadastrar cliente:', error);
            this._bottomSheetRef.dismiss({ success: false, action: 'add' });
          }
        );
      } else {
        this.http.put(environment.apiUrl + `/customers/${this.data.id}`, customerData).subscribe(
          () => {
            this._bottomSheetRef.dismiss({ success: true, action: 'edit' });
          },
          (error) => {
            console.error('Erro ao atualizar cliente:', error);
            this._bottomSheetRef.dismiss({ success: false, action: 'edit' });
          }
        );
      }
    }
  }
  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
