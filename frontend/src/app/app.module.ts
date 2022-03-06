import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbDatepickerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SharedModule } from './shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { DateFnsModule } from 'ngx-date-fns';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        UrlShortenerModule,
        SharedModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: 'dark' }),
        NbLayoutModule,
        NbEvaIconsModule,
        NbDatepickerModule.forRoot(),
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
          }),
        DateFnsModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
