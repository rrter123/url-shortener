import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NbIconModule } from '@nebular/theme';



@NgModule({
    declarations: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        NbIconModule,
    ],
    exports: [HeaderComponent]
})
export class SharedModule { }
