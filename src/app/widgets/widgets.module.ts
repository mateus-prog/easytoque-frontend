import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from 'src/app/widgets';

@NgModule({
  declarations: [
    WidgetsComponent
  ],
  imports:[CommonModule],
  exports: [
    WidgetsComponent
  ]
})

export class WidgetModule { }
