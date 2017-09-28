import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnRegisterComponent } from './register.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [DnRegisterComponent],
    exports: [DnRegisterComponent]

})
export class DnRegisterModule {
}
