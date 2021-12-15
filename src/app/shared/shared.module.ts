import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MustMatchDirective } from './directives/must-mutch.directive';
import { LoadingComponent, LoadingSpinnerComponent } from './loading';
import { PopUpComponent } from './pop-up/pop-up.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    TranslateModule,
    MustMatchDirective,
    LoadingComponent,
    PopUpComponent,
  ],
  declarations: [
    MustMatchDirective,
    LoadingComponent,
    LoadingSpinnerComponent,
    PopUpComponent,
  ],
})
export class SharedModule {}
