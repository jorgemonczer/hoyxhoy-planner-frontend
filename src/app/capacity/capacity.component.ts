import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { GridApi, GridOptions } from 'ag-grid';
import { MatEditButtonGridRenderComponent } from '../grid-custom-components/mat-edit-button-grid-render/mat-edit-button-grid-render.component';
import { MatRemoveButtonGridRenderComponent } from '../grid-custom-components/mat-remove-button-grid-render/mat-remove-button-grid-render.component';
import { LoginService } from '../login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../users/user';
import { UserService } from '../users/users.service';
import { Capacity } from './capacity';
import { CapacityService } from './capacity.service';
import { AgFormatterService } from '../shared/ag-formatter.service';

@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss']
})
export class CapacityComponent implements OnInit {

  public capacity = new Capacity();
  public context: any;
  
  @ViewChild('myForm', { static: false }) myForm: NgForm;
  
  private gridApi: GridApi;
  private gridColumnApi;
  private columnDefs: any;
  private rowData: Capacity[];
  private users : User[];
  private gridOptions: GridOptions;
  private errorMessage : string = "";
  private isEditMode: boolean = false;

  constructor(private capacitysService: CapacityService, private userService :UserService, private loginService: LoginService, private frm: AgFormatterService) {

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
      { headerName: 'User', field: 'user.name', filter: 'text' , width: 150 },
      { headerName: 'Available Hs', field: 'availableHours', type: "numericColumn", filter: 'number', valueFormatter: this.frm.ag_numberTwoDecimalFormatter, width: 130 },
      { headerName: 'Total Hs', field: 'availableOnSpring', type: "numericColumn", filter: 'number', valueFormatter: this.frm.ag_numberTwoDecimalFormatter, width: 130 },
      { headerName: 'Remaining Hs', field: 'remainingOnSpring', type: "numericColumn", filter: 'number', valueFormatter: this.frm.ag_numberTwoDecimalFormatter, width: 130 },
      { headerName: '', cellRendererFramework: MatEditButtonGridRenderComponent, width: 75 },
      { headerName: '', suppressFilter: true, cellRendererFramework: MatRemoveButtonGridRenderComponent, width: 75 }
    ];
  }

  ngOnInit(): void {
    this.populateCapacitys();
    this.userService.getUsers().toPromise().then(users => this.users = users);
}

  refeshCapacitys(): void {
    this.populateCapacitys();
    this.initialMode();
  }

  private populateCapacitys() {
    this.capacities.subscribe(
      capacityList => this.rowData = capacityList, 
      error => this.handleError(error)
    );
  }

  dateFormatter(params: any) {
    return new Date(params.value).toLocaleDateString("es-ES",{timeZone: 'UTC', year:"numeric",month:"2-digit", day:"2-digit"});
  }

  get capacities(): Observable<Capacity[]> {
    return this.capacitysService.getCapacities();
  }
  
  getCapacityById(id: number): Observable<Capacity> {
    return this.capacitysService.getCapacityById(id);
  }

  removeCapacity(id: number) {
    this.capacitysService.deleteCapacityById(id).subscribe(
      data => this.refeshCapacitys(),
      error => console.log(error)
    );
  }

  editCapacity(data: Capacity) {
    this.capacity = new Capacity(data);
    this.errorMessage = "";
  }
  
  addCapacity(): void {
  //  this.project.status = "OPEN";
    this.capacitysService.addCapacity(this.capacity).subscribe(
      data => this.refeshCapacitys(),
      error => this.handleError(error)
    );
  }

  handleError(res: HttpErrorResponse) {
    this.errorMessage = res.error.error_message; 
    console.log(res);
  }

  updateCapacity(){
    this.capacitysService.updateCapacity(this.capacity).subscribe(
      data => this.refeshCapacitys(),
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
  removeFromComponent(capacity: Capacity){
    this.removeCapacity(capacity.id);
    this.initialMode();
  }

  // Call from MatEditButtonGridRenderComponent
  editFromComponent(data: Capacity){
    this.isEditMode = true;
    this.editCapacity(data);
  }

  cancelEditMode() {
    this.initialMode();
  }  

  private initialMode() {
    this.capacity = new Capacity();
    this.errorMessage = "";
    this.isEditMode = false;
    this.resetControls();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.autoSizeColumns();
  }

  compareUsers(o1:User,o2:User) : boolean {
    return (o1 && o2) ? o1.username === o2.username : o1 === o2;       
  }

  getMatTooltipButton() : string {
    if (this.capacity.user) {
      return this.capacity.user.username;
    }
    return "";
  }

}
