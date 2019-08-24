import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GridApi, GridOptions } from 'ag-grid';
import { MatEditButtonGridRenderComponent } from '../grid-custom-components/mat-edit-button-grid-render/mat-edit-button-grid-render.component';
import { MatRemoveButtonGridRenderComponent } from '../grid-custom-components/mat-remove-button-grid-render/mat-remove-button-grid-render.component';
import { SpringsService } from "./springs.service";
import { Spring } from './spirng';
import { DateModel } from '../shared/date.model';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-springs',
  templateUrl: './springs.component.html',
  styleUrls: ['./springs.component.scss']
})
export class SpringsComponent implements OnInit {

  public spring : Spring;
  public startDateModel : DateModel;
  public context;

  @ViewChild('myForm', { static: false }) myForm : NgForm;
  
  private gridApi: GridApi;
  private gridColumnApi;
  private columnDefs;
  private rowData : Spring[];
  private gridOptions: GridOptions;
  private errorMessage : string = "";
  private isEditMode: boolean = false;

  constructor(private springsService: SpringsService, private loginService: LoginService) {

    this.context = { componentParent: this };

    this.gridOptions = <GridOptions>{};
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.suppressRowClickSelection = false;
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableCellChangeFlash = true;
    this.gridOptions.rowSelection = 'single';

    this.spring = this.springsService.setSpringDefaultValues();

    this.columnDefs = [
      { headerName: 'Key', field: 'key', hide: true },
      { headerName: 'Spring Code', field: 'code', filter: 'text', width: 150 },
      { headerName: 'Spring Name', field: 'name', filter: 'text', width: 150 },
      { headerName: 'Status', field: 'status', filter: 'text', width: 150 },
      { headerName: 'Spring Days', field: 'springDays', filter: 'number', width: 150 },
      { headerName: 'Start Date', field: 'startDate', filter: 'text', width: 150, valueFormatter: this.dateFormatter },
      { headerName: 'End Date', field: 'endDate', filter: 'text', width: 150, valueFormatter: this.dateFormatter },
      { headerName: '', cellRendererFramework: MatEditButtonGridRenderComponent, width: 75 },
      { headerName: '', suppressFilter: true, cellRendererFramework: MatRemoveButtonGridRenderComponent, width: 75 }
    ];
  }

  ngOnInit(): void {
    this.populateSprings();
  }

  refeshSprings(): void {
    this.populateSprings();
    this.initialMode();
  }

  private populateSprings() {
    this.springs.subscribe(
      springList => {
        this.rowData = springList?springList.map(s=>new Spring(s)):springList;
        this.spring = this.springsService.changeSpringDefaultValues(this.spring, this.rowData);
      }, 
      error => this.handleError(error)
    );
  }

  currencyFormatter(params) {
    return '£' + params.value;
  }

  dateFormatter(params: any) {
    return new Date(params.value).toLocaleDateString("es-ES",{timeZone: 'UTC', year:"numeric",month:"2-digit", day:"2-digit"});
  }

  get springs(): Observable<Spring[]>{
    return this.springsService.getSprings();
  }
  
  getSpringById(id: number) : Observable<Spring> {
    return this.springsService.getSpringById(id);
  }

  removeSpring(id: number) {
    this.springsService.deleteSpringById(id).subscribe(
      data => this.refeshSprings(),
      error => console.log(error)
    );
  }

  editSpring(data: Spring) {
    this.spring = new Spring(data);
    this.errorMessage = "";
  }
  
  addSpring() {
    this.spring.applyChanges();
    this.springsService.addSpring(this.spring).subscribe(
      data => this.refeshSprings(),
      error => this.handleError(error)
    );
  }

  updateSpring(){
    if (this.spring.isNeededPropagate()) {
      this.propagateSprings(this.spring);
    }
    this.spring.applyChanges();
    this.springsService.updateSpring(this.spring).subscribe(
      data => this.refeshSprings(),
      error => this.handleError(error)
    );
  }

  propagateSprings(spring: Spring) {
    let dateToPropagate = new DateModel(this.loginService.currentProject.startDate.toString());
    dateToPropagate.setAddWorkableDays(dateToPropagate,0);
    this.rowData.forEach(sprg => {
        if (sprg.code == spring.code) {
            sprg = spring;
        }
        let spr = this.propagateAndupdateSpring(sprg,dateToPropagate);
        dateToPropagate = spr.endDateMd;
    })

  }

  propagateAndupdateSpring(sprg: Spring,endDateMd: DateModel ): Spring {
    sprg.startDateMd.setAddWorkableDays(endDateMd,2);
    sprg.setEndDateMdCalculed();
    sprg.applyChanges();
    this.springsService.updateSpring(sprg).subscribe();
    return sprg;
  }

  resetControls() {
    this.myForm.resetForm();
    Object.keys(this.myForm.controls).forEach(field => {      // {1}
      const control = this.myForm.control.get(field);         // {2}
      control.markAsUntouched();                              // {3}
    });
  }

  // Call from MatRemoveButtonGridRenderComponent
  removeFromComponent(spring: Spring){
    this.removeSpring(spring.id);
    this.initialMode();
  }

  // Call from MatEditButtonGridRenderComponent
  editFromComponent(data: Spring){
    this.isEditMode = true;
    this.editSpring(data);
  }

  cancelEditMode() {
    this.initialMode();
  }  

  private initialMode() {
    this.spring = new Spring();
    this.errorMessage = "";
    this.isEditMode = false;
    this.resetControls();
  }

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowAux;
    selectedRows.forEach(function(row, index) {
        selectedRowAux = row;
    });
    this.loginService.currentSpring = selectedRowAux;
  }  

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.autoSizeColumns();
  }

  handleError(error: HttpErrorResponse) {
    this.errorMessage = error.status==403 ? "Spring already exists":"Known Error";
    console.log(error);
  }

}
