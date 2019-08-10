import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GridApi, GridOptions, RowNode } from 'ag-grid';
import { User } from './user';
import { UserService } from './users.service';
import { MatRemoveButtonGridRenderComponent } from '../grid-custom-components/mat-remove-button-grid-render/mat-remove-button-grid-render.component';
import { MatEditButtonGridRenderComponent } from '../grid-custom-components/mat-edit-button-grid-render/mat-edit-button-grid-render.component';
import { NgForm, FormGroup } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public user = new User();
  public context;

  @ViewChild('myForm',{static: false}) myForm : NgForm;
  
  private gridApi: GridApi;
  private gridColumnApi;
  private columnDefs: any;
  private rowData: User[];
  private gridOptions: GridOptions;
  private errorMessage : string = "";
  private isEditMode: boolean = false;

  constructor(private userService: UserService, private loginService: LoginService) {

    this.context = { componentParent: this };

    this.gridOptions = <GridOptions>{};
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.rowSelection = 'simple';
    this.gridOptions.suppressRowClickSelection = false;
    this.gridOptions.enableColResize = true;

    this.columnDefs = [
      { headerName: 'User', field: 'username', filter: 'text' },
      { headerName: 'Name', field: 'name', filter: 'text' },
      { headerName: 'Email', field: 'email', filter: 'text' },
      { headerName: 'Phone', field: 'phone', filter: 'text' },
      { headerName: 'Mobile', field: 'mobile', filter: 'text' },
      { headerName: '', cellRendererFramework: MatEditButtonGridRenderComponent, width: 40 },
      { headerName: '', suppressFilter: true, cellRendererFramework: MatRemoveButtonGridRenderComponent, width: 40 }
    ];
  }

  ngOnInit(): void {
    this.populateUsers();
  }

  refeshUsers(): void {
    this.populateUsers();
    this.initialMode();
    this.resetControls();
  }

  private populateUsers() {
    this.userService.getUsers().subscribe(
      userList => this.rowData = userList, 
      error => this.handleError(error)
    );
  }

  dateFormatter(params: any) {
    return new Date(params.value).toLocaleDateString("es-ES",{timeZone: 'UTC', year:"numeric",month:"2-digit", day:"2-digit"});
  }

  get users(): Observable<User[]> {
    return this.userService.getUsers();
  }
  
  getUserByUsername(username: string): Observable<User> {
    return this.userService.getUserByUsername(username);
  }

  removeUser(username: string) {
    this.userService.deleteUserByUsername(username).subscribe(
      data => this.refeshUsers(),
      error => console.log(error)
    );
  }

  editUser(data: User) {
    this.user = new User(data);
    this.errorMessage = "";
  }
  
  addUser(): void {
  //  this.project.status = "OPEN";
    this.userService.addUser(this.user).subscribe(
      data => this.refeshUsers(),
      error => this.handleError(error)
    );
  }

  handleError(error: HttpErrorResponse) {
      this.errorMessage = error.status==403 ? "User already exists":"Known Error";
      console.log(error);
  }

  updateUser(){
    this.userService.updateUser(this.user).subscribe(
      data => this.refeshUsers(),
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
  removeFromComponent(user: User){
    this.removeUser(user.username);
    this.initialMode();
  }

  // Call from MatEditButtonGridRenderComponent
  editFromComponent(data: User){
    this.isEditMode = true;
    this.editUser(data);
  }

  cancelEditMode() {
    this.initialMode();
  }  

  private initialMode() {
    this.user = new User();
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
