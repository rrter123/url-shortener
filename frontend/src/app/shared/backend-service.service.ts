import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private http: HttpClient) { }

    public get<T>(url: string, queryParams?: { [name: string]: any }) {
        const fullUrl = this.createBackendUrl(url);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers, params: queryParams, observe: 'response' as 'body' }
        return this.http.get<T>(fullUrl, options)
    }

    public post<T>(url: string, data?: { [name: string]: any }): Observable<HttpResponse<T>> {
        const fullUrl = this.createBackendUrl(url);
        const headers = new HttpHeaders({ 
            'Content-Type': 'application/json',
        });
        const options = { headers: headers, observe: 'response' as 'body' }
        return this.http.post<HttpResponse<T>>(fullUrl, data, options)
    }

    private createBackendUrl(url: string): string {
        return url.includes(environment.backendUrl) ? url : environment.backendUrl + url
    }
}
