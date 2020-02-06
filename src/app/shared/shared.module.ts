import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgoTimePipe } from './pipes/ago-time.pipe';

@NgModule({
  declarations: [AgoTimePipe],
  imports: [
    // Angular Imports
    CommonModule,
  ],
  exports: [
    // Angular Imports
    CommonModule,
    AgoTimePipe,
  ],
})
export class SharedModule {}
