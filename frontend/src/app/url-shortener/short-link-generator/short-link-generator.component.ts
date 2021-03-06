import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { BackendService } from 'src/app/shared/backend-service.service';
import { ShortenedLink } from '../shortened-link';


@Component({
    selector: 'app-short-link-generator',
    templateUrl: './short-link-generator.component.html',
    styleUrls: ['./short-link-generator.component.scss']
})
export class ShortLinkGeneratorComponent {
    shortenedLink?: ShortenedLink;

    constructor(private backendService: BackendService, private router: Router) { }

    onSubmit(form: NgForm) {
        this.backendService.post<ShortenedLink>('/api/url-short/link/', { 'full_link': form.value.link }).pipe(
            map(httpResponse => httpResponse.body)
        ).subscribe({
            next: next => next ? this.shortenedLink = next : null,
            error: error => console.error(error),
        })
    }

    createShortUrl(suffix: string): string {
        return window.location.origin + this.router.createUrlTree(['/us', suffix]).toString();
    }

    createManagerUrl(id: string): string {
        return window.location.origin + this.router.createUrlTree(['/manage', id]).toString();
    }

}
