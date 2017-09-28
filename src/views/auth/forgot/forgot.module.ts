import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { DnForgotComponent } from './forgot.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [DnForgotComponent],
    exports: [DnForgotComponent]
})
export class DnForgotModule {
}
