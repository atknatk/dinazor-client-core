import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnLockedComponent } from './locked.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [DnLockedComponent],
    exports: [DnLockedComponent]
})
export class DnLockedModule {
}
