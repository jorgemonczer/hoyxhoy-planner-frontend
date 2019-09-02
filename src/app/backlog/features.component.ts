import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { GridApi, GridOptions } from 'ag-grid';
import { MatEditButtonGridRenderComponent } from '../grid-custom-components/mat-edit-button-grid-render/mat-edit-button-grid-render.component';
import { MatRemoveButtonGridRenderComponent } from '../grid-custom-components/mat-remove-button-grid-render/mat-remove-button-grid-render.component';
import { LoginService } from '../login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Feature } from './feature';
import { FeaturesService } from './features.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  public feature = new Feature();
  public context: any;
  
  @ViewChild('myForm', { static: false }) myForm: NgForm;
  
  private gridApi: GridApi;
  private gridColumnApi;
  private columnDefs: any;
  private rowData: Feature[];
  private gridOptions: GridOptions;
  private errorMessage : string = "";
  private isEditMode: boolean = false;

  constructor(private featuresService: FeaturesService, private loginService: LoginService) {

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
      { headerName: 'F.Code', field: 'code', filter: 'text' , width: 100 },
      { headerName: 'Feature Title', field: 'title', filter: 'text', width: 400 },
      { headerName: 'Estimated Hours', field: 'estimatedHours', filter: 'text' , width: 130 },
      { headerName: 'Committed Date', field: 'committedDate', filter: 'text' , width: 170 },
      { headerName: '', cellRendererFramework: MatEditButtonGridRenderComponent, width: 75 },
      { headerName: '', suppressFilter: true, cellRendererFramework: MatRemoveButtonGridRenderComponent, width: 75 }
    ];
  }

  ngOnInit(): void {
    this.populateFeatures();
  }

  refeshFeatures(): void {
    this.populateFeatures();
    this.initialMode();
  }

  private populateFeatures() {
    this.features.subscribe(
      featureList => this.rowData = featureList, 
      error => this.handleError(error)
    );
  }

  dateFormatter(params: any) {
    return new Date(params.value).toLocaleDateString("es-ES",{timeZone: 'UTC', year:"numeric",month:"2-digit", day:"2-digit"});
  }

  get features(): Observable<Feature[]> {
    return this.featuresService.getFeatures();
  }
  
  getFeatureById(id: number): Observable<Feature> {
    return this.featuresService.getFeatureById(id);
  }

  removeFeature(id: number) {
    this.featuresService.deleteFeatureById(id).subscribe(
      data => this.refeshFeatures(),
      error => console.log(error)
    );
  }

  editFeature(data: Feature) {
    this.feature = new Feature(data);
    this.errorMessage = "";
  }
  
  addFeature(): void {
  //  this.project.status = "OPEN";
    this.featuresService.addFeature(this.feature).subscribe(
      data => this.refeshFeatures(),
      error => this.handleError(error)
    );
  }

  handleError(error: HttpErrorResponse) {
      this.errorMessage = error.status==403 ? "Feature already exists":"Known Error";
      console.log(error);
  }

  updateFeature(){
    this.featuresService.updateFeature(this.feature).subscribe(
      data => this.refeshFeatures(),
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
  removeFromComponent(feature: Feature){
    this.removeFeature(feature.id);
    this.initialMode();
  }

  // Call from MatEditButtonGridRenderComponent
  editFromComponent(data: Feature){
    this.isEditMode = true;
    this.editFeature(data);
  }

  cancelEditMode() {
    this.initialMode();
  }  

  private initialMode() {
    this.feature = new Feature();
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
