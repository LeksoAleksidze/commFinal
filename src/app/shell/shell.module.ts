import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, NotFoundComponent],
  declarations: [HeaderComponent, NotFoundComponent],
})
export class ShellModule {}
