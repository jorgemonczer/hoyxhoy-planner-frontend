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

  constructor(private spendingsService: SpendingService, private featuresService :FeaturesService, private userService :UserService, private loginService: LoginService) {

    this.context = { componentParent: this };

    this.gridOptions = <GridOptions>{};
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.rowSelection = 'single';
    this.gridOptions.suppressRowClickSelection = false;
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableCellChangeFlash = true;

    this.columnDefs = [
      { headerName: 'Id', field: 'id', hide: true },
      { headerName: 'F.Code', field: 'feature.code', filter: 'text', width: 100},
      { headerName: 'Feature Title', field: 'feature.title', filter: 'text', width: 200 },
      { headerName: 'Estimated', field: 'feature.estimatedHours', filter: 'text', width: 100 },
      { headerName: 'Spending', field: 'spending', filter: 'text', width: 100 },
      { headerName: 'Asigned', field: 'user.name', filter: 'text' , width: 150 }
    ];

    for (let index = 0; index < 10; index++) {
      this.columnDefs.push({ headerName: index+1, valueGetter: (params: any) => params.data.spendingsInt[index], valueSetter: (params: any) => this.valueSetter(params,index), editable: true, filter: false , width: 50 })
    }
  }

  valueSetter(params: any, index: number) {
    let ret = false;
    this.errorMessage = "";
    if (params.newValue.length == 0) {
        params.data.spendingsInt[index] = null;
        ret = true;
    } else if (!isNaN(+params.newValue)) {
      params.data.spendingsInt[index] = +params.newValue;
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
    console.log("cellEditingStarted");
    console.log(params);
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
