import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Customers } from '../customers';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CustomerBottomSheetComponent } from '../customer-bottom-sheet/customer-bottom-sheet.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../shared/dialogs/confirmation-dialog/confirmation-dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss'
})
export class CustomersListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Customers>;

  displayedColumns: string[] = ['name', 'address', 'creationDate', 'actions'];
  constructor(
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit() {
    debugger;
    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    debugger;
    this.dataSource.paginator = this.paginator;
  }

  loadCustomers() {
    this.http.get<Customers[]>(environment.apiUrl + '/customers').subscribe(data => {
      this.dataSource.data = data;
    });
  }

  addCustomer() {
    this.openBottomSheet();
  }

  editItem(item: Customers) {
    this.openBottomSheet(item.id)
  }

  openBottomSheet(customerId?: string): void {
    const bottomSheetRef = this._bottomSheet.open(CustomerBottomSheetComponent, {
      data: {
        id: customerId || ''
      }
    });
  
    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result && result.success)
        this.loadCustomers();
    });
  }

  removeItem(element: Customers): void {
    const dialog = this.dialog.open(ConfirmationDialog, 
      { maxWidth: '500px',
        data: {
          title: 'Remover cliente',
          subtitle: 'Remover este cliente será uma ação irreversível. Você tem certeza de que deseja prosseguir?',
          cancel: 'CANCELAR',
          action: 'REMOVER'
        }
      }
    );
    dialog
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.removeData(element.id);
        }
      });
  }

  removeData(customerId: string) {
    this.http.delete(environment.apiUrl + `/customers/${customerId}`).subscribe(
      () => {
        this.loadCustomers();
      },
      (error) => {
        console.error('Erro ao remover cliente:', error);
      }
    );
  }
}
