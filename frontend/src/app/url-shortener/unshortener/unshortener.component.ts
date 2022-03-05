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
    shortSuffix: string;
    displayText = ''

    constructor(private route: ActivatedRoute, private backendService: BackendService, private router: Router) { }

    ngOnInit(): void {
        this.subscription$ = this.route.paramMap.pipe(
            map((params: ParamMap) => String(params.get('id'))),
            switchMap(shortSuffix => this.backendService.get<ShortenedLink>(`/api/url-short/link/unshorten/${shortSuffix}/`)),
            map((shortenedLink: ShortenedLink) => shortenedLink['full_link']),
            tap(val => this.displayText = 'Please wait 3 seconds'),
            delay(1),
            tap(val => this.displayText = 'Please wait 2 seconds'),
            delay(1),
            tap(val => this.displayText = 'Please wait 1 seconds'),
            delay(1),
        ).subscribe({
            next: fullLink => this.router.navigate([fullLink]),
            error: error => {this.displayText = 'Link not found'},
        })
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe()
    }

}
