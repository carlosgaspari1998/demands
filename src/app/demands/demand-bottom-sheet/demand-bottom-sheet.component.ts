import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Customers } from '../../customers/customers';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-demand-bottom-sheet',
  templateUrl: './demand-bottom-sheet.component.html',
  styleUrl: './demand-bottom-sheet.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class DemandBottomSheetComponent implements OnInit {
  form: FormGroup;
  isNewDemand = false;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<DemandBottomSheetComponent>,
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.form = this.fb.group({
      customer: [null, Validators.required],
      description: [null],
      demandDate: [null],
      demandTime: [null]
    });
  }

  customers: Customers[] = [];

  ngOnInit(): void {
    this.loadCustomers();
    if (this.data.id != '')
      this.loadDemand(this.data.id);
    else {
      this.isNewDemand = true;
      this.form.get('demandDate')?.setValue(new Date())
    }
  }

  loadDemand(id: string): void {
    this.http.get<any>(environment.apiUrl + `/demands/${id}`).subscribe(
      (demand) => {
        this.form.patchValue({
          customer: demand.customer,
          description: demand.description,
          demandDate: demand.demandDate,
        });
      },
      (error) => {
        console.error('Erro ao carregar dados do pedido:', error);
      }
    );
  }
    
  loadCustomers() {
    this.http.get<Customers[]>(environment.apiUrl + '/customers').subscribe(data => {
      this.customers = data;
    });
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
          (error) => {
            console.error('Erro ao cadastrar o pedido:', error);
            this._bottomSheetRef.dismiss({ success: false, action: 'add' });
          }
        );
      } else {
        this.http.put(`${environment.apiUrl}/demands/${this.data.id}`, demandData).subscribe(
          () => {
            this._bottomSheetRef.dismiss({ success: true, action: 'edit' });
          },
          (error) => {
            console.error('Erro ao atualizar o pedido:', error);
            this._bottomSheetRef.dismiss({ success: false, action: 'edit' });
          }
        );
      }
    }
  }

  private formatDate(date: Date, time: string): string {
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
