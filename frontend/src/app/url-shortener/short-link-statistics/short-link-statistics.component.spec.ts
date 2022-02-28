import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortLinkStatisticsComponent } from './short-link-statistics.component';

describe('ShortLinkStatisticsComponent', () => {
    let component: ShortLinkStatisticsComponent;
    let fixture: ComponentFixture<ShortLinkStatisticsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShortLinkStatisticsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShortLinkStatisticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
