import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicineDeliveryViewPage } from './medicine-delivery-view.page';

describe('MedicineDeliveryViewPage', () => {
  let component: MedicineDeliveryViewPage;
  let fixture: ComponentFixture<MedicineDeliveryViewPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineDeliveryViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicineDeliveryViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
