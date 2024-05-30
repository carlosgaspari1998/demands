import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
})
export class BottomSheetComponent implements OnInit {
  form: FormGroup;
  isNewProduct = false;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data.id != '')
      this.loadProduct(this.data.id);
    else
      this.isNewProduct = true;
  }

  loadProduct(id: string): void {
    this.http.get<any>(`https://demands-api.vercel.app/products/${id}`).subscribe(
      (product) => {
        this.form.patchValue({
          name: product.name,
          description: product.description
        });
      },
      (error) => {
        console.error('Erro ao carregar dados do produto:', error);
      }
    );
  }

  saveProduct(): void {
    if (this.form.valid) {
      const productData = this.form.value;

      if (this.isNewProduct) {
        this.http.post('https://demands-api.vercel.app/products', productData).subscribe(
          () => {
            this._bottomSheetRef.dismiss({ success: true, action: 'add' });
          },
          (error) => {
            console.error('Erro ao cadastrar o produto:', error);
            this._bottomSheetRef.dismiss({ success: false, action: 'add' });
          }
        );
      } else {
        this.http.put(`https://demands-api.vercel.app/products/${this.data.id}`, productData).subscribe(
          () => {
            this._bottomSheetRef.dismiss({ success: true, action: 'edit' });
          },
          (error) => {
            console.error('Erro ao atualizar o produto:', error);
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
