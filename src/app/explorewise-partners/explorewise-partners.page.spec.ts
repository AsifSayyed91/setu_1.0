import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExplorewisePartnersPage } from './explorewise-partners.page';

describe('ExplorewisePartnersPage', () => {
  let component: ExplorewisePartnersPage;
  let fixture: ComponentFixture<ExplorewisePartnersPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorewisePartnersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExplorewisePartnersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
