import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { delay, map, Observable, Subscription, switchMap, tap, timer } from 'rxjs';
import { BackendService } from 'src/app/shared/backend-service.service';
import { ShortenedLink } from '../shortened-link';


@Component({
    selector: 'app-unshortener',
    templateUrl: './unshortener.component.html',
    styleUrls: ['./unshortener.component.scss']
})
export class UnshortenerComponent implements OnInit {
    subscription$: Subscription;
    displayText = ''

    constructor(private route: ActivatedRoute, private backendService: BackendService) { }

    ngOnInit(): void {
        const myObserver = {
            next: (fullLink: string | null) => { if (fullLink) { this.redirect(fullLink) } },
            error: (error: any) => { this.displayText = 'Link not found' },
        }
        this.subscription$ = this.route.paramMap.pipe(
            map((params: ParamMap) => String(params.get('id'))),
            switchMap(shortSuffix => this.backendService.get<HttpResponse<ShortenedLink>>(`/api/url-short/link/${shortSuffix}/unshorten/`)),
            map((shortenedLinkRes: HttpResponse<ShortenedLink>) => shortenedLinkRes.body ? String(shortenedLinkRes.body['full_link']) : null),
            tap(val => this.displayText = 'Please wait 3 seconds'), // TODO: switch around order
            delay(1000),
            tap(val => this.displayText = 'Please wait 2 seconds'),
            delay(1000),
            tap(val => this.displayText = 'Please wait 1 seconds'),
            delay(1000),
        ).subscribe(myObserver);
    }

    redirect(fullLink: string): void {
        this.subscription$.unsubscribe();
        window.location.href = fullLink;
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

}
