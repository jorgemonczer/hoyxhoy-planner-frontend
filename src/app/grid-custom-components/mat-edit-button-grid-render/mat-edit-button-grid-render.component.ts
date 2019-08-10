import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid';
import { RowNode } from 'ag-grid/dist/lib/entities/rowNode';

@Component({
  selector: 'app-mat-edit-button-grid-render',
  template: `<button mat-mini-fab color="primary" (click)="edit()">
              <mat-icon  inline="true">mode_edit</mat-icon>
            </button>`,
  styleUrls: ['./mat-edit-button-grid-render.component.scss']
})
export class MatEditButtonGridRenderComponent implements ICellRendererAngularComp {

  public params: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
      this.params = params;
  }

  public edit() {
      let data = this.params.data;
      this.params.context.componentParent.editFromComponent(data);
  }

  refresh(): boolean {
      return false;
  }
}
