import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { BackendService } from 'src/app/shared/backend-service.service';

interface Link {
    short_link_suffix: string,
    id: string,
    full_link: string,
}

@Component({
    selector: 'app-short-link-generator',
    templateUrl: './short-link-generator.component.html',
    styleUrls: ['./short-link-generator.component.scss']
})
export class ShortLinkGeneratorComponent {

    constructor(private backendService: BackendService) { }

    onSubmit(form: NgForm) {
        this.backendService.post<Link>('/api/url-short/link/', {'full_link': form.value.link}).pipe(
            map(httpResponse => httpResponse.body)
        ).subscribe({
            next: next => {console.log(next)},
            error: error  => console.error(error),
        })
    }

}
