import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShortLinkGeneratorComponent } from './url-shortener/short-link-generator/short-link-generator.component';
import { ShortLinkStatisticsComponent } from './url-shortener/short-link-statistics/short-link-statistics.component';
import { UnshortenerComponent } from './url-shortener/unshortener/unshortener.component';

const routes: Routes = [
    {path: 'us/:id', component: UnshortenerComponent},
    {path: 'manage/:id', component: ShortLinkStatisticsComponent},
    {path: '', component: ShortLinkGeneratorComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
