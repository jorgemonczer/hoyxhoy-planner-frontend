import { Component, OnInit, ViewChild } from '@angular/core';
import { Advance } from './advance';
import { GridApi, GridOptions } from 'ag-grid';
import { OutlookService } from './outlook.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AgFormatterService } from '../shared/ag-formatter.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { NoWeekendValidator } from '../shared/date.weekend.directive';

export interface PeriodicElement {
  name: string;
  value: number;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'PROYECCION AL ', value: null, date: '10/10/2020'},
  {name: 'Hs Restantes', value: 140.00, date: null},
  {name: 'Hs Recursos Disponibles x Día', value: 9.00 ,date: null},
  {name: 'Días Hábiles Restantes', value: 15.00 ,date: null},
  {name: 'Días Hábiles Restantes', value: 15.00 ,date: null},
  {name: 'Fecha Finalización Estimada', value: null, date: '20/10/2020'},
];

@Component({
  selector: 'app-outlook',
  templateUrl: './outlook.component.html',
  styleUrls: ['./outlook.component.scss']
})
export class OutlookComponent implements OnInit {
  public advance : Advance;
  public context;
  
  private gridApi: GridApi;
  private gridColumnApi;
  private columnDefs ;
  private columnDefs2 ;
  private rowData : Advance[];
  private rowData2 : PeriodicElement[];
  private gridOptions: GridOptions;
  private errorMessage : string = "";
  private isEditMode: boolean = false;

  constructor(private outlookService: OutlookService, private frm: AgFormatterService) { 
    this.context = { componentParent: this };

    this.gridOptions = <GridOptions>{};
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.suppressRowClickSelection = false;
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableCellChangeFlash = true;
    this.gridOptions.rowSelection = 'single';

    this.columnDefs = [
      { headerName: 'Name', field: 'name', filter: 'text', width: 300 },
      { headerName: 'Spent', field: 'spent', type: "numericColumn", filter: 'number', valueFormatter: this.frm.ag_numberTwoDecimalFormatter, width: 150 },
      { headerName: 'Advance', field: 'advance', type: "numericColumn", filter: 'number', valueFormatter: this.frm.ag_percentageTwoDecimalFormatter, width: 150 }
    ];    

    this.columnDefs2 = [
      { headerName: 'Name', field: 'name', filter: 'text', width: 300 },
      { headerName: 'Value', field: 'value', type: "numericColumn", filter: 'number', valueFormatter: this.frm.ag_numberTwoDecimalFormatter, width: 150 },
      { headerName: 'Date', field: 'date',  filter: 'text', width: 150 }
    ];    

  }

  ngOnInit() {
    this.populateAdvance();
    this.rowData2 = ELEMENT_DATA;
  }

  private populateAdvance() {
    this.outlookService.getAdvance().subscribe(
      list => {
        this.rowData = list?list.map(s=>new Advance(s)):list;
      }, 
      error => this.handleError(error)
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.autoSizeColumns();
  }

  handleError(res: HttpErrorResponse) {
    this.errorMessage = res.error.error_message; 
    console.log(res);
  }

}
