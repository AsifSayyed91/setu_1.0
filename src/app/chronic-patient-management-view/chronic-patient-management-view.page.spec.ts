import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChronicPatientManagementViewPage } from './chronic-patient-management-view.page';

describe('ChronicPatientManagementViewPage', () => {
  let component: ChronicPatientManagementViewPage;
  let fixture: ComponentFixture<ChronicPatientManagementViewPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronicPatientManagementViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChronicPatientManagementViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
