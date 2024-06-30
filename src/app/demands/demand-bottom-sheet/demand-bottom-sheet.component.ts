import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Customers } from '../../customers/customers';

@Component({
  selector: 'app-demand-bottom-sheet',
  templateUrl: './demand-bottom-sheet.component.html',
  styleUrl: './demand-bottom-sheet.component.scss',
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
      demandTime: [null]
    });
  }

  customers: Customers[] = [];

  ngOnInit(): void {
    this.loadCustomers();
    if (this.data.id != '')
      this.loadDemand(this.data.id);
    else
      this.isNewDemand = true;
  }

  loadDemand(id: string): void {
    this.http.get<any>(environment.apiUrl + `/demands/${id}`).subscribe(
      (demand) => {
        this.form.patchValue({
          customer: demand.customer,
          description: demand.description,
          demandTime: demand.demandTime
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
      debugger;

      if (this.isNewDemand) {
        this.http.post(environment.apiUrl + '/demands', demandData).subscribe(
          () => {
            this._bottomSheetRef.dismiss({ success: true, action: 'add' });
          },
          (error) => {
            console.error('Erro ao cadastrar o pedido:', error);
            this._bottomSheetRef.dismiss({ success: false, action: 'add' });
          }
        );
      } else {
        this.http.put(environment.apiUrl + `/demands/${this.data.id}`, demandData).subscribe(
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
  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
