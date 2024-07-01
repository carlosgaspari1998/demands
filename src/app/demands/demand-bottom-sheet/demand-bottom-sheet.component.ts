import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Customers } from '../../customers/customers';

@Component({
  selector: 'app-demand-bottom-sheet',
  templateUrl: './demand-bottom-sheet.component.html',
  styleUrls: ['./demand-bottom-sheet.component.scss']
})
export class DemandBottomSheetComponent implements OnInit {
  form: FormGroup;
  isNewDemand = false;
  customers: Customers[] = [];

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<DemandBottomSheetComponent>,
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.form = this.fb.group({
      customer: [null, Validators.required],
      description: ['', Validators.required],
      demandDate: [null, Validators.required],
      demandTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    if (this.data.id) {
      this.loadDemand(this.data.id);
    } else {
      this.isNewDemand = true;
      this.form.controls['demandDate'].setValue(new Date());
    }
  }

  loadCustomers(): void {
    this.http.get<Customers[]>(`${environment.apiUrl}/customers`).subscribe(
      data => {
        this.customers = data;
      },
      error => {
        console.error('Erro ao carregar clientes:', error);
      }
    );
  }

  loadDemand(id: string): void {
    this.http.get<any>(`${environment.apiUrl}/demands/${id}`).subscribe(
      demand => {
        const timePart = demand.demandDate.split('T')[1].slice(0, 5);
        this.form.patchValue({
          customer: demand.customer,
          description: demand.description,
          demandDate: demand.demandDate,
          demandTime: timePart
        });
      },
      error => {
        console.error('Erro ao carregar dados do pedido:', error);
      }
    );
  }
  
  saveDemand(): void {
    if (this.form.valid) {
      const demandData = this.form.value;
      demandData.demandDate = this.formatDate(demandData.demandDate, demandData.demandTime);

      if (this.isNewDemand) {
        this.http.post(`${environment.apiUrl}/demands`, demandData).subscribe(
          () => {
            this._bottomSheetRef.dismiss({ success: true, action: 'add' });
          },
          error => {
            console.error('Erro ao cadastrar o pedido:', error);
            this._bottomSheetRef.dismiss({ success: false, action: 'add' });
          }
        );
      } else {
        this.http.put(`${environment.apiUrl}/demands/${this.data.id}`, demandData).subscribe(
          () => {
            this._bottomSheetRef.dismiss({ success: true, action: 'edit' });
          },
          error => {
            console.error('Erro ao atualizar o pedido:', error);
            this._bottomSheetRef.dismiss({ success: false, action: 'edit' });
          }
        );
      }
    }
  }

  private formatDate(date: any, time: string): string {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + parseInt(time.split(':')[0])).slice(-2);
    const minutes = ('0' + parseInt(time.split(':')[1])).slice(-2);
    const seconds = '00';

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
