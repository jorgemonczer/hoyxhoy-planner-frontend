import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Project } from './project';
import { Subscription, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { GridApi, GridOptions } from 'ag-grid';
import { ProjectsService } from './projects.service';
import { Router } from '@angular/router';
import { MatEditButtonGridRenderComponent } from '../grid-custom-components/mat-edit-button-grid-render/mat-edit-button-grid-render.component';
import { MatRemoveButtonGridRenderComponent } from '../grid-custom-components/mat-remove-button-grid-render/mat-remove-button-grid-render.component';
import { LoginService } from '../login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AgFormatterService } from '../shared/ag-formatter.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public project = new Project();
//  public projectSelected = new Project();
  public context: any;
  
  @ViewChild('myForm', { static: false }) myForm: NgForm;
  
  private gridApi: GridApi;
  private gridColumnApi;
  private columnDefs: any;
  private rowData: Project[];
  private gridOptions: GridOptions;
  private errorMessage : string = "";
  private isEditMode: boolean = false;

  constructor(private projectsService: ProjectsService, private loginService: LoginService, private router: Router, private frm: AgFormatterService) {

    this.context = { componentParent: this };

    this.gridOptions = <GridOptions>{};
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.rowSelection = 'single';

    this.columnDefs = [
      { headerName: 'Id', field: 'id', hide: true },
      { headerName: 'Code', field: 'code', filter: 'text', width: 120 },
      { headerName: 'Name', field: 'name', filter: 'text', width: 250 },
      { headerName: 'Start Date', field: 'startDate', filter: 'date', width: 140, valueFormatter: this.frm.ag_dateFormatter },
      { headerName: 'Spring Days', field: 'springDays', type: "numericColumn", filter: 'number',width: 150 },
      { headerName: 'Status', field: 'status', filter: 'text', width: 120 },
      { headerName: '', cellRendererFramework: MatEditButtonGridRenderComponent, width: 40 },
      { headerName: '', suppressFilter: true, cellRendererFramework: MatRemoveButtonGridRenderComponent, width: 40 }
    ];
  }

  ngOnInit(): void {
    this.populateProjects();
  }

  refeshProjects(): void {
    this.populateProjects();
    this.initialMode();
  }

  private populateProjects() {
    this.projects.subscribe(
      projectList => this.rowData = projectList, 
      error => this.handleError(error)
    );
  }

  get projects(): Observable<Project[]> {
    return this.projectsService.getProjects();
  }
  
  getProjectById(id: number): Observable<Project> {
    return this.projectsService.getProjectById(id);
  }

  removeProject(id: number) {
    this.projectsService.deleteProjectById(id).subscribe(
      data => this.refeshProjects(),
      error => console.log(error)
    );
  }

  editProject(data: Project) {
    this.project = new Project(data);
    this.errorMessage = "";
  }
  
  addProject(): void {
  //  this.project.status = "OPEN";
    this.projectsService.addProject(this.project).subscribe(
      data => this.refeshProjects(),
      error => this.handleError(error)
    );
  }

  handleError(res: HttpErrorResponse) {
      this.errorMessage = res.error.error_message; 
      console.log(res);
  }

  updateProject(){
    this.projectsService.updateProject(this.project).subscribe(
      data => this.refeshProjects(),
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
  removeFromComponent(project: Project){
    this.removeProject(project.id);
    this.initialMode();
  }

  // Call from MatEditButtonGridRenderComponent
  editFromComponent(data: Project){
    this.isEditMode = true;
    this.editProject(data);
  }

  cancelEditMode() {
    this.initialMode();
  }  

  private initialMode() {
    this.project = new Project();
    this.errorMessage = "";
    this.isEditMode = false;
    this.resetControls();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.autoSizeColumns();
  }

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowAux: any;
    selectedRows.forEach(function(row, index) {
//      if (index !== 0) {
//        selectedRowsString += ", ";
//      }
        selectedRowAux = row;
    });
    this.loginService.currentProject = selectedRowAux;
    if (this.loginService.currentSpring===null) {
      this.router.navigate(['/springs']);
    }
//    this.projectSelected = selectedRowAux;
//    document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  }  
}
