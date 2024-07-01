import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CustomerBottomSheetComponent } from '../customer-bottom-sheet/customer-bottom-sheet.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../shared/dialogs/confirmation-dialog/confirmation-dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Customers } from '../customers';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Customers>();
  displayedColumns: string[] = ['name', 'address', 'creationDate', 'actions'];

  constructor(
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadCustomers(): void {
    this.http.get<Customers[]>(environment.apiUrl + '/customers').subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        console.error('Erro ao carregar clientes:', error);
      }
    );
  }

  addCustomer(): void {
    this.openBottomSheet();
  }

  editItem(item: Customers): void {
    this.openBottomSheet(item.id);
  }

  openBottomSheet(customerId?: string): void {
    const bottomSheetRef = this._bottomSheet.open(CustomerBottomSheetComponent, {
      data: { id: customerId || '' }
    });

    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result && result.success) {
        this.loadCustomers();
      }
    });
  }

  removeItem(element: Customers): void {
    const dialog = this.dialog.open(ConfirmationDialog, {
      maxWidth: '500px',
      data: {
        title: 'Remover cliente',
        subtitle: 'Remover este cliente será uma ação irreversível. Você tem certeza de que deseja prosseguir?',
        cancel: 'CANCELAR',
        action: 'REMOVER'
      }
    });

    dialog.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.removeData(element.id);
      }
    });
  }

  removeData(customerId: string): void {
    this.http.delete(environment.apiUrl + `/customers/${customerId}`).subscribe(
      () => {
        this.loadCustomers();
      },
      error => {
        console.error('Erro ao remover cliente:', error);
      }
    );
  }
}
