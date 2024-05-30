import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Products } from './products';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../shared/bottom-sheet.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../shared/dialogs/confirmation-dialog/confirmation-dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-demands-view',
  templateUrl: './demands-view.component.html',
  styleUrl: './demands-view.component.scss'
})
export class DemandsViewComponent implements OnInit {
  title = 'demands';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Products>;

  displayedColumns: string[] = ['name', 'description', 'creation_date', 'actions'];
  constructor(
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<Products[]>('https://demands-api.vercel.app/products').subscribe(data => {
      this.dataSource.data = data;
    });
  }

  addProduct() {
    this.openBottomSheet();
  }

  editItem(item: Products) {
    this.openBottomSheet(item.id)
  }

  openBottomSheet(productId?: string): void {
    const bottomSheetRef = this._bottomSheet.open(BottomSheetComponent, {
      data: {
        id: productId || ''
      }
    });
  
    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result && result.success)
        this.loadProducts();
    });
  }

  removeItem(element: Products): void {
    const dialog = this.dialog.open(ConfirmationDialog, { maxWidth: '500px'});
    dialog
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.removeData(element.id);
        }
      });
  }

  removeData(productId: string) {
    this.http.delete(`https://demands-api.vercel.app/products/${productId}`).subscribe(
      () => {
        this.loadProducts();
      },
      (error) => {
        console.error('Erro ao remover o produto:', error);
      }
    );
  }
}
