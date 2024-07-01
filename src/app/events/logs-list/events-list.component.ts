import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Events } from './events';
import { ActionEnum } from '../../enums/actionEnum';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  dataSource = new MatTableDataSource<Events>();
  displayedColumns: string[] = ['customerName', 'demandDescription', 'actionName', 'userName', 'date'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    const apiUrl = `${environment.apiUrl}/events`;

    this.http.get<Events[]>(apiUrl).subscribe(data => {
      this.dataSource.data = data;
      this.mapActionNames(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  private mapActionNames(data: Events[]): void {
    data.forEach(element => {
      switch (element.action) {
        case ActionEnum.create:
          element.actionName = 'NOVO PEDIDO';
          break;
        case ActionEnum.update:
          element.actionName = 'PEDIDO ATUALIZADO';
          break;
        case ActionEnum.remove:
          element.actionName = 'PEDIDO REMOVIDO';
          break;
        case ActionEnum.finished:
          element.actionName = 'PEDIDO FINALIZADO';
          break;
      }
    });
  }
}
