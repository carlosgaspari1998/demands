import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {PeriodicElement} from './periodicElement';
import {MatIconModule} from '@angular/material/icon';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheet } from '../shared/bottom-sheet.component';

@Component({
  selector: 'app-demands-view',
  standalone: true,
  imports: [MatTableModule,
            MatTable,
            MatButtonModule,
            MatMenuModule,
            MatIconModule,
            MatTableModule,
            MatPaginatorModule
          ],
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
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  constructor(
    private _bottomSheet: MatBottomSheet
   // private formBuilder: FormBuilder
  ) { 
    /*this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });*/
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheet);
  }

  addData() {
    
    /*const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();*/
  }

  removeData() {
    /*this.dataSource.pop();
    this.table.renderRows();*/
  }
}
