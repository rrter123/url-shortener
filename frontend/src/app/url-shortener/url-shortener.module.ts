import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortLinkGeneratorComponent } from './short-link-generator/short-link-generator.component';
import { UnshortenerComponent } from './unshortener/unshortener.component';
import { ShortLinkStatisticsComponent } from './short-link-statistics/short-link-statistics.component';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        ShortLinkGeneratorComponent,
        UnshortenerComponent,
        ShortLinkStatisticsComponent
    ],
    imports: [
        CommonModule,
        NbCardModule,
        NbInputModule,
        NbButtonModule,
        NbListModule,
        NbDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        ShortLinkGeneratorComponent,
        UnshortenerComponent,
        ShortLinkStatisticsComponent
    ],
})
export class UrlShortenerModule { }
