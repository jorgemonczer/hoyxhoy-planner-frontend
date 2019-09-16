import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { GridApi, GridOptions } from 'ag-grid';
import { MatEditButtonGridRenderComponent } from '../grid-custom-components/mat-edit-button-grid-render/mat-edit-button-grid-render.component';
import { MatRemoveButtonGridRenderComponent } from '../grid-custom-components/mat-remove-button-grid-render/mat-remove-button-grid-render.component';
import { LoginService } from '../login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../users/user';
import { Feature } from '../backlog/feature';
import { FeaturesService } from '../backlog/features.service';
import { UserService } from '../users/users.service';
import { Asignment } from './asignment';
import { AsignmentService } from './asignment.service';

@Component({
  selector: 'app-asignment',
  templateUrl: './asignment.component.html',
  styleUrls: ['./asignment.component.scss']
})
export class AsignmentComponent implements OnInit {

  public asignment = new Asignment();
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

  constructor(private asignmentsService: AsignmentService, private featuresService :FeaturesService, private userService :UserService, private loginService: LoginService) {

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
      { headerName: 'Feature Title', field: 'feature.title', filter: 'text', width: 400 },
      { headerName: 'Estimated Hs.', field: 'feature.estimatedHours', filter: 'text', width: 130 },
      { headerName: 'Asigned', field: 'user.name', filter: 'text' , width: 150 },
      { headerName: '', cellRendererFramework: MatEditButtonGridRenderComponent, width: 75 },
      { headerName: '', suppressFilter: true, cellRendererFramework: MatRemoveButtonGridRenderComponent, width: 75 }
    ];
  }

  ngOnInit(): void {
    this.populateAsignments();
    this.featuresService.getFeatures().toPromise().then( feats => this.features = feats);
    this.userService.getUsers().toPromise().then(users => this.users = users);
}

  refeshAsignments(): void {
    this.populateAsignments();
    this.initialMode();
  }

  private populateAsignments() {
    this.asignments.subscribe(
      asignmentList => this.rowData = asignmentList, 
      error => this.handleError(error)
    );
  }

  dateFormatter(params: any) {
    return new Date(params.value).toLocaleDateString("es-ES",{timeZone: 'UTC', year:"numeric",month:"2-digit", day:"2-digit"});
  }

  get asignments(): Observable<Asignment[]> {
    return this.asignmentsService.getAsignments();
  }
  
  getAsignmentById(id: number): Observable<Asignment> {
    return this.asignmentsService.getAsignmentById(id);
  }

  removeAsignment(id: number) {
    this.asignmentsService.deleteAsignmentById(id).subscribe(
      data => this.refeshAsignments(),
      error => console.log(error)
    );
  }

  editAsignment(data: Asignment) {
    this.asignment = new Asignment(data);
    this.errorMessage = "";
  }
  
  addAsignment(): void {
  //  this.project.status = "OPEN";
    this.asignmentsService.addAsignment(this.asignment).subscribe(
      data => this.refeshAsignments(),
      error => this.handleError(error)
    );
  }

  handleError(res: HttpErrorResponse) {
      this.errorMessage = res.error.error_message;
      console.log(res);
  }

  updateAsignment(){
    this.asignmentsService.updateAsignment(this.asignment).subscribe(
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

  // Call from MatRemoveButtonGridRenderComponent
  removeFromComponent(asignment: Asignment){
    this.removeAsignment(asignment.id);
    this.initialMode();
  }

  // Call from MatEditButtonGridRenderComponent
  editFromComponent(data: Asignment){
    this.isEditMode = true;
    this.editAsignment(data);
  }

  cancelEditMode() {
    this.initialMode();
  }  

  private initialMode() {
    this.asignment = new Asignment();
    this.errorMessage = "";
    this.isEditMode = false;
    this.resetControls();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.autoSizeColumns();
  }

  compareFeatures(o1:Feature,o2:Feature) : boolean {
    return (o1 && o2) ? o1.id === o2.id : o1 === o2; 
  }

  compareUsers(o1:User,o2:User) : boolean {
    return (o1 && o2) ? o1.username === o2.username : o1 === o2;       
  }

  getMatTooltipButton() : string {
    if (this.asignment.feature) {
      return this.asignment.feature.title;
    }
    return "";
  }

}
