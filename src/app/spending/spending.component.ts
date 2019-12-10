import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { GridApi, GridOptions } from 'ag-grid';
import { LoginService } from '../login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../users/user';
import { Feature } from '../backlog/feature';
import { FeaturesService } from '../backlog/features.service';
import { UserService } from '../users/users.service';
import { SpendingService } from './spending.service';
import { Asignment } from '../asignment/asignment';
import { DateModel } from '../shared/date.model';
import { AgFormatterService } from '../shared/ag-formatter.service';

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.scss']
})
export class SpendingComponent implements OnInit {

  public context: any;
  
  @ViewChild('myForm', { static: false }) myForm: NgForm;
  
  private gridApi: GridApi;
  private gridColumnApi;
  private columnDefs: any;
  private rowData: Asignment[];
  private features : Feature[];
  private users : User[];
  private gridOptions: GridOptions;
  private errorMessage : string = "";
  private isEditMode: boolean = false;

  constructor(private spendingsService: SpendingService, private featuresService :FeaturesService, private userService :UserService, private loginService: LoginService, private frm: AgFormatterService) {

    this.context = { componentParent: this };

    this.gridOptions = <GridOptions>{};
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.rowSelection = 'single';
    this.gridOptions.suppressRowClickSelection = false;
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableCellChangeFlash = true;
    this.gridOptions.getRowStyle = function(params: any) {
      if (params.data.feature.estimatedHours - params.data.spending === 0) {
          return { background: 	'#E08E8E' }
      }
    }
    this.gridOptions.headerHeight = 65;
//    this.gridOptions.defaultColDef = { headerComponentParams : {
//          menuIcon: 'fa-bars',
//          template:
//          '<div class="ag-cell-label-container" role="presentation">' +
//          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
//          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
//          '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
//          '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
//          '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
//          '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
//          '    ** <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
//          '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
//          '  </div>' +
//          '</div>'
//      } }

    this.columnDefs = [
      { headerName: 'Id', field: 'id', hide: true },
      { headerName: 'F.Code', field: 'feature.code', filter: 'text', width: 100},
      { headerName: 'Feature Title', field: 'feature.title', filter: 'text', width: 200 },
      { headerName: 'Estimated', field: 'feature.estimatedHours', type: "numericColumn", filter: 'number', valueFormatter: this.frm.ag_numberTwoDecimalFormatter ,width: 100 },
      { headerName: 'Spending', field: 'spending', type: "numericColumn", filter: 'number', valueFormatter: this.frm.ag_numberTwoDecimalFormatter, width: 100 },
      { headerName: 'Asigned', field: 'user.name', filter: 'text' , width: 150 }
    ];

    for (let index = 0; index < loginService.currentSpring.springDays; index++) {
//        this.columnDefs.push( { headerName : this.dateHeader(index+1), children: [{ headerName: index+1, valueGetter: (params: any) => params.data.spendingsInt[index], valueSetter: (params: any) => this.valueSetter(params,index), editable: true, suppressSorting: true, suppressMenu : true, type: "numericColumn", width: 55 }] })
//      this.columnDefs.push({ headerName: index+1, valueGetter: (params: any) => params.data.spendingsInt[index], valueSetter: (params: any) => this.valueSetter(params,index), editable: true, suppressSorting: true, suppressMenu : true, type: "numericColumn", width: 55 })
          this.columnDefs.push({ headerName: this.dateHeader(index+1), valueGetter: (params: any) => params.data.spendingsInt[index], valueSetter: (params: any) => this.valueSetter(params,index), editable: true, suppressSorting: true, suppressMenu : true, type: "text", valueFormatter: this.frm.ag_numberTwoDecimalFormatter, width: 55, headerComponentParams : {template: this.getHeaderTemplate()} })
        }
  }

  valueSetter(params: any, index: number) {
    let ret = false;
    this.errorMessage = "";
    params.newValue = params.newValue.length == 0 ? params.newValue : params.newValue.replace(",",".");
    if (params.newValue.length == 0) {
        params.data.spendingsInt[index] = null;
        ret = true;
    } else if (!isNaN(+params.newValue)) {
          params.data.spendingsInt[index] = Math.round(+params.newValue * 100) / 100;
      ret = true;
    }
    params.data.calculateSumSpending();
    if (params.data.feature.estimatedHours < params.data.spending) {
      this.errorMessage = "It has been consummed all the feature estimaded time, you must extend it"
      params.data.spendingsInt[index] = null;
      params.data.calculateSumSpending();
      params.data.spendingsInt[index] = params.data.feature.estimatedHours - params.data.spending;
      params.data.calculateSumSpending();
    }
    return ret;
  }

  ngOnInit(): void {
    this.populateAsignments();
  }

  refeshAsignments(): void {
    this.populateAsignments();
    this.initialMode();
  }

  private populateAsignments() {
//    asignmentList =>   this.rowData = asignmentList.map(asign => new Asignment(asign).addSpendings(this.loginService.currentSpring.springDays)),
    this.asignments.subscribe(
      asignmentList =>   this.rowData = asignmentList.map(asign => new Asignment(asign)),
      error => this.handleError(error)
    );
  }

  dateFormatter(params: any) {
    return new Date(params.value).toLocaleDateString("es-ES",{timeZone: 'UTC', year:"numeric",month:"2-digit", day:"2-digit"});
  }

  getHeaderTemplat2() : string {
    return  '<div class="ag-cell-label-container" role="presentation">' +
    '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
    '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
    '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
    '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
    '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
    '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
    '    ** <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
    '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
    '  </div>' +
    '</div>';
  }

  getHeaderTemplate() : string {
    return  '<div class="ag-cell-label-container ag-header-center" role="presentation">' +
    '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
    '</div>';
  }

  dateHeader(numDay: number) {
    let dtM = new DateModel(this.loginService.currentSpring.startDate.toString());
    dtM.setAddWorkableDays(dtM,numDay);
    return numDay + "</br>" + this.getDayAndMounthFromDate(dtM.getDate()) + "</br>" + this.getWeekdayFromDate(dtM.getDate());
  }

  getDayAndMounthFromDate(d: Date): string {
    let format = d.toLocaleDateString(undefined,{timeZone: 'UTC', year:"numeric" ,month:"2-digit", day:"2-digit"});
     // Check locale format and strip year
    if(format.match(/.[0-9]{4}/g) ){
       format = format.replace(/.[0-9]{4}/, '');
    } else if( format.match(/[0-9]{4}./g) ){
      format = format.replace(/[0-9]{4}./, '');
    } else if( format.match(new RegExp('/[0-9]{4}') ) ) {
      format = format.replace(new RegExp('/[0-9]{4}'), '');
    } else if( format.match(new RegExp('[0-9]{4}/') ) ) {
      format = format.replace(new RegExp('[0-9]{4}/'), '');
    }
    return format;
  }

  getWeekdayFromDate(d: Date): string {
    let format = d.toLocaleDateString(undefined,{timeZone: 'UTC', weekday: "short"});
    format = format.replace('.','');
    return format;
  }
  
  get asignments(): Observable<Asignment[]> {
    return this.spendingsService.getSpendings();
  }
  
  editAsignment(data: Asignment) {
    this.errorMessage = "";
  }
  
  handleError(res: HttpErrorResponse) {
      this.errorMessage = res.error.error_message;
      console.log(res);
  }

  saveSpendings() {
    this.spendingsService.saveSpendings(this.rowData).subscribe(
      data => this.refeshAsignments(),
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

  cancelEditMode() {
    this.initialMode();
  }  

  private initialMode() {
    this.errorMessage = "";
    this.isEditMode = false;
    this.resetControls();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.autoSizeColumns();
  }

  onCellEditingStarted(params: any) {
//    console.log("cellEditingStarted");
//    console.log(params);
//    console.log(params.value);
//    console.log(params.column);
//    console.log(params.data.capacity);
//    console.log(params.node);
//    params.node.setDataValue(params.column.colId, params.data.capacity);
  } 

  compareFeatures(o1:Feature,o2:Feature) : boolean {
    return (o1 && o2) ? o1.id === o2.id : o1 === o2; 
  }

  compareUsers(o1:User,o2:User) : boolean {
    return (o1 && o2) ? o1.username === o2.username : o1 === o2;       
  }

}
