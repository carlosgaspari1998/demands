import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PeriodicElement } from './periodicElement';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheet } from '../shared/bottom-sheet.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../shared/dialogs/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-demands-view',
  templateUrl: './demands-view.component.html',
  styleUrl: './demands-view.component.scss'
})
export class DemandsViewComponent implements AfterViewInit {
  title = 'demands';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  ];

  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  constructor(
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) { 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheet);
  }

  addData() {
  }

  removeData() {
  }

  editItem(item: PeriodicElement) {
    
  }

  removeItem(element: PeriodicElement): void {
    const dialog = this.dialog.open(ConfirmationDialog, { maxWidth: '500px'});
    dialog
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          const index = this.dataSource.data.indexOf(element);
          if (index !== -1) {
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          }
        }
      });
  }
}
