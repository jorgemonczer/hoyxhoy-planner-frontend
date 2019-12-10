import { Component, OnInit, ViewChild } from '@angular/core';
import { Holiday } from './holiday';
import { NgForm } from '@angular/forms';
import { GridApi, GridOptions } from 'ag-grid';
import { HolidaysService } from './holidays.service';
import { MatEditButtonGridRenderComponent } from '../grid-custom-components/mat-edit-button-grid-render/mat-edit-button-grid-render.component';
import { MatRemoveButtonGridRenderComponent } from '../grid-custom-components/mat-remove-button-grid-render/mat-remove-button-grid-render.component';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AgFormatterService } from '../shared/ag-formatter.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  public holiday = new Holiday();
  public context;

  @ViewChild('myForm',{static: false}) myForm : NgForm;
  
  private gridApi: GridApi;
  private gridColumnApi;
  private columnDefs: any;
  private rowData: Holiday[];
  private gridOptions: GridOptions;
  private errorMessage : string = "";
  private isEditMode: boolean = false;

  constructor(private holidayService: HolidaysService, private frm: AgFormatterService) {

    this.context = { componentParent: this };

    this.gridOptions = <GridOptions>{};
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.rowSelection = 'simple';
    this.gridOptions.suppressRowClickSelection = false;
    this.gridOptions.enableColResize = true;

    this.columnDefs = [
      { headerName: 'Date', field: 'date', filter: 'text', valueFormatter: this.frm.ag_dateFormatter , width: 170 },
      { headerName: 'Description', field: 'description', filter: 'text', width: 250 },
      { headerName: '', cellRendererFramework: MatEditButtonGridRenderComponent, width: 40 },
      { headerName: '', suppressFilter: true, cellRendererFramework: MatRemoveButtonGridRenderComponent, width: 40 }
    ];
  }

  ngOnInit(): void {
    this.populateHolidays();
  }

  refeshHolidays(): void {
    this.populateHolidays();
    this.initialMode();
    this.resetControls();
  }

  private populateHolidays() {
    this.holidayService.getHolidays().subscribe(
      userList => this.rowData = userList, 
      error => this.handleError(error)
    );
  }

  dateFormatter(params: any) {
    return new Date(params.value).toLocaleDateString("es-ES",{timeZone: 'UTC', year:"numeric",month:"2-digit", day:"2-digit"});
  }

  get users(): Observable<Holiday[]> {
    return this.holidayService.getHolidays();
  }
  
  getHolidayByDate(date: Date): Observable<Holiday> {
    return this.holidayService.getHolidayByDate(date);
  }

  removeHoliday(date: Date) {
    this.holidayService.deleteHolidayByDate(date).subscribe(
      data => this.refeshHolidays(),
      error => console.log(error)
    );
  }

  editHoliday(data: Holiday) {
    this.holiday = new Holiday(data);
    this.errorMessage = "";
  }
  
  addHoliday(): void {
    this.holidayService.addHoliday(this.holiday).subscribe(
      data => this.refeshHolidays(),
      error => this.handleError(error)
    );
  }

  handleError(res: HttpErrorResponse) {
      this.errorMessage = res.error.error_message; 
      console.log(res);
  }

  updateHoliday(){
    this.holidayService.updateHoliday(this.holiday).subscribe(
      data => this.refeshHolidays(),
      error => this.handleError(error)
    );
  }

  resetControls() {
    this.myForm.resetForm();
    Object.keys(this.myForm.controls).forEach(field => {      
      const control = this.myForm.control.get(field);         
      control.markAsUntouched();
    });
  }

  // Call from MatRemoveButtonGridRenderComponent
  removeFromComponent(holiday: Holiday){
    this.removeHoliday(holiday.date);
    this.initialMode();
  }

  // Call from MatEditButtonGridRenderComponent
  editFromComponent(data: Holiday){
    this.isEditMode = true;
    this.editHoliday(data);
  }

  cancelEditMode() {
    this.initialMode();
  }  

  private initialMode() {
    this.holiday = new Holiday();
    this.errorMessage = "";
    this.isEditMode = false;
    this.resetControls();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.autoSizeColumns();
  }

}
