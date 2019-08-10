import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid';
import { RowNode } from 'ag-grid/dist/lib/entities/rowNode';

@Component({
  selector: 'app-mat-remove-button-grid-render',
  template: `<button mat-mini-fab color="primary" (click)="remove()">
              <mat-icon  inline="true">remove</mat-icon>
            </button>`,
  styleUrls: ['./mat-remove-button-grid-render.component.scss']
})
export class MatRemoveButtonGridRenderComponent implements ICellRendererAngularComp {

  public params: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
      this.params = params;
  }

  public remove() {
    let data = this.params.data;
    this.params.context.componentParent.removeFromComponent(data);
  }

  refresh(): boolean {
      return false;
  }
}
