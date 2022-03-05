import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, concatMap, map, Observable, startWith, Subscription, switchMap, tap } from 'rxjs';
import { BackendService } from 'src/app/shared/backend-service.service';
import { ShortenedLink } from '../shortened-link';

interface Unshortening {
    id: number;
    time: Date; //datetime
    shortened_link: string;
}

@Component({
    selector: 'app-short-link-statistics',
    templateUrl: './short-link-statistics.component.html',
    styleUrls: ['./short-link-statistics.component.scss']
})
export class ShortLinkStatisticsComponent implements OnInit {

    dateFormControl: FormControl = new FormControl();
    subscription$: Subscription;
    unshortenings: Unshortening[];

    constructor(private route: ActivatedRoute, private backendService: BackendService) { }

    ngOnInit(): void {
        const paramObservable$ = this.route.paramMap.pipe(map((params: ParamMap) => String(params.get('id'))))
        const dateObservable$ = this.dateFormControl.valueChanges.pipe(startWith(null))
        this.subscription$ = combineLatest([paramObservable$, dateObservable$]).pipe(
            switchMap(values => this.fetchUnshortenings(values[0], values[1])), // TODO: unpack this nicely
            map(response => response.body),
        ).subscribe(val => this.unshortenings = val || []);
    }

    fetchUnshortenings(shortLinkId: string, date: any) { // TODO: fix date any conflicting with formControl obseraable being unknown
        const queryParams = date ? { date: this.getDateString(date) } : {};
        return this.backendService.get<HttpResponse<Unshortening[]>>(`/api/url-short/unshortening/${shortLinkId}/`, queryParams);
    }

    getDateString(date: Date): string {
        return [
            date.getFullYear(),
            ('0' + (date.getMonth() + 1)).slice(-2),
            ('0' + date.getDate()).slice(-2)
        ].join('-');
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

}
