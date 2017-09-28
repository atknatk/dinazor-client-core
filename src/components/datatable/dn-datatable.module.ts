import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnDatatableComponent } from './dn-datatable.component';

// require('smartadmin-plugins/bower_components/datatables.net-colreorder-bs/css/colReorder.bootstrap.min.css');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DnDatatableComponent],
  exports: [DnDatatableComponent],
})
export class DnDatatableModule {
}
