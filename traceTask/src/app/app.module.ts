import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { AgGridTableComponent } from './ag-grid-table/ag-grid-table.component';

@NgModule({
  declarations: [AppComponent, AgGridTableComponent],
  imports: [BrowserModule, FormsModule, AgGridModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
