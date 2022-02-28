import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortLinkGeneratorComponent } from './short-link-generator.component';

describe('ShortLinkGeneratorComponent', () => {
    let component: ShortLinkGeneratorComponent;
    let fixture: ComponentFixture<ShortLinkGeneratorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShortLinkGeneratorComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShortLinkGeneratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
