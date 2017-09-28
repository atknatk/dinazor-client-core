import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DblClickCopyDirective } from './dbl-click-copy.directive';
import { VisibilityDirective } from './visibility.directive';
import { DnStyleDirective } from './dn-style.directive';

const directives = [
    VisibilityDirective,
    DblClickCopyDirective,
    DnStyleDirective
];
@NgModule({
  declarations: [...directives],
  exports: [...directives],
  imports: [CommonModule]
})
export class DirectivesModule { }
