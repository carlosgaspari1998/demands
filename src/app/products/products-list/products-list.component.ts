import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Products } from '../products';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductBottomSheetComponent } from '../product-bottom-sheet/product-bottom-sheet.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../shared/dialogs/confirmation-dialog/confirmation-dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit, AfterViewInit {
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
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadProducts() {
    this.http.get<Products[]>(environment.apiUrl + '/products').subscribe(data => {
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
    const bottomSheetRef = this._bottomSheet.open(ProductBottomSheetComponent, {
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
    this.http.delete(environment.apiUrl + `/products/${productId}`).subscribe(
      () => {
        this.loadProducts();
      },
      (error) => {
        console.error('Erro ao remover o produto:', error);
      }
    );
  }
}
