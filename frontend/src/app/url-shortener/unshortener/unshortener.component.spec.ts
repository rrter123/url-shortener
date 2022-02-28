import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnshortenerComponent } from './unshortener.component';

describe('UnshortenerComponent', () => {
    let component: UnshortenerComponent;
    let fixture: ComponentFixture<UnshortenerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UnshortenerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UnshortenerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
