import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSortModule,
  MatStepperModule,
} from '@angular/material';

import { MatCheckboxGridModule } from '../grid-custom-components/mat-checkbox-grid/mat-checkbox-grid.module';
import { MatRemoveButtonGridRenderModule } from '../grid-custom-components/mat-remove-button-grid-render/mat-remove-button-grid-render.module';
import { MatEditButtonGridRenderModule } from '../grid-custom-components/mat-edit-button-grid-render/mat-edit-button-grid-render.module';
import { NoWeekendValidator } from './date.weekend.directive';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TwoDigitDecimalNumber } from './decimal.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCheckboxGridModule,
    MatRemoveButtonGridRenderModule,
    MatEditButtonGridRenderModule,
    MatStepperModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCheckboxGridModule,
    MatRemoveButtonGridRenderModule,
    MatEditButtonGridRenderModule,
    MatStepperModule
  ],
  declarations: [NoWeekendValidator,TwoDigitDecimalNumber]
})
export class SharedModule { }
