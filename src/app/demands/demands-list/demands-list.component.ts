import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../shared/dialogs/confirmation-dialog/confirmation-dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DemandBottomSheetComponent } from '../demand-bottom-sheet/demand-bottom-sheet.component';
import { Demands } from '../demands';

@Component({
  selector: 'app-demands-list',
  templateUrl: './demands-list.component.html',
  styleUrls: ['./demands-list.component.scss']
})
export class DemandsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Demands>();
  displayedColumns: string[] = ['customer', 'address', 'description', 'creationDate', 'demandDate', 'actions'];
  showOnlyNotFinalized: boolean = false;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadDemands();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadDemands(): void {
    const apiUrl = `${environment.apiUrl}/demands?showOnlyNotFinalized=${this.showOnlyNotFinalized}`;

    this.http.get<Demands[]>(apiUrl).subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        console.error('Erro ao carregar pedidos:', error);
      }
    );
  }

  addDemand(): void {
    this.openBottomSheet();
  }

  editItem(item: Demands): void {
    this.openBottomSheet(item.id);
  }

  openBottomSheet(demandId?: string): void {
    const bottomSheetRef = this._bottomSheet.open(DemandBottomSheetComponent, {
      data: {
        id: demandId || ''
      }
    });

    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result && result.success) {
        this.loadDemands();
      }
    });
  }

  removeItem(element: Demands): void {
    const dialog = this.dialog.open(ConfirmationDialog, {
      maxWidth: '500px',
      data: {
        title: 'Remover pedido',
        subtitle: 'Remover este pedido será uma ação irreversível. Você tem certeza de que deseja prosseguir?',
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

  finishedItem(element: Demands): void {
    const dialog = this.dialog.open(ConfirmationDialog, {
      maxWidth: '500px',
      data: {
        title: 'Finalizar pedido',
        subtitle: 'Você tem certeza de que deseja finalizar este pedido?',
        cancel: 'CANCELAR',
        action: 'FINALIZAR'
      }
    });

    dialog.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.finishedData(element.id);
      }
    });
  }

  removeData(demandId: string): void {
    this.http.delete(`${environment.apiUrl}/demands/${demandId}`).subscribe(
      () => {
        this.loadDemands();
      },
      error => {
        console.error('Erro ao remover pedido:', error);
      }
    );
  }

  finishedData(demandId: string): void {
    this.http.patch(`${environment.apiUrl}/demands/${demandId}`, null).subscribe(
      () => {
        this.loadDemands();
      },
      error => {
        console.error('Erro ao finalizar pedido:', error);
      }
    );
  }
}
