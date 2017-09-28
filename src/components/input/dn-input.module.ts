import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DnInputComponent } from './dn-input.component';
import { DnSmartInputComponent } from './smart-input/dn-smart-input.component';
import { DnTextareaComponent } from './dn-textarea/dn-textarea.component';

/**
 * Created by cabbar on 12.04.2017.
 */

@NgModule({
    declarations: [
        DnInputComponent,
        DnSmartInputComponent,
        DnTextareaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        DnInputComponent,
        DnSmartInputComponent,
        DnTextareaComponent
    ]
})
export class DnInputModule {
}
