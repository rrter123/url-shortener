import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private http: HttpClient) { }

    public get(url: string, queryParams?: { [name: string]: any }) {
        const fullUrl = this.createUrl(url);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers, params: queryParams, observe: 'response' as 'body' }
        return this.http.get(fullUrl, options)
    }

    private createUrl(url: string): string {
        return url.includes(environment.url) ? url : environment.url + url
    }
}
