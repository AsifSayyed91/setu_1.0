import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FileuploadformylabreportsPage } from './fileuploadformylabreports.page';

describe('FileuploadformylabreportsPage', () => {
  let component: FileuploadformylabreportsPage;
  let fixture: ComponentFixture<FileuploadformylabreportsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadformylabreportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FileuploadformylabreportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
