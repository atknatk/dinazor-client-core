import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BsDropdownModule, TooltipModule } from 'ngx-bootstrap';
import { AuthLayoutComponent } from './auth-layout.component';
import { MainLayoutComponent } from './dn-main-layout.component';
import { LayoutComponent } from './main-layout.component';
import { NavigationModule } from './navigation/navigation.module';
import { HeaderModule } from '../../../src/layout/header/header.module';
import { DinazorLayoutModule } from '../../../src/layout/layout.module';

const components = [
  LayoutComponent,
  MainLayoutComponent,
  AuthLayoutComponent
];

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    NavigationModule,
    FormsModule,
    RouterTestingModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    DinazorLayoutModule
  ],
  declarations: [...components],
  exports: [...components],
  providers: []
})
export class LayoutModule {

}
